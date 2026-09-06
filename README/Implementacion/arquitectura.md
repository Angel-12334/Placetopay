# ARQUITECTURA DE LA PRUEBA

- [Regresar](./../README.md)

La aplicaión fue desarrollada utilizando una arquitectura basica separada por frontend y backend.

El frontend es el encargado de mostrar la tienda, administrar el carrito de compras y presentar al usuario 
el resultado de la transacción.

El backend se encarga de la comunicación con la Api de Placetopay, evitando exponer las credenciales de 
autenticación en el navegador.

## Tecnologias Utilizadas

### Frontend
- React
- Vite
- JavaScript
- CSS
### Backend
- Node.js
- Express
- Axios
- dotenv
### Herramientas de prueba
- Thunder Client
- Placetopay WabCheckout en ambiente de pruebas

## Flujo General

```text
Usuario --> Tienda React - selecciona producto --> Carrito de compras - preciona pagar con 

placetopay --> Backend Node.js/Express - crea una sesion de pago --> Placetopay WebCheckout - 

retorna requestId y processUrl --> Frontend - Redirife Al ProcessUrl --> Checkout de Placetopay - 

Usuario Realiza Pago --> /payment/result - Consulta el estado de la sesión --> Backend --> Placetopay

--> Resultado de la transacción

```

## Frontend
El frontend contiene una tienda sencilla con 3 productos y un carrito de compras
cuando el usuario agrega productos, React calcula el valos total de la compra, al seleccionar la 
opción de pago, el frontend envia al backend la información necesaria para crear la sesion.

```json
{
    "Reference": "ORDER-XXXXXXXX",
    "description": "Compra a tienda de prueba",
    "price": 12000,
}
```
El frontend no se comunica directamente con la api de Placetopay y tampoco almacena las credenciales 
de autenticación, una vez que el backend crea la sesión correcatamente, el frontend recibe;

```json
{
    "requestId": "3728395",
    "processUrl": "https://checkout-test.placetopay.com/...",
}
```
El "requestId" y el "processUrl" se almacenan temporarmente en el localStorage y luego el usuario es 
redirigido a el Checkout de Placetopay.

## Backend

He decidido hacer que el backend funcione como un intermediario entre la tienda y Placetopay.

### Sus Principales Funciones son:

- Recibir la informacion de la compra.
- Generar la autenticación requerida por Placetopay.
- Crear una sesión en WebCheckout.
- Retornar el "requestId" y el "ProcessUrl" al frontend.
- consultar el estado de una sesión por el "requestId".

Las credenciales de Placetopay se almacenan mediante variables de entorno y no son enviadas al frontend

## Placetopay WebCheckout

Placetopay se encarga de la captura y procesamiento de los datos relacionados con el medio de pago.

La aplicación no implementa formularios propios para tarjetas o PSE. Después de crear la sesión, el usuario 
es redirigido mediante el `processUrl` al Checkout proporcionado por Placetopay.

Al finalizar el proceso, Placetopay redirige al usuario a:

```text
http://localhost:5173/payment/result
```

En esta página, la aplicación utiliza el `requestId` almacenado para solicitar al backend la consulta del 
estado de la sesión.

## Manejo del resultado

La aplicación contempla los tres resultados principales requeridos para la prueba:

- `APPROVED`: pago aprobado.
- `PENDING`: pago pendiente.
- `REJECTED`: pago rechazado.

Cuando el resultado está pendiente, se conserva la información de la sesión para permitir al usuario 
regresar al Checkout de Placetopay mientras la sesión continúe disponible.

Cuando el usuario decide regresar al carrito, la información temporal de la sesión almacenada en el 
navegador es eliminada.

## Seguridad de las credenciales

Las credenciales entregadas para consumir los servicios de Placetopay se mantienen exclusivamente en el
backend mediante variables de entorno.

Por esta razón, el flujo utilizado es:

```text
Frontend → Backend → Placetopay
```

y no:

```text
Frontend → Placetopay
```

De esta manera, el `SecretKey` no queda expuesto en el código ejecutado por el navegador.




