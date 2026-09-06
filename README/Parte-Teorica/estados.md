# ESTADOS DE UNA TRANSACCIÓN 

- [Regresar](./../README.md)

Durante el proceso de pago en Placetopay, una sesión puede pasar por diferentes estados que permiten conocer 
en qué punto se encuentra el proceso.

## PENDING - Pendiente

Indica que el proceso todavía no ha finalizado y se encuentra a la espera de alguna acción.
Puede presentarse, por ejemplo, cuando:

- El usuario todavía no ha completado el proceso de pago.
- Se realizó un intento rechazado, pero la sesión todavía permite realizar nuevos intentos.

Por esta razón, `PENDING` no debe considerarse un resultado final.

## APPROVED - Aprobado

Indica que el proceso de pago se completó correctamente y la transacción fue aprobada.
Este es un estado final, por lo que el comercio puede continuar con las acciones correspondientes a una 
compra exitosa.

## REJECTED - Rechazado

Indica que el proceso terminó sin conseguir un pago aprobado.
Una sesión puede finalizar en este estado, por ejemplo, si es cancelada o si llega a su fecha de expiración sin que se haya realizado un pago exitoso.

Este también es un estado final.

## APPROVED_PARTIAL - Aprobado Parcial

Este estado se utiliza en sesiones que permiten pagos parciales.
Indica que el usuario ya pagó una parte del valor total solicitado, pero todavía queda un monto pendiente 
por pagar.
El usuario puede continuar realizando transacciones hasta completar el valor total de la compra.

## PARTIAL_EXPIRED - Parcial Expirado

También corresponde a sesiones que permiten pagos parciales.
Indica que el usuario alcanzó a pagar una parte del valor solicitado, pero el tiempo disponible para 
completar el resto del pago terminó.
En este caso el proceso ya finalizó y no se puede completar el valor restante dentro de esa sesión.



