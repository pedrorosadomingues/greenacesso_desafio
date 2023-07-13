import fs from "fs";
import csv from "csv-parser";
import { PDFDocument } from "pdf-lib";
import { Boleto } from "@prisma/client";
import { buscarLotePorNome, criarBoleto } from "@/repositories";
import { gerarObjeto, separarPaginasPDF } from "@/utils";

export function postBoleto(path: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const boletos: Boleto[] = [];

    fs.createReadStream(path)
      .pipe(csv())
      .on("data", async (data) => {
        const boleto = gerarObjeto(data);

        boletos.push(boleto);
        const id_lote = await buscarLotePorNome(`00${boleto.unidade}`);
        const boletoReq = {
          nome_sacado: boleto.nome,
          id_lote,
          valor: +boleto.valor,
          linha_digitavel: boleto.linha_digitavel,
          ativo: true,
          criado_em: new Date(),
        };
        await criarBoleto(boletoReq);
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
        resolve(boletos);
      })
      .on("error", (error) => {
        console.error("Error processing CSV file:", error);
        reject(error);
      });
  });
}

export async function separarBoleto(path: string): Promise<void> {
  const pdfPath = path;
  const outputDir = "./src/boletos_separados";

  await separarPaginasPDF(pdfPath, outputDir);
}


