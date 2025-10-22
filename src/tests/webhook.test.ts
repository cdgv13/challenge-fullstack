import request from "supertest";
import app from "@src/index";

describe("POST /webhook", () => {
  it("debería insertar un nuevo mensaje y devolver éxito", async () => {
    const body = {
      message_id: "msg_001",
      account_id: "acc_123",
    };

    const res = await request(app).post("/webhook").send(body);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
