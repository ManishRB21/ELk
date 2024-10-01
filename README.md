# ELK

This project uses Docker to manage services and dependencies. Make sure you have Docker and Docker Compose installed on your machine.

To get started, clone the repository:

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

Next, start the services by running:

```bash
docker-compose up -d
```

Once the services are up, create a Kafka topic named `log`:

```bash
docker exec -it kafka-broker kafka-topics.sh --create --topic log --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1
```

Describe the topic to check its details:

```bash
docker exec -it kafka-broker kafka-topics.sh --describe --topic log --bootstrap-server localhost:9092
```

Run your producer and consumer code in separate terminal windows to send and receive messages from the Kafka topic.

For monitoring, access the following tools:
- Kafdrop: [http://localhost:19000](http://localhost:19000)
- Elasticsearch: [http://localhost:9200](http://localhost:9200)
- Kibana: [http://localhost:5601](http://localhost:5601)

If you encounter any issues, ensure that all services are running correctly and check the logs for any errors.

### Customization
Make sure to replace `yourusername/your-repo` with your actual GitHub username and repository name. You can also adjust any content to better reflect your project!

```bash
📦ELK
 ┣ 📂consumer
 ┃ ┣ 📜consumerelastic.js
 ┃ ┗ 📜consumerkafka.js
 ┣ 📂producer
 ┃ ┗ 📜producer.js
 ┣ 📜docker-compose.txt
 ┣ 📜docker-compose.yml
 ┣ 📜elasticsearch.png
 ┣ 📜kafdrop.png
 ┣ 📜kibana.png
 ┣ 📜package-lock.json
 ┗ 📜package.json
```
