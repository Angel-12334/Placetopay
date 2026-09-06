const {
  createPaymentSession,
  getPaymentSession,
} = require("../services/placetopay.service");

async function createPayment(req, res) {
  try {
    const { reference, description, amount } = req.body;

    // El frontend envía únicamente los datos básicos de la compra.
    // Aquí se construye la estructura que requiere Placetopay.
    const paymentData = {
      payment: {
        reference,
        description,
        amount: {
          currency: "COP",
          total: amount,
        },
      },
      expiration: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // La sesión tendrá una duración limitada para completar el pago.
      returnUrl: "http://localhost:5173/payment/result", // Placetopay devuelve al usuario a esta URL cuando termina el flujo de Checkout.
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
    // El requestId identifica la sesión que se quiere consultar.
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