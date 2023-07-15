import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.boleto.deleteMany({});
  await prisma.lote.deleteMany({});
  await prisma.lote.createMany({
    data: [
      {
        id: 3,
        nome_lote: "0017",
        ativo: true,
        criado_em: new Date(),
      },
      {
        id: 6,
        nome_lote: "0018",
        ativo: true,
        criado_em: new Date(),
      },
      {
        id: 7,
        nome_lote: "0019",
        ativo: true,
        criado_em: new Date(),
      },
    ],
  });
  await prisma.boleto.createMany({
    data: [
      {
        id: 1,
        nome_sacado: "JOSE DA SILVA",
        id_lote: 3,
        valor: 182.54,
        linha_digitavel: "123567123456123456",
        ativo: true,
        criado_em: new Date(),
      },
      {
        id: 2,
        nome_sacado: "MARCOS ROBERTO",
        id_lote: 6,
        valor: 178.20,
        linha_digitavel: "123567123456123456",
        ativo: true,
        criado_em: new Date(),
      },
      {
        id: 3,
        nome_sacado: "MARCIA CARVALHO",
        id_lote: 7,
        valor: 128.00,
        linha_digitavel: "123567123456123456",
        ativo: true,
        criado_em: new Date(),
      },
    ],
  });
}

async function main() {
  return seed();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
