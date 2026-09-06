const axios = require("axios");
const crypto = require("crypto");

function generateAuth() {
  const login = process.env.PLACETOPAY_LOGIN;
  const secretKey = process.env.PLACETOPAY_SECRET_KEY;

  // Placetopay requiere un seed con la fecha actual para generar
  // una autenticación diferente en cada petición.
  const seed = new Date().toISOString();

  // Se genera un nonce aleatorio para evitar reutilizar
  // los mismos valores de autenticación.
  const rawNonce = crypto.randomBytes(16).toString("hex");

  // El tranKey se genera aplicando SHA-256 sobre:
  // nonce + seed + secretKey y luego codificando el resultado en Base64.
  const tranKey = crypto
    .createHash("sha256")
    .update(rawNonce + seed + secretKey)
    .digest("base64");

    // Placetopay espera recibir el nonce codificado en Base64.
  const nonce = Buffer.from(rawNonce).toString("base64");

  return {
    login,
    tranKey,
    nonce,
    seed,
  };
}

async function createPaymentSession(paymentData) {
  const auth = generateAuth();  // Se genera un auth nuevo cada vez que se consume la API.

  const request = {
    auth,
    ...paymentData,
  };

  const response = await axios.post( // Creación de la sesión de WebCheckout.
    `${process.env.PLACETOPAY_URL}/api/session`, 
    request
  );

  return response.data;
}

// La consulta de una sesión también necesita generar una autenticación nueva.
async function getPaymentSession(requestId) {
  const auth = generateAuth();

  const request = {
    auth,
  };

  const response = await axios.post(
    `${process.env.PLACETOPAY_URL}/api/session/${requestId}`,
    request
  );

  return response.data;
}

module.exports = {
  generateAuth,
  createPaymentSession,
  getPaymentSession,
};