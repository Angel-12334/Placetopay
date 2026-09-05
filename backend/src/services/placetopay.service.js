const axios = require("axios");
const crypto = require("crypto");

function generateAuth() {
  const login = process.env.PLACETOPAY_LOGIN;
  const secretKey = process.env.PLACETOPAY_SECRET_KEY;

  const seed = new Date().toISOString();

  const rawNonce = crypto.randomBytes(16).toString("hex");

  const tranKey = crypto
    .createHash("sha256")
    .update(rawNonce + seed + secretKey)
    .digest("base64");

  const nonce = Buffer.from(rawNonce).toString("base64");

  return {
    login,
    tranKey,
    nonce,
    seed,
  };
}

async function createPaymentSession(paymentData) {
  const auth = generateAuth();

  const request = {
    auth,
    ...paymentData,
  };

  const response = await axios.post(
    `${process.env.PLACETOPAY_URL}/api/session`,
    request
  );

  return response.data;
}

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