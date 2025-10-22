# Cómo diseñaste la solución (estructura, modelo de datos, endpoints).

Se utilizo controller y services para tener un mejor manejo de remplazo de codigo sin afectar en grande a la app.
El modelo de datos se utulizo services para aislar la logica de negicio y poder reutilizar service si es necesario con otras bases de datos o cambio de logica afectando solo esa funcion.
Se tienen 2 endpoints realizados con express:

- Post el webhook : realiza el llenado de las tablas messages y counts , asi como la logica de crear un mock similado.
- Get counts : realiza el query para llamar los counts de manera optima generando la llamada por rango de hora y regresando un array de objetos.

# Cómo aseguraste idempotencia y consistencia.

- Para evitar que se guarden mensajes duplicados, usé la opción ON CONFLICT que tiene PostgreSQL.
  En el caso de los mensajes, la aplico sobre el campo message_id, de modo que si llega el mismo mensaje dos veces, la base de datos simplemente lo ignora. Así garantizo que solo se registre una vez.

- En la tabla counts hago algo parecido, pero con account_id y datetime. Esto sirve para que, si ya existe un registro para esa cuenta y esa hora, no se cree otro nuevo, sino que se actualice el contador y se sume uno más. De esa forma, cada fila representa una hora específica con su total de mensajes acumulados.

- Para sacar el total diario, hago una consulta que usa SUM(count_messages) sobre los registros de ese día. Esto me permite obtener el total de mensajes por cuenta sin importar cuántos mensajes hayan llegado o si fueron concurrentes.

# Supuestos que tomaste y qué mejorarías con más tiempo.

## Supuestos:

- Cada mensaje tiene un identificador único (message_id).

- Los registros de tiempo se manejan en ISOISO8601 debido a esto se usa UTC segun el formato ISO .

## Mejoras futuras(Pasos a corto plazo):

Agregaria toke de acceso a las apis para seguridad de request.
Revisaria mejoras para Sentry y GithubActions.

# Uso de herramientas de apoyo (IA)

Revisar buenas prácticas de arquitectura en Node.js y Express.

Integración ESLint, Prettier.

Validar consultas SQL
