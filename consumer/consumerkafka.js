const { Kafka } = require('kafkajs');

// Initialize Kafka consumer
const kafka = new Kafka({
  clientId: 'log-consumer',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'log-group' });

const run = async () => {
  // Connect the consumer
  await consumer.connect();
  
  // Subscribe to the logs topic
  await consumer.subscribe({ topic: 'log', fromBeginning: true });

  // Process messages received from the logs topic
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // Print the message value to the console
      const log = JSON.parse(message.value.toString());
      console.log('Received log:', log);
    },
  });
};

// Run the consumer
run().catch(console.error);
