const express = require("express");
const cors = require("cors");
require("dotenv").config();

const paymentRoutes = require("./routes/payment.routes");

const app = express();

// Permite las peticiones realizadas desde el frontend que se ejecuta en un puerto diferente.
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend funcionando",
  });
});

// Todas las rutas de pago quedan bajo el prefijo /api.
app.use("/api", paymentRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});