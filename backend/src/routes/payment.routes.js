const express = require("express");

const {createPayment, getPayment,} = require("../controllers/payment.controller");

const router = express.Router();

router.post("/payment", createPayment);

router.post("/payment/:requestId", getPayment);

module.exports = router;