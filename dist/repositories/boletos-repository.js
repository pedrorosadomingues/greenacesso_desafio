"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositoryExibirBoletosFiltrados = exports.repositoryExibirTodosBoletos = exports.criarBoleto = void 0;
const config_1 = require("@/config");
async function criarBoleto(boleto) {
    const novoBoleto = await config_1.prisma.boleto.create({
        data: boleto,
    });
    return novoBoleto;
}
exports.criarBoleto = criarBoleto;
async function repositoryExibirTodosBoletos() {
    const boletos = await config_1.prisma.boleto.findMany();
    return boletos;
}
exports.repositoryExibirTodosBoletos = repositoryExibirTodosBoletos;
async function repositoryExibirBoletosFiltrados(params) {
    const { nome, valor_inicial, valor_final, id_lote } = params;
    const where = {};
    if (nome) {
        where.nome_sacado = {
            contains: nome,
        };
    }
    if (valor_inicial && valor_final) {
        where.valor = {
            gte: Number(valor_inicial),
            lte: Number(valor_final),
        };
    }
    if (id_lote) {
        where.id_lote = {
            equals: id_lote,
        };
    }
    const boletosFiltrados = await config_1.prisma.boleto.findMany({
        where: where,
    });
    return boletosFiltrados;
}
exports.repositoryExibirBoletosFiltrados = repositoryExibirBoletosFiltrados;
