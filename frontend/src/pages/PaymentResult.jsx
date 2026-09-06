import { useEffect, useState } from "react";
import "./PaymentResult.css";

function PaymentResult() {
  const [paymentResult, setPaymentResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkPayment() {
      const requestId = localStorage.getItem("requestId");
      // El requestId guardado antes de salir hacia Placetopay
      // permite identificar qué sesión debemos consultar.

      if (!requestId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/payment/${requestId}`,
          {
            method: "POST",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error("No se pudo consultar el pago");
        }

        setPaymentResult(data);
      } catch (error) {
        console.error("Error consultando pago:", error);
      } finally {
        setLoading(false);
      }
    }

    checkPayment();
  }, []);

  function getFinalStatus(result) {
    if (result?.payment?.length > 0) {
      const lastPayment =
        result.payment[result.payment.length - 1];

      return {
        status: lastPayment.status.status,
        message: lastPayment.status.message,
      };
    }

    return {
      status: result?.status?.status,
      message: result?.status?.message,
    };
  }

  function getStatusText(status) {
    switch (status) {
      case "APPROVED":
        return "Pago aprobado";

      case "REJECTED":
        return "Pago rechazado";

      case "PENDING":
        return "Pago pendiente";

      default:
        return status;
    }
  }

  function goToStore() {
    localStorage.removeItem("requestId");
    localStorage.removeItem("processUrl");

    window.location.href = "/";
  }

  // Si la operación está pendiente reutilizamos el processUrl existente en vez de crear una nueva sesión.
  function returnToPlacetopay() {
    const processUrl = localStorage.getItem("processUrl");

    if (processUrl) {
      window.location.href = processUrl;
    }
  }

  if (loading) {
    return (
      <div className="result-container">
        <div className="result-card">
          <h1>Consultando pago...</h1>
        </div>
      </div>
    );
  }

  if (!paymentResult) {
    return (
      <div className="result-container">
        <div className="result-card">
          <h1>No se encontró información del pago</h1>

          <button onClick={goToStore}>
            Volver al carrito
          </button>
        </div>
      </div>
    );
  }

  const finalStatus = getFinalStatus(paymentResult);

  return (
    <div className="result-container">
      <div className="result-card">
        <h1>Resultado del pago</h1>

        <h2>
          {getStatusText(finalStatus.status)}
        </h2>

        <p>{finalStatus.message}</p>

        <p>
          Referencia:{" "}
          <strong>
            {paymentResult.request.payment.reference}
          </strong>
        </p>

        <div className="result-buttons">
          <button onClick={goToStore}>
            Volver al carrito
          </button>

          {finalStatus.status === "PENDING" && (
            <button onClick={returnToPlacetopay}>
              Volver a Placetopay
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentResult;