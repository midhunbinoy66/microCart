const express = require("express");
const Payment = require("../models/payment.model");

const router = express.Router();


router.get("/:orderId", async (req, res) => {
  try {
    const payment = await Payment.findOne({ orderId: req.params.orderId });

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving payment" });
  }
});

module.exports = router;
