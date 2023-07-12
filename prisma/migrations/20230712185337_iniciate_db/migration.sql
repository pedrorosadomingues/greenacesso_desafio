-- CreateTable
CREATE TABLE "Lote" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100),
    "ativo" BOOLEAN,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Boleto" (
    "id" SERIAL NOT NULL,
    "nome_sacado" VARCHAR(255),
    "id_lote" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION,
    "linha_digitavel" VARCHAR(255),
    "ativo" BOOLEAN,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Boleto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Boleto" ADD CONSTRAINT "Boleto_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "Lote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
