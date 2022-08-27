const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  // ssl: true,
  brokers: ['localhost:9092']
})
// console.log('kafka', kafka)
const producer = kafka.producer() 
const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
  // Producing
  await producer.connect() 
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello KafkaJS user, Oba runs this !' },
    ],
  })

  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic, 
        partition, 
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })
}

run().catch(console.error) 