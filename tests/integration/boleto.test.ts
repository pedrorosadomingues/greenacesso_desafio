import app, { init } from "@/index";
import supertest from "supertest";
import httpStatus from "http-status";
import { prisma } from "@/config";
import { limparBanco } from "../helpers";

beforeAll(async () => {
  await init();
});

afterAll(async () => {
  await limparBanco();
});
const api = supertest(app);

describe("POST /boletos", () => {
  it("deve retornar status 400 caso nao encontre arquivo", async () => {
    const response = await api.post("/boletos");

    const resultado = await api.get("/boletos");
    expect(resultado.body).toHaveLength(0);
  });
  describe("quando encontrar arquivo", () => {
    it("deve retornar status 400 caso o arquivo nao seja PDF ou CSV", async () => {
      const response = await api
        .post("/boletos")
        .attach("file", "tests/factories/boleto.php");
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("deve retornar status 200 caso o arquivo seja CSV", async () => {
      const res = await api
        .post("/boletos")
        .attach("file", "tests/factories/boletos.csv");
     expect(res.body.length).toBeGreaterThan(0);
    });
    it("deve retornar status 200 caso o arquivo seja PDF", async () => {
      const response = await api
        .post("/boletos")
        .attach("file", "tests/factories/boletos.pdf");
      expect(response.status).toBe(httpStatus.OK);
    });
  });
});

describe("GET /boletos", () => {
  it("deve retornar status 200", async () => {
    const response = await api.get("/boletos");
    expect(response.status).toBe(httpStatus.OK);
  });
});
