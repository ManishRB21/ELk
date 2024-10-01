const { Kafka } = require('kafkajs');
const { Client } = require('@elastic/elasticsearch');

// Initialize Kafka consumer
const kafka = new Kafka({
  clientId: 'log-consumer',
  brokers: ['localhost:9092']
});

// Elasticsearch client
const esClient = new Client({ node: 'http://localhost:9200' });

// Consumer instance
const consumer = kafka.consumer({ groupId: 'log-group' });

const run = async () => {
  // Connect consumer
  await consumer.connect();
  await consumer.subscribe({ topic: 'logs', fromBeginning: true });

  // Consume messages from Kafka
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const log = JSON.parse(message.value.toString());
      
      // Index log in Elasticsearch
      await esClient.index({
        index: 'logs',
        body: log
      });

      console.log('Log saved to Elasticsearch:', log);
    },
  });
};

run().catch(console.error);
