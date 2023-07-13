import { prisma } from "@/config";
import { Lote } from "@prisma/client";

export async function buscarLotePorNome(nome: string) {
    const lote: Lote = await prisma.lote.findFirst({
        where: {
            nome_lote: nome
        }
    });

    return lote.id;
}