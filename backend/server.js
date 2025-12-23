const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

const PORT = 3001;

// --- 1. IMMUTABLE EVENT STORE (The Fact Log) ---
const EVENT_LOG = []; 

// --- 2. NOTIFICATION QUEUE (Simulating SQS) ---
const NOTIFICATION_QUEUE = [];

// --- 3. WEBHOOK SUBSCRIPTIONS (Mock Database) ---
const WEBHOOK_SUBSCRIPTIONS = [
    { id: 'wh_123', url: 'https://site.com/hooks', events: ['payment.succeeded', 'payment.failed'] }
];

// --- 4. DATA STORES ---
let transactions = [];
let products = [
  { id: 'prod_1', name: 'Starter Plan', description: 'Small biz', status: 'active', price: 29.00, currency: 'USD' }
];

// --- CORE EVENT BUS ---
function emitEvent(type, payload) {
    const event = {
        id: `evt_${uuidv4().replace(/-/g, '').substring(0, 24)}`,
        object: 'event',
        type: type,
        created: Date.now(),
        data: { object: payload },
        request: { id: `req_${uuidv4().substring(0, 8)}`, idempotency_key: null }
    };

    // 1. Persist Event (Immutable)
    EVENT_LOG.unshift(event);
    if (EVENT_LOG.length > 500) EVENT_LOG.pop();

    // 2. Broadcast to Real-time Dashboard (Dev Console)
    io.emit('system_event', event);

    // 3. Push to Queue (Decoupled Processing)
    pushToQueue(event);
    
    return event;
}

function pushToQueue(event) {
    // Simulate SQS Delay / Reliability Buffer
    setTimeout(() => {
        NOTIFICATION_QUEUE.push(event);
        processQueue();
    }, Math.random() * 500); // 0-500ms jitter
}

// --- NOTIFICATION DISPATCHER (The Consumer) ---
async function processQueue() {
    if (NOTIFICATION_QUEUE.length === 0) return;

    const event = NOTIFICATION_QUEUE.shift();
    console.log(`[SQS] Processing event: ${event.type} (${event.id})`);

    // Channel 1: Email Service
    if (event.type.includes('payment') || event.type.includes('payout')) {
        await dispatchEmail(event);
    }

    // Channel 2: SMS Service (Critical only)
    if (event.type === 'payment.failed' || event.type === 'payout.failed') {
        await dispatchSMS(event);
    }

    // Channel 3: Webhooks
    await dispatchWebhooks(event);
}

// --- CHANNELS ---
async function dispatchEmail(event) {
    // Simulate async email sending (Resend/SendGrid)
    const delay = Math.floor(Math.random() * 1000) + 500;
    setTimeout(() => {
        const notification = {
            id: `notif_email_${uuidv4().substring(0, 8)}`,
            channel: 'email',
            event_id: event.id,
            status: Math.random() > 0.95 ? 'failed' : 'sent', // 5% failure
            recipient: 'merchant@grapepay.com',
            timestamp: Date.now()
        };
        io.emit('notification_log', notification);
        console.log(`[EMAIL] Sent for ${event.type}`);
    }, delay);
}

async function dispatchSMS(event) {
    // Simulate Twilio
    const delay = Math.floor(Math.random() * 500) + 200;
    setTimeout(() => {
        const notification = {
            id: `notif_sms_${uuidv4().substring(0, 8)}`,
            channel: 'sms',
            event_id: event.id,
            status: 'sent',
            recipient: '+15550199',
            timestamp: Date.now()
        };
        io.emit('notification_log', notification);
        console.log(`[SMS] Alert sent for ${event.type}`);
    }, delay);
}

async function dispatchWebhooks(event) {
    const subs = WEBHOOK_SUBSCRIPTIONS.filter(sub => sub.events.includes(event.type) || sub.events.includes('*'));
    
    subs.forEach(sub => {
        const delay = Math.floor(Math.random() * 2000) + 100;
        setTimeout(() => {
            const success = Math.random() > 0.1; // 10% webhook failure (simulate network issues)
            const notification = {
                id: `notif_wh_${uuidv4().substring(0, 8)}`,
                channel: 'webhook',
                event_id: event.id,
                status: success ? '200 OK' : '500 Server Error',
                recipient: sub.url,
                timestamp: Date.now()
            };
            io.emit('notification_log', notification);
            
            // Automatic Retry Logic (Simplified)
            if (!success) {
                console.log(`[WEBHOOK] Failed for ${event.id}, retrying in 5s...`);
                setTimeout(() => {
                    notification.status = '200 OK (Retry)';
                    io.emit('notification_log', { ...notification, id: notification.id + '_retry' });
                }, 5000);
            }
        }, delay);
    });
}

// --- REAL PAYMENT PROCESSING ---
// No automatic simulation - events are only emitted when real payments happen via API

// --- API ENDPOINTS ---

app.get('/api/events', (req, res) => res.json(EVENT_LOG));
app.get('/api/transactions', (req, res) => res.json(transactions));
app.get('/api/stats', (req, res) => res.json({ event_count: EVENT_LOG.length, queue_size: NOTIFICATION_QUEUE.length }));

app.post('/api/payout', (req, res) => {
    const payout = { id: `po_${uuidv4()}`, amount: req.body.amount, status: 'pending' };
    emitEvent('payout.created', payout);
    
    setTimeout(() => {
        emitEvent('payout.paid', { ...payout, status: 'paid' });
    }, 3000);
    
    res.json(payout);
});

// Create Payment Intent (Real Payments Only)
app.post('/api/create-payment', (req, res) => {
    const { amount, currency, customer_email, description } = req.body;
    
    const payment = {
        id: `pi_${uuidv4().replace(/-/g, '').substring(0, 24)}`,
        amount: parseFloat(amount),
        currency: currency || 'USD',
        status: 'pending',
        customer_email,
        description,
        created: new Date().toISOString()
    };
    
    transactions.unshift(payment);
    if (transactions.length > 100) transactions.pop();
    
    emitEvent('payment_intent.created', payment);
    
    // Simulate payment processing (2-5 seconds)
    setTimeout(() => {
        const isSuccess = Math.random() > 0.05; // 95% success rate for real payments
        payment.status = isSuccess ? 'succeeded' : 'failed';
        
        if (isSuccess) {
            emitEvent('payment_intent.succeeded', payment);
            emitEvent('charge.succeeded', { ...payment, id: `ch_${payment.id.substring(3)}` });
        } else {
            emitEvent('payment_intent.payment_failed', { ...payment, failure_code: 'card_declined' });
        }
    }, Math.random() * 3000 + 2000);
    
    res.json(payment);
});

server.listen(PORT, () => {
    console.log(`[GRAPEPAY ENGINE] Event-Driven Architecture Active on port ${PORT}`);
    console.log(`[SYSTEM] SQS Consumer Ready | Email/SMS/Webhook Dispatchers Ready`);
    console.log(`[PAYMENT] Waiting for real payment requests...`);
});
