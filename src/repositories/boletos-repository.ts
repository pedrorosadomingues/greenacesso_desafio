import { prisma } from "@/config";
import { Boleto } from "@prisma/client";

export async function criarBoleto(boleto: Omit<Boleto, "id">) {
    const novoBoleto = await prisma.boleto.create({
        data: boleto
    });

    return novoBoleto;
}