import { Request, Response } from "express";


//Controlador mock que simula un servicio externo para recibir los totales diarios de mensajes.
 
export async function mockExternal(req: Request, res: Response) {
  return res.status(200).json({
    ok: true,
    message: "Mock externo procesó correctamente los datos",
    received: req.body,
  });
}
