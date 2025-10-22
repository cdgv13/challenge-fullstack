# 🧠 Challenge Fullstack – Webhook Counter

Este proyecto implementa un servicio Express en Node.js que recibe mensajes a través de un webhook, los guarda en una base de datos PostgreSQL y mantiene un conteo por hora y por cuenta.  
Incluye pruebas automatizadas con Jest y un mock de servicio externo.

---

## Requisitos previos

Antes de iniciar debes de tener instalados lo siguiente:

- [Node.js v18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL 13+](https://www.postgresql.org/)
- Una base de datos creada (por ejemplo `challenge-fullstack-db`)

## ⚙️ Configuración del entorno

### 1. Clona el repositorio:

```bash
git clone https://github.com/tuusuario/challenge-fullstack.git
cd challenge-fullstack
```

### 2. Instala dependencias

npm install

### 3. Crea el archivo .env

En la raíz del proyecto, crea un archivo .env con el siguiente contenido:

DATABASE_URL=postgres://usuario:password@localhost:5432/base_de_datos_propia
PORT=3000
EXTERNAL_ENDPOINT=http://localhost:3000/mock

### 4. Inicializa la base de datos

Ingresar a cmd PostgreSQL
psql -U postgres
cuando ingreses a PostgreSQL ingresa el siguiente comando el
CREATE DATABASE base_de_datos_propia;

El script 001_init.sql crea las tablas necesarias automáticamente cuando se inicia el servidor.

## Ejecución

Ejecuta el servidor en modo desarrollo con:

npm run dev

O en modo producción:

npm run start

Por defecto, la API estará disponible en:
👉 http://localhost:3000

## Pruebas

Ejecuta todas las pruebas unitarias:

npm test

## Estilo y calidad del código

El proyecto usa:

ESLint: Reglas de calidad y buenas prácticas.

Prettier: Formato automático del código.

## Ejemplo con Postman

1. Enviar un mensaje al webhook

POST http://localhost:3000/webhook

{
"message_id": "msg_001",
"account_id": "acc_001"
}

GET http://localhost:3000/counts?account_id=acc_001&from=2025-10-17T00:00:00Z&to=2025-10-22T23:59:59Z

[
{
"account_id": "acc_001",
"datetime": "2025-10-22T00:00:00.000Z",
"count_messages": 1
}
]
