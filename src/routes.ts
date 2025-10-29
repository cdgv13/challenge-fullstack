import { Router } from "express";
import { handleWebhook } from "./controllers/webhookController";
import { getCounts } from "./controllers/countsController";
import { mockExternal } from "./controllers/mockController";

const router = Router();

router.get("/", (_, res) => res.send("✅ API running"));
router.post("/webhook", handleWebhook);
router.get("/counts", getCounts);
router.post("/mock", mockExternal);

export default router;
