import { pool } from "../db/pool";
import axios from "axios";

export async function processIncomingMessage(body: any) {
  const { message_id, account_id } = body;
let {created_at} = body;

  //Asegurar que created_at siempre tenga valor válido
  if (!created_at || created_at.trim() === "") {
    created_at = new Date().toISOString();
  }
  //Insertar mensaje único
  const insertResult = await pool.query(
    `
    INSERT INTO messages (message_id, account_id, created_at)
    VALUES ($1, $2, $3)
    ON CONFLICT (message_id) DO NOTHING
    RETURNING *;
    `,
    [message_id, account_id, created_at]
  );

  if (insertResult.rowCount === 0) {
    return { success: true, duplicated: true };
  }

  // Agrupar por hora
  const date = new Date(created_at);
  date.setUTCMinutes(0, 0, 0);
  const hourBucket = date.toISOString();

  // Insertar o actualizar conteo
  await pool.query(
    `
    INSERT INTO counts (account_id, datetime, count_messages)
    VALUES ($1, $2, 1)
    ON CONFLICT (account_id, datetime)
    DO UPDATE SET count_messages = counts.count_messages + 1;
    `,
    [account_id, hourBucket]
  );

  // Calcular total diario
  const startOfDay = new Date(created_at);
  startOfDay.setUTCHours(0, 0, 0, 0);
  const endOfDay = new Date(created_at);
  endOfDay.setUTCHours(23, 59, 59, 999);

  const totalResult = await pool.query(
    `
    SELECT SUM(count_messages)::int AS total
    FROM counts
    WHERE account_id = $1
    AND datetime BETWEEN $2 AND $3;
    `,
    [account_id, startOfDay.toISOString(), endOfDay.toISOString()]
  );

const total = totalResult.rows[0]?.total || 0;
  // Enviar total diario al mock externo
  try {
    await axios.post(process.env.EXTERNAL_ENDPOINT || "http://localhost:3000/mock", {
      account_id,
      total_messages_today: total,
    });
    console.log("Total diario enviado:", total);
  } catch (err: any) {
    console.error("Error al enviar total diario:", err.message);
  }

  return { success: true, total_today: total };
}
