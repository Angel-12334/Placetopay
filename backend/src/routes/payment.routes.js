const express = require("express");

const {createPayment, getPayment,} = require("../controllers/payment.controller");

const router = express.Router();

// Crea una nueva sesión de WebCheckout.
router.post("/payment", createPayment);

// Consulta una sesión existente utilizando su requestId.
router.post("/payment/:requestId", getPayment);

module.exports = router;