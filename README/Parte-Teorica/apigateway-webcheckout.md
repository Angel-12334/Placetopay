# DIFERENCIA ENTRE API GATEWAY Y WEBCHECKOUT

- [Regresar](./../README.md)

API Gateway y WebCheckout permiten procesar pagos mediante Placetopay, pero ofrecen diferentes niveles de control sobre la integración.

## WebCheckout

WebCheckout proporciona una interfaz de pago administrada por Placetopay.
El comercio crea una sesión y recibe una URL (`processUrl`) a la cual redirige al usuario.
Placetopay se encarga de mostrar la interfaz y solicitar la información necesaria para realizar el pago.
Esto permite realizar una integración más sencilla y evita que el comercio tenga que desarrollar 
directamente los formularios para capturar los datos del medio de pago.

## API Gateway

API Gateway permite integrar el procesamiento de los pagos directamente dentro de la aplicación del comercio.
El comercio tiene mayor control sobre la experiencia y el flujo de pago, pero también debe realizar una 
integración más completa y manejar los datos necesarios para procesar la transacción mediante la API.

## Diferencia principal

WebCheckout ofrece una página de pagos administrada por Placetopay y requiere redirigir al usuario.

API Gateway permite integrar el proceso de pago de una forma más directa dentro de la aplicación del 
comercio, ofreciendo mayor control y personalización.


