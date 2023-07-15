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
  it("deve retornar retornar todos os boletos caso filtro nao seja valido", async () => {
    const response = await api.get("/boletos");
    expect(response.body.length).toBeGreaterThan(0);
  });
  describe("quando filtro for valido", () => {
    it("deve retornar todos boletos de JOSE caso ?nome=JOSE DA SILVA", async () => {
      const response = await api.get("/boletos?nome=JOSE DA SILVA");
      expect(response.body[0].nome_sacado).toBe("JOSE DA SILVA");
    });
    it("deve retornar todos boletos com valor entre 100 e 200 caso ?valorInicial=100&valorFinal=200", async () => {
      const response = await api.get(
        "/boletos?valorInicial=100&valorFinal=200"
      );
      expect(response.body[0].valor).toBeGreaterThanOrEqual(100);
      expect(response.body[0].valor).toBeLessThanOrEqual(200);
    });
  });
});
