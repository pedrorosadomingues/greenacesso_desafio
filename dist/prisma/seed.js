"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seed() {
    await prisma.lote.createMany({
        data: [
            {
                nome_lote: "0017",
                ativo: true,
                criado_em: new Date(),
            },
            {
                nome_lote: "0018",
                ativo: true,
                criado_em: new Date(),
            },
            {
                nome_lote: "0019",
                ativo: true,
                criado_em: new Date(),
            },
        ],
    });
}
seed();
