import { pool } from "../db/pool";

/**
 * Obtiene los conteos de mensajes por hora para un account_id
 * en un rango de fechas.
 */
export async function getCountsByAccountAndDateRange(
  account_id: string,
  from: string,
  to: string
) {
  try {
    const result = await pool.query(
      `
      SELECT account_id, datetime, count_messages
      FROM counts
      WHERE account_id = $1
      AND datetime BETWEEN $2 AND $3
      ORDER BY datetime ASC;
      `,
      [account_id, from, to]
    );

    return result.rows;
  } catch (err) {
    console.error("Error al obtener conteos:", (err as Error).message);
    throw err;
  }
}
