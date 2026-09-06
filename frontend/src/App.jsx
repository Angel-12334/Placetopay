import { useState } from "react";
import PaymentResult from "./pages/PaymentResult"; 
import "./App.css";

function App() {
  const isPaymentResult =
    window.location.pathname === "/payment/result"; // esto esta en frontend/src/pages/PaymentResult.jsx

  // Se utiliza una página diferente cuando Placetopay devuelve al usuario al comercio. 
  if (isPaymentResult) {
    return <PaymentResult />;
  }

  const [cart, setCart] = useState([]);

  const products = [
    {
      id: 1,
      name: "Teclado",
      price: 120000,
    },
    {
      id: 2,
      name: "Mouse",
      price: 60000,
    },
    {
      id: 3,
      name: "Audífonos",
      price: 80000,
    },
  ];

  function addToCart(product) {
    setCart([...cart, product]);
  }

  const total = cart.reduce(
    (sum, product) => sum + product.price,
    0
  );

  async function handlePayment() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // El frontend envía únicamente la información necesaria de la compra. La estructura de Placetopay
          // se construye posteriormente en el backend.
          body: JSON.stringify({
            reference: `ORDER-${Date.now()}`,
            description: "Compra tienda de prueba",
            amount: total,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Error al crear el pago"
        );
      }
      
      // requestId permite consultar posteriormente la misma sesión cuando el usuario vuelva del Checkout.
      localStorage.setItem(
        "requestId",
        data.requestId
      );

      // processUrl se conserva para poder regresar a la misma sesión si el pago permanece pendiente.
      localStorage.setItem(
        "processUrl",
        data.processUrl
      );

      // El usuario abandona temporalmente la tienda y continúa el proceso en el Checkout de Placetopay.
      window.location.href = data.processUrl;
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo iniciar el pago");
    }
  }

  return (
    <div className="container">
      <h1>Tienda de prueba</h1>

      <p>
        Integración WebCheckout - Placetopay
      </p>

      <div className="products">
        {products.map((product) => (
          <div
            className="card"
            key={product.id}
          >
            <h2>{product.name}</h2>

            <p>
              $
              {product.price.toLocaleString(
                "es-CO"
              )}
            </p>

            <button
              onClick={() =>
                addToCart(product)
              }
            >
              Agregar
            </button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>Carrito</h2>

        {cart.length === 0 ? (
          <p>
            No hay productos agregados.
          </p>
        ) : (
          <>
            {cart.map(
              (product, index) => (
                <p key={index}>
                  {product.name} - $
                  {product.price.toLocaleString(
                    "es-CO"
                  )}
                </p>
              )
            )}

            <h3>
              Total: $
              {total.toLocaleString(
                "es-CO"
              )}
            </h3>

            <button
              onClick={handlePayment}
            >
              Pagar con Placetopay
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;