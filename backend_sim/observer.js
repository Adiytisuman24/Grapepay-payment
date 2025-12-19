const Bull = require('bull');
const { Kafka } = require('kafkajs');

// Simulation of Kafka/BullMQ/Redis setup for GrapePay
console.log("Starting GrapePay Node.js Observability Hub...");

// Mocking BullMQ
const mockQueue = {
    name: 'transaction-queue',
    status: 'REDIS_CONNECTED',
    waiting: 12,
    active: 3,
    completed: 450,
    failed: 1
};

// Mocking Kafka
const mockKafka = {
    broker: 'localhost:9092',
    topic: 'tx.events',
    throughput: '4.5k msg/s'
};

setInterval(() => {
    console.log(`[NODE HUB] Observability Heartbeat: Queue[Wait:${mockQueue.waiting}] Kafka[Throughput:${mockKafka.throughput}]`);
    // Randomize stats for "live" feel
    mockQueue.waiting = Math.floor(Math.random() * 20);
    mockQueue.active = Math.floor(Math.random() * 5);
}, 3000);
