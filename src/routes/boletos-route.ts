import { Router } from "express";
import { validarArquivo } from "@/middlewares";
import { postBoletos } from "@/controllers";

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


const boletosRouter = Router();

boletosRouter.post("/", upload.single('file'), validarArquivo, postBoletos);

export { boletosRouter }