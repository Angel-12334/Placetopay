# NOTIFICACIÓN

- [Regresar](./../README.md)

La notificación permite que Placetopay informe al sistema del comercio cuando ocurre un cambio relacionado con una sesión de pago.

El comercio configura una URL de notificación en su aplicación y Placetopay envía información a esta URL cuando corresponde actualizar el estado de la sesión.

Esto permite que el backend conozca cambios en el pago sin depender únicamente de que el usuario regrese al sitio web.

Cuando se recibe una notificación, el comercio debe validar que esta sea auténtica y puede actualizar el 
estado de la operación en su sistema.

Si necesita información más detallada sobre las transacciones realizadas, puede consultar nuevamente la 
sesión utilizando su `requestId`.

## Ejemplo

Un usuario realiza un pago y cierra el navegador antes de regresar a la página del comercio.

Aunque el usuario no vuelva manualmente al sitio, Placetopay puede enviar una notificación al backend del 
comercio informando sobre el estado de la sesión.
De esta manera, el comercio puede mantener actualizado el estado de la compra.
