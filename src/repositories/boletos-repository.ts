import { prisma } from "@/config";
import { Boleto, Prisma, PrismaClient } from "@prisma/client";
import { BoletosFiltradosParams } from "@/protocols";

export async function criarBoleto(boleto: Omit<Boleto, "id">) {
  const novoBoleto = await prisma.boleto.create({
    data: boleto,
  });

  return novoBoleto;
}

export async function repositoryExibirTodosBoletos() {
  const boletos = await prisma.boleto.findMany();

  return boletos;
}

export async function repositoryExibirBoletosFiltrados(
  params: BoletosFiltradosParams
) {
  const { nome, valor_inicial, valor_final, id_lote } = params;

  const where: Prisma.BoletoWhereInput = {};

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

  const boletosFiltrados = await prisma.boleto.findMany({
    where: where,
  });

  return boletosFiltrados;
}
