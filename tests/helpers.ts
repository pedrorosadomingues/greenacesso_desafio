import { prisma } from "@/config";

export async function limparBanco(): Promise<void> {
  await prisma.boleto.deleteMany();
  await prisma.lote.deleteMany();
}