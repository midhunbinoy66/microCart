const kafka = require("kafka-node");
const Payment = require("../models/payment.model");

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
const consumer = new kafka.Consumer(
  client,
  [{ topic: "order.created", partition: 0 }],
  { autoCommit: true }
);

consumer.on("message", async (message) => {
  console.log("Received Order Event:", message.value);
  
  const eventData = JSON.parse(message.value);
  
  try {
 
    const isPaymentSuccessful = Math.random() > 0.2; 

    const payment = new Payment({
      orderId: eventData.orderId,
      amount: eventData.totalAmount,
      status: isPaymentSuccessful ? "successful" : "failed",
    });

    await payment.save();
    console.log(`Payment ${isPaymentSuccessful ? "Successful" : "Failed"} for Order: ${eventData.orderId}`);
  } catch (error) {
    console.error("Payment Processing Failed:", error);
  }
});

consumer.on("error", (err) => {
  console.error("Kafka Consumer error:", err);
});
