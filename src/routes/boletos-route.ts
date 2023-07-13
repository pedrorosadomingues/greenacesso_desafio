import { Router } from "express";
import { validarArquivo } from "@/middlewares";
import { postBoletos, separarBoletos, exibirBoletos } from "@/controllers";

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


const boletosRouter = Router();

boletosRouter.post("/", upload.single('file'), validarArquivo, postBoletos);
boletosRouter.post("/separar", upload.single('file'), validarArquivo, separarBoletos);
boletosRouter.get("/", exibirBoletos);


export { boletosRouter }