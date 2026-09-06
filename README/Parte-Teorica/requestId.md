# REQUESTID

- [Regresar](./../README.md)

## ¿Qué es el RequestId?

El `requestId` es el identificador único que Placetopay asigna a una sesión de WebCheckout cuando esta es 
creada correctamente.

Al crear una sesión, Placetopay retorna principalmente dos datos importantes: el `requestId`, que permite 
identificar la sesión, y el `processUrl`, que es la URL utilizada para redirigir al usuario al Checkout y 
continuar con el proceso de pago.

## ¿Para qué sirve?

El `requestId` permite identificar y consultar posteriormente una sesión creada en Placetopay.

## ¿En que casos se repite?

Cuando una sesión ya esta creada correctamente, en ocasiones no se aprobó o rechazó enseguida la 
transacción, ahí entra el estado pendiente, el usuario puede volver a esa sesión de checkout ya iniciada 
con el `requeestId`.

Por ejemplo, después de que el usuario realiza o intenta realizar un pago, el comercio puede utilizar el 
`requestId` para consultar nuevamente la sesión y conocer su estado y los intentos de pago asociados.

La consulta se realiza mediante:

```http
POST /api/session/{requestId}
```