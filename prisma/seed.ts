import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.lote.deleteMany({});
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
