import { Router } from "express";
import { validarArquivo } from "@/middlewares";
import { postBoletos, separarBoletos, exibirBoletos, exibirBoletosFiltradosouRelatorio} from "@/controllers";

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const boletosRouter = Router();

boletosRouter
  .get("/lista-completa", exibirBoletos)
  .get("/", exibirBoletosFiltradosouRelatorio)
  .all("/*", upload.single("file"), validarArquivo)
  .post("/", postBoletos)
  .post("/separar", separarBoletos);

export { boletosRouter };
