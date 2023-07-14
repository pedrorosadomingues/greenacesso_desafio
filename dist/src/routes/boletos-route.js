"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boletosRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const boletosRouter = (0, express_1.Router)();
exports.boletosRouter = boletosRouter;
boletosRouter
    .get("/lista-completa", controllers_1.exibirBoletos)
    .get("/", controllers_1.exibirBoletosFiltradosouRelatorio)
    .all("/*", upload.single("file"), middlewares_1.validarArquivo)
    .post("/", controllers_1.postBoletos)
    .post("/separar", controllers_1.separarBoletos);
