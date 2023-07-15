import fs from "fs";
import csv from "csv-parser";
import { Boleto } from "@prisma/client";
import {
  buscarLotePorNome,
  criarBoleto,
  repositoryExibirTodosBoletos,
  repositoryExibirBoletosFiltrados,
} from "@/repositories";
import { gerarObjeto, separarPaginasPDF } from "@/utils";
import PDFDocument from "pdfkit";

export function postBoleto(path: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const boletos: Boleto[] = [];
    fs.createReadStream(path)
      .pipe(csv())
      .on("data", async (data: string, index: number) => {
        const boleto = gerarObjeto(data);

        boletos.push(boleto);
        const id_lote = await buscarLotePorNome(`00${boleto.unidade}`);
        const boletoReq = {
          id: index + 1,
          nome_sacado: boleto.nome,
          id_lote,
          valor: +boleto.valor,
          linha_digitavel: boleto.linha_digitavel,
          ativo: true,
          criado_em: new Date(),
        } as Boleto;
        await criarBoleto(boletoReq);
      })
      .on("end", () => {
        resolve(boletos);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

export async function separarBoleto(path: any): Promise<void> {
  const pdfPath = path;
  const outputDir = "./src/boletos_separados";

  await separarPaginasPDF(pdfPath, outputDir);
}

export async function exibirBoletosOuRelatorioSvc(params: any): Promise<any> {
  if (!params) return await repositoryExibirTodosBoletos();
  const { nome, valor_inicial, valor_final, id_lote, relatorioParam } = params;

  if (relatorioParam === "1") return await gerarRelatoriosSvc(relatorioParam);

  const boletosFiltrados = await repositoryExibirBoletosFiltrados({
    nome,
    valor_inicial,
    valor_final,
    id_lote,
  });
  return boletosFiltrados;
}

export async function gerarRelatoriosSvc(relatorio: any): Promise<any> {
  const boletos = await repositoryExibirTodosBoletos();
  if (relatorio === "1") {
    const doc = new PDFDocument();

    // Cabeçalho da tabela
    const header = [
      "id",
      "nome_sacado",
      "id_lote",
      "valor",
      "linha_digitavel",
      "ativo",
      "criado_em",
    ];

    // Adicionar cabeçalho da tabela ao documento
    doc.text(header.join(" | "));

    // Adicionar dados da tabela ao documento
    boletos.forEach((boleto) => {
      const row = [
        boleto.id,
        boleto.nome_sacado,
        boleto.id_lote,
        boleto.valor,
        boleto.linha_digitavel,
        boleto.ativo,
        boleto.criado_em.toISOString().split("T")[0],
        // Adicione mais colunas conforme necessário
      ];
      doc.text(row.join(" | "));
    });

    doc.end();

    const fileName = "./src/relatorios/relatorio.pdf";
    const base64 = fs.readFileSync(fileName, { encoding: "base64" });
    return { base64 };
  }
}
