const {
  createPaymentSession,
  getPaymentSession,
} = require("../services/placetopay.service");

async function createPayment(req, res) {
  try {
    const { reference, description, amount } = req.body;

    const paymentData = {
      payment: {
        reference,
        description,
        amount: {
          currency: "COP",
          total: amount,
        },
      },
      expiration: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      returnUrl: "http://localhost:5173/payment/result",
      ipAddress: req.ip,
      userAgent: req.get("User-Agent"),
    };

    const response = await createPaymentSession(paymentData);

    res.status(200).json(response);
  } catch (error) {
    console.error(
      "Error creando sesión:",
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "No se pudo crear la sesión de pago",
    });
  }
}

async function getPayment(req, res) {
  try {
    const { requestId } = req.params;

    const response = await getPaymentSession(requestId);

    res.status(200).json(response);
  } catch (error) {
    console.error(
      "Error consultando sesión:",
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "No se pudo consultar la sesión de pago",
    });
  }
}

module.exports = {
  createPayment,
  getPayment,
};