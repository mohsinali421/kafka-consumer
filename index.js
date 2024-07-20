const express = require("express")
const app = express()
const axios = require("axios")

const { Kafka } = require('kafkajs')

app.use(express.json())

const kafka = new Kafka({
    clientId: 'my-kafka-app-topics',
    brokers: ['localhost:9092', 'localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'my-group-1' })

app.get("/", (req,res) => {
    console.log("Hit is active");
    res.json("Kafka server is up and running")
})

app.get("/", async (req,res) => {
    console.log("Get all messages from beginning of topic");
    res.json("hello")

})

const runConsumer = async () => {
    await consumer.connect();
    
    // Subscribe to one or more topics
    await consumer.subscribe({ topic: 'first-topic', fromBeginning: true });
    
    // Start consuming messages
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(), // Message value as string
          headers: message.headers,       // Optional headers
          topic,
          partition,
          offset: message.offset,
        });
        if(message.value.toString() === "HIT"){
            console.log("HIT found!");
            await axios.get("http://localhost:3000/")
            await axios.get("http://localhost:3001/")
            await axios.get("http://localhost:3002/")
        }
      },
    });
  };

// Start the consumer
runConsumer().catch(console.error);

app.listen(3002, async () => {
    console.log("Server started at 3002");
})



