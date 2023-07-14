"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exibirBoletosFiltradosouRelatorio = exports.exibirBoletos = exports.separarBoletos = exports.postBoletos = void 0;
const http_status_1 = __importDefault(require("http-status"));
const services_1 = require("@/services");
async function postBoletos(req, res) {
    const { path } = req.file;
    try {
        const boletos = await (0, services_1.postBoleto)(path);
        return res.send(boletos).status(http_status_1.default.OK);
    }
    catch (error) {
        return res.send(error.message).status(http_status_1.default.INTERNAL_SERVER_ERROR);
    }
}
exports.postBoletos = postBoletos;
async function separarBoletos(req, res) {
    const { path } = req.file;
    try {
        const boletos = await (0, services_1.separarBoleto)(path);
        console.log(boletos);
        return res.send(boletos).status(http_status_1.default.OK);
    }
    catch (error) {
        console.log(error);
        return res
            .send({ message: "Erro ao processar arquivo" })
            .status(http_status_1.default.INTERNAL_SERVER_ERROR);
    }
}
exports.separarBoletos = separarBoletos;
async function exibirBoletos(req, res) {
    try {
        const boletos = await (0, services_1.exibirTodosBoletos)();
        return res.send(boletos).status(http_status_1.default.OK);
    }
    catch (error) {
        console.log(error);
        return res
            .send({ message: "Erro ao exibir boletos" })
            .status(http_status_1.default.INTERNAL_SERVER_ERROR);
    }
}
exports.exibirBoletos = exibirBoletos;
async function exibirBoletosFiltradosouRelatorio(req, res) {
    const { nome, valor_inicial, valor_final, id_lote, relatorioParam } = req.query;
    // Validar e tratar os parâmetros
    const parsedValorInicial = parseFloat(valor_inicial);
    const parsedValorFinal = parseFloat(valor_final);
    const parsedIdLote = parseInt(id_lote, 10);
    try {
        const boletosFiltrados = await (0, services_1.exibirBoletosFiltradosouRelatorioSvc)({
            nome: nome,
            valor_inicial: parsedValorInicial,
            valor_final: parsedValorFinal,
            id_lote: parsedIdLote,
            relatorioParam: relatorioParam,
        });
        return res.status(http_status_1.default.OK).send(boletosFiltrados);
    }
    catch (error) {
        console.log(error);
        return res
            .status(http_status_1.default.INTERNAL_SERVER_ERROR)
            .send({ message: "Erro ao exibir dados" });
    }
}
exports.exibirBoletosFiltradosouRelatorio = exibirBoletosFiltradosouRelatorio;
