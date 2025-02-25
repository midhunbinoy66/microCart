const kafka = require('kafka-node');
const client = new kafka.KafkaClient({kafkaHost:process.env.KAFKA_BROKER});
const producer = new kafka.Producer(client);

producer.on('ready',()=>{
    console.log('kafka producer ready');
})

producer.on('error',()=>{
    console.log('Kafka producer error');
})


const publishEvent = (topic,message)=>{
    const payload = [{topic,message:JSON.stringify(message)}];
    producer.send(payload,(err,data)=>{
        if(err) console.log(err,'kafaka send error');
        else console.log(  `message send `,data);
    })
}


module.exports = publishEvent