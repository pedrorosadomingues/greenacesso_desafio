import app from "../../src/index";
import supertest from "supertest";
import httpStatus from "http-status";

const api = supertest(app);

describe("POST /boletos", () => {
  it("deve retornar status 400 caso nao encontre arquivo", async () => {
    const response = await api.post("/boletos");
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  describe("quando encontrar arquivo", () => {
    it("deve retornar status 400 caso o arquivo nao seja PDF ou CSV", async () => {
      const response = await api
        .post("/boletos")
        .attach("file", "tests/factories/boleto.php");
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("deve retornar status 200 caso o arquivo seja CSV", async () => {
      const response = await api
        .post("/boletos")
        .attach("file", "tests/factories/boletos.csv");
      expect(response.status).toBe(httpStatus.OK);
    });
    it("deve retornar status 200 caso o arquivo seja PDF", async () => {
      const response = await api
        .post("/boletos")
        .attach("file", "tests/factories/boletos.pdf");
      expect(response.status).toBe(httpStatus.OK);
    });
  });
});
