import { Pool } from "pg";
import { readFileSync } from "fs";
import path from "path";
import dotenv from "dotenv";

// Cargar variables de entorno (.env o .env.test)
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Validar la conexión
if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL undefined.");

}

// Crear el pool de conexiones
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Inicializar las tablas desde el script SQL
(async () => {
  try {
    const sqlPath = path.resolve(__dirname, "./sql/001_init.sql");
    const initScript = readFileSync(sqlPath, "utf8");

    await pool.query(initScript);
    console.log("✅ Tablas inicializadas correctamente");
  } catch (err) {
    console.error(" Error al inicializar la base de datos:", (err as Error).message);
  }
})();
