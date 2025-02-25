const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const paymentRoutes = require("./routes/payment.routes");

require("dotenv").config({path:__dirname+'/./../.env'});

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/payments", paymentRoutes);

module.exports = app;
