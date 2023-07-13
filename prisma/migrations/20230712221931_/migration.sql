/*
  Warnings:

  - You are about to drop the column `nome` on the `lotes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "lotes" DROP COLUMN "nome",
ADD COLUMN     "nome_lote" VARCHAR(100);
