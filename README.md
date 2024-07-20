# kafka-consumer
This will consume all kafka message to all topics

## Before Consuming from topics
- Make sure kafka broker is running in local machine
- Start Kafka Zooker - `zookeeper-server-start.sh   ~/kafka_2.13-3.7.0/config/zookeeper.properties`
- Start Kafka Broker - `kafka-server-start.sh     ~/kafka_2.13-3.7.0/config/server.properties`
- Make sure topics are created - `Run kafka-topics repo`
- Make sure producers have send some messages - `Run kafka-producer repo`

## Run this project
- npm install
- npm start
- /consumer/readall - to read all message from beginning of topic
