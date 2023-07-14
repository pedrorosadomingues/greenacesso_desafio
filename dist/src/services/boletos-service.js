"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarRelatoriosSvc = exports.exibirBoletosFiltradosouRelatorioSvc = exports.exibirTodosBoletos = exports.separarBoleto = exports.postBoleto = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
const pdfkit_1 = __importDefault(require("pdfkit"));
function postBoleto(path) {
    return new Promise((resolve, reject) => {
        const boletos = [];
        fs_1.default.createReadStream(path)
            .pipe((0, csv_parser_1.default)())
            .on("data", async (data) => {
            const boleto = (0, utils_1.gerarObjeto)(data);
            boletos.push(boleto);
            const id_lote = await (0, repositories_1.buscarLotePorNome)(`00${boleto.unidade}`);
            const boletoReq = {
                nome_sacado: boleto.nome,
                id_lote,
                valor: +boleto.valor,
                linha_digitavel: boleto.linha_digitavel,
                ativo: true,
                criado_em: new Date(),
            };
            await (0, repositories_1.criarBoleto)(boletoReq);
        })
            .on("end", () => {
            console.log("CSV file successfully processed");
            resolve(boletos);
        })
            .on("error", (error) => {
            console.log("Error processing CSV file");
            reject(error);
        });
    });
}
exports.postBoleto = postBoleto;
async function separarBoleto(path) {
    const pdfPath = path;
    const outputDir = "./src/boletos_separados";
    await (0, utils_1.separarPaginasPDF)(pdfPath, outputDir);
}
exports.separarBoleto = separarBoleto;
async function exibirTodosBoletos() {
    return await (0, repositories_1.repositoryExibirTodosBoletos)();
}
exports.exibirTodosBoletos = exibirTodosBoletos;
async function exibirBoletosFiltradosouRelatorioSvc(params) {
    const { nome, valor_inicial, valor_final, id_lote, relatorioParam } = params;
    if (relatorioParam === "1")
        return await gerarRelatoriosSvc(relatorioParam);
    const boletosFiltrados = await (0, repositories_1.repositoryExibirBoletosFiltrados)({
        nome,
        valor_inicial,
        valor_final,
        id_lote,
    });
    return boletosFiltrados;
}
exports.exibirBoletosFiltradosouRelatorioSvc = exibirBoletosFiltradosouRelatorioSvc;
async function gerarRelatoriosSvc(relatorio) {
    const boletos = await (0, repositories_1.repositoryExibirTodosBoletos)();
    if (relatorio === "1") {
        const doc = new pdfkit_1.default();
        // Cabeçalho da tabela
        const header = [
            "id",
            "nome_sacado",
            "id_lote",
            "valor",
            "linha_digitavel",
            "ativo",
            "criado_em",
        ];
        // Adicionar cabeçalho da tabela ao documento
        doc.text(header.join(" | "));
        // Adicionar dados da tabela ao documento
        boletos.forEach((boleto) => {
            const row = [
                boleto.id,
                boleto.nome_sacado,
                boleto.id_lote,
                boleto.valor,
                boleto.linha_digitavel,
                boleto.ativo,
                boleto.criado_em.toISOString().split("T")[0],
                // Adicione mais colunas conforme necessário
            ];
            doc.text(row.join(" | "));
        });
        doc.end();
        const fileName = "./src/relatorios/relatorio.pdf";
        const base64 = fs_1.default.readFileSync(fileName, { encoding: "base64" });
        console.log("Relatório gerado com sucesso");
        return { base64 };
    }
}
exports.gerarRelatoriosSvc = gerarRelatoriosSvc;
