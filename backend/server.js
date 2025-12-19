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
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = 3001;

// --- GLOBAL SYSTEM STATE ---
let transactions = [
    {
        id: 'TXN-88127',
        hash: '0x71c...42e1',
        type: 'convert',
        fromAmount: 1.5,
        fromCurrency: 'ETH',
        toAmount: 428000.50,
        toCurrency: 'INR',
        status: 'success',
        timestamp: new Date().toISOString(),
        fee: 3.50,
        chain: 'Ethereum',
        merchant: 'Aditya Suman'
    }
];

let products = [
  { id: 'prod_1', name: 'Starter Plan', description: 'Perfect for small businesses', status: 'active', price: 29.00, currency: 'USD', created: new Date().toISOString() },
  { id: 'prod_2', name: 'Pro Plan', description: 'Advanced features for scaling', status: 'active', price: 99.00, currency: 'USD', created: new Date().toISOString() }
];

let features = [
  { id: 'feat_1', name: 'Zero Latency Payouts', status: 'active', created: new Date().toISOString() },
  { id: 'feat_2', name: 'AI Fraud Detection', status: 'active', created: new Date().toISOString() }
];

let coupons = [
  { id: 'cpn_WELCOME20', name: 'Welcome 20%', status: 'active', discount: '20%', created: new Date().toISOString() }
];

let clusters = {
    go: { status: 'optimal', load: '12%', throughput: '14.2k ops/s', uptime: '99.99%', last_heartbeat: Date.now() },
    python: { status: 'optimal', load: '45%', throughput: '2.4k risk_anal/s', uptime: '99.98%', last_heartbeat: Date.now() },
    node: { status: 'optimal', load: '8%', throughput: '8.1k msg/s', uptime: '100%', last_heartbeat: Date.now() }
};

let modularMetrics = {
    cost_observability: {审计: 98, 观察: 100, 优化: 95, anomalies_detected: 2, total_savings: "$12.4K"},
    revenue_recovery: {retry_success_rate: "18.5%", churn_prevented: 42, recovered_amount: "$8.2K"},
    vault: {tokens_stored: 12500, pci_compliance: "L1 STATUS", bank_nodes: 45},
    intelligent_routing: {faar: "99.2%", active_psps: 8, latency: "24ms"},
    reconciliation: {status: "MATCHED", auto_fetch: "ACTIVE", variance: "$0.00"}
};

// --- SIMULATION ENGINE ---

function generateTransaction() {
    const assets = ['ETH', 'SOL', 'USDC', 'BTC', 'MATIC'];
    const fiats = ['INR', 'USD', 'EUR', 'AED'];
    const types = ['convert', 'send', 'receive', 'payout'];
    
    const asset = assets[Math.floor(Math.random() * assets.length)];
    const fiat = fiats[Math.floor(Math.random() * fiats.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const amount = (Math.random() * 10).toFixed(4);
    
    const txn = {
        id: `TXN-${Math.floor(Math.random() * 90000) + 10000}`,
        hash: `0x${uuidv4().substring(0, 8)}...${uuidv4().substring(24, 32)}`,
        type: type,
        fromAmount: parseFloat(amount),
        fromCurrency: asset,
        toAmount: type === 'convert' ? (amount * 84 * 2500).toFixed(2) : amount,
        toCurrency: type === 'convert' ? fiat : asset,
        status: Math.random() > 0.1 ? 'success' : 'failed',
        timestamp: new Date().toISOString(),
        fee: (Math.random() * 5).toFixed(2),
        chain: asset === 'SOL' ? 'Solana' : 'Ethereum',
        merchant: 'Global_Partner_' + Math.floor(Math.random() * 100)
    };

    transactions.unshift(txn);
    if (transactions.length > 100) transactions.pop();
    
    io.emit('new_transaction', txn);
    console.log(`[ENGINE] New TXN processed: ${txn.id} | Status: ${txn.status}`);
}

setInterval(() => {
    Object.keys(clusters).forEach(k => {
        clusters[k].load = Math.floor(Math.random() * 60) + 5 + '%';
        clusters[k].last_heartbeat = Date.now();
    });
    io.emit('cluster_update', clusters);
}, 3000);

function startSimulation() {
    generateTransaction();
    const next = Math.floor(Math.random() * 15000) + 15000;
    setTimeout(startSimulation, next);
}

// --- API ENDPOINTS ---

app.get('/api/transactions', (req, res) => res.json(transactions));

// --- PRODUCT CATALOG ROUTES ---
app.get('/api/products', (req, res) => res.json(products));
app.post('/api/products', (req, res) => {
  const newProduct = { id: `prod_${Date.now()}`, ...req.body, created: new Date().toISOString() };
  products.push(newProduct);
  res.json(newProduct);
});

app.get('/api/features', (req, res) => res.json(features));
app.post('/api/features', (req, res) => {
  const newFeature = { id: `feat_${Date.now()}`, ...req.body, created: new Date().toISOString() };
  features.push(newFeature);
  res.json(newFeature);
});

app.get('/api/coupons', (req, res) => res.json(coupons));
app.post('/api/coupons', (req, res) => {
  const newCoupon = { id: `cpn_${req.body.code || Date.now()}`, ...req.body, created: new Date().toISOString() };
  coupons.push(newCoupon);
  res.json(newCoupon);
});

app.post('/api/validate-product', async (req, res) => {
  try {
    const response = await fetch('http://localhost:4000/api/go/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Go engine unreachable', details: err.message });
  }
});

app.get('/api/stats', (req, res) => {
    const totalVolume = transactions.reduce((acc, t) => acc + (t.type === 'convert' ? parseFloat(t.fromAmount) : 0), 0);
    res.json({
        total_txns: transactions.length,
        total_volume: totalVolume.toFixed(2),
        success_rate: '98.4%',
        active_users: 1240,
        clusters: clusters
    });
});

app.post('/api/payout', (req, res) => {
    const { amount, currency } = req.body;
    console.log(`[BACKEND] Payout requested: ${amount} ${currency}`);
    setTimeout(() => {
        const txnId = `PAY-${Math.floor(Math.random() * 90000) + 10000}`;
        io.emit('system_alert', { 
            type: 'payout_processed', 
            message: `Payout ${txnId} successfully broadcasted to banking network.` 
        });
    }, 2000);
    res.json({ status: 'initiated', ref: uuidv4() });
});

server.listen(PORT, () => {
    console.log(`
    ================================================
    GRAPEPAY MULTI-CLUSTER BACKEND ENGINE ACTIVE
    ================================================
    API Server : http://localhost:${PORT}
    WebSocket  : ws://localhost:${PORT}
    
    Simulating Go (Engine), Python (Risk), Node (Hub)
    ================================================
    `);
    startSimulation();
});
