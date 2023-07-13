import { prisma } from "@/config";
import { Boleto } from "@prisma/client";

export async function criarBoleto(boleto: Omit<Boleto, "id">) {
    const novoBoleto = await prisma.boleto.create({
        data: boleto
    });

    return novoBoleto;
}

export async function repositoryExibirTodosBoletos() {
    const boletos = await prisma.boleto.findMany();

    return boletos;
}