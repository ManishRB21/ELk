const { Kafka } = require('kafkajs');

// Initialize Kafka producer
const kafka = new Kafka({
  clientId: 'log-producer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

// Possible log levels
const logLevels = ['info', 'error', 'warn', 'debug'];

// Sample dynamic user data
const users = [
  { id: '12345', name: 'Alice' },
  { id: '67890', name: 'Bob' },
  { id: '54321', name: 'Charlie' },
];

// Generate a random log entry
const generateRandomLog = () => {
  const level = logLevels[Math.floor(Math.random() * logLevels.length)];
  const user = users[Math.floor(Math.random() * users.length)];
  const timestamp = new Date().toISOString();
  const message = `Log message at ${timestamp} with log level: ${level}`;

  return {
    level,
    timestamp,
    message,
    user,
  };
};

// Send log messages to Kafka topic
const sendLogMessages = async () => {
  await producer.connect();
  
  setInterval(async () => {
    const log = generateRandomLog();

    await producer.send({
      topic: 'logs',
      messages: [{ 
        key: log.level,
        value: JSON.stringify(log) }],
    });

    console.log('Log sent to Kafka:', log);
  }, 3000); // Send a new log every 3 seconds
};

// Run the log producer
sendLogMessages().catch(console.error);


