import request from "supertest";
import app from "@src/index";

describe("GET /counts", () => {
  it("debería devolver una lista de conteos con datos válidos", async () => {
    const res = await request(app)
      .get("/counts")
      .query({
        account_id: "acc_001",
        from: "2025-10-17T00:00:00Z",
        to: "2025-10-30T23:59:59Z",
      });

    //Verificar que la petición fue exitosa
    expect(res.status).toBe(200);

    //Verificar que el body sea un arreglo
    expect(Array.isArray(res.body)).toBe(true);

    // Si hay resultados, validar estructura
    if (res.body.length > 0) {
      const item = res.body[0];
      expect(item).toHaveProperty("account_id");
      expect(item).toHaveProperty("datetime");
      expect(item).toHaveProperty("count_messages");
    }
  });
});
