# Casos de Atención al Comercio

- [Regresar](../README.md)

## Caso 1 - Error "Autenticación fallida 102"

### Gestión del caso
Primero revisaría qué está causando el error y si desde el día anterior se realizó algún cambio en la 
integración, las credenciales o las variables de entorno.
El error 102 está relacionado con el `tranKey`, por lo que revisaría que el `secretKey` utilizado sea 
correcto y que el `tranKey` se esté generando correctamente con el `nonce` y el `seed`.
Después de encontrar y corregir el problema, realizaría una transacción de prueba para verificar que el 
servicio vuelva a funcionar correctamente.

### Respuesta al cliente
Entendemos la importancia de la situación y el impacto que está teniendo al no poder realizar transacciones.
El error 102 está relacionado con la autenticación, específicamente con la validación del `tranKey`. Vamos a revisar las credenciales y 
la forma en que se está generando este valor para encontrar la causa del problema.
También queremos validar si recientemente se realizó algún cambio en la integración o configuración que pueda estar relacionado con el 
error.
Una vez realicemos la correción le estaremos informando cuando todo quede solucionado


## Caso 2 - Error "Autenticación mal formada" - Comercio CLARO

### Gestión del caso
Como el comercio no puede realizar transacciones desde las 7 de la mañana, trataría el caso como prioritario.
Empezaría revisando una de las peticiones que está presentando el error. Verificaría que la autenticación tenga correctamente los campos 
`login`, `tranKey`, `nonce` y `seed`, y que ninguno esté llegando vacío o con un formato incorrecto.
También revisaría que la petición se esté enviando correctamente en formato JSON y con el `Content-Type` correspondiente.
Como el problema empezó desde una hora específica, preguntaría si alrededor de ese momento realizaron algún despliegue, actualización o 
cambio en la configuración.
Después de encontrar el problema, realizaría una prueba para comprobar que las transacciones puedan procesarse nuevamente.

### Respuesta al cliente
Entendemos la afectación que está causando este inconveniente tanto para el comercio como para sus usuarios, por lo que vamos a darle 
prioridad a la revisión.

El mensaje "Autenticación mal formada" nos indica que debemos revisar la información de autenticación que se está enviando en las 
peticiones y verificar que tenga la estructura correcta.
También revisaremos si se realizó algún cambio en la integración o configuración alrededor de las 7 de la mañana que pueda estar 
relacionado con el inicio del problema.
Cuando identifiquemos la causa y realicemos la corrección, haremos una prueba para confirmar que las transacciones puedan realizarse 
nuevamente.


## Caso 3 - Comercio Sunshine presenta dificultades para entender la integración

### Gestión del caso
En este caso cambiaría la forma en la que le estoy explicando el funcionamiento al comercio.
Si después de varias explicaciones todavía existen dudas, intentaría utilizar una forma más práctica y visual. Por ejemplo, utilizaría 
diagramas para explicar el flujo y después realizaría una petición de prueba mostrando paso a paso qué se envía, qué responde el 
servicio y qué se debe hacer con esa respuesta.

También dividiría la explicación en partes más pequeñas para no explicar toda la integración al mismo tiempo.
Antes de continuar con cada parte, confirmaría con el comercio si quedó clara o si todavía tiene alguna duda.

### Respuesta al cliente
Entiendo que todavía existen algunos puntos de la integración que no an quedado completamente claros.
Para facilitar el proceso, vamos a cambiar la forma en la que estamos realizando la explicación. Podemos revisar el flujo paso a paso 
utilizando diagramas y ejemplos prácticos de las peticiones realizadas al servicio.

La idea es revisar cada parte por separado y resolver las dudas que aparezcan antes de continuar con el siguiente punto.
De esta manera podremos identificar exactamente dónde se está presentando la dificultad y avanzar con la integración de una forma más 
clara.


## Caso 4 - Comercio Sunshine molesto y considerando cancelar el servicio

### Gestión del caso
Aunque el cliente esté bastante molesto, mantendría una comunicación respetuosa y no respondería de la misma manera a los comentarios 
personales.
Primero escucharía cuáles son exactamente los problemas que está teniendo y trataría de separar la molestia del problema técnico que 
necesitamos resolver.

Después organizaría los problemas encontrados por prioridad y propondría revisar cada uno hasta encontrar una solución.
También informaría internamente sobre la situación porque el cliente está considerando cancelar el servicio. Si es necesario, 
solicitaría acompañamiento de mi líder o de otra persona del equipo para ayudar a solucionar el problema y recuperar la confianza del 
comercio.
Después de cada avance mantendría informado al cliente para que conozca qué se está haciendo y qué puntos ya fueron solucionados.

### Respuesta al cliente
Entiendo su molestia y la preocupación que tiene por el avance del proyecto.
Quiero que podamos enfocarnos en los puntos que actualmente están impidiendo continuar con la integración y trabajar en ellos hasta 
encontrar una solución.

Propongo que revisemos cada inconveniente por separado, empezando por los que están bloqueando el proyecto, y que vayamos validando cada 
solución antes de continuar con el siguiente punto.

También realizaremos seguimiento a los temas que encontremos para mantenerlos informados sobre los avances y asegurarnos de que puedan 
continuar con la integración.







