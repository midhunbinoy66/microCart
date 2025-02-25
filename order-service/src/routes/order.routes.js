const express = require("express");
const Order = require("../models/order.model");
const publishEvent = require("../services/kafka.service");

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    const order = new Order({ userId, items, totalAmount });
    await order.save();

    publishEvent("order.created", { orderId: order._id, totalAmount });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Error creating order" });
  }
});

module.exports = router;
