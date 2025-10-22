import { Request, Response } from "express";
import { processIncomingMessage } from "../services/messageService";

export async function handleWebhook(req: Request, res: Response) {
  try {
    const result = await processIncomingMessage(req.body);
    res.json(result);
  } catch (err: any) {
    console.error(" Error en controlador webhook:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
