"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarLotePorNome = void 0;
const config_1 = require("@/config");
async function buscarLotePorNome(nome) {
    const lote = await config_1.prisma.lote.findFirst({
        where: {
            nome_lote: nome
        }
    });
    return lote.id;
}
exports.buscarLotePorNome = buscarLotePorNome;
