import { Request, Response } from "express";
import { getCountsByAccountAndDateRange } from "../services/countsService";

export async function getCounts(req: Request, res: Response) {
  const { account_id, from, to } = req.query;

  if (!account_id || !from || !to) {
    return res.status(400).json({
      error: "Faltan parámetros: account_id, from, to",
    });
  }

  try {
    const data = await getCountsByAccountAndDateRange(
      account_id as string,
      from as string,
      to as string
    );
    res.json(data);
  } catch (err) {
    res.status(500).json( err+ "Error interno al obtener conteos");
  }
}
