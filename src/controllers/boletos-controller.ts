import { Request, Response } from "express";
import httpStatus from "http-status";
import {
  postBoleto,
  separarBoleto,
  exibirTodosBoletos,
  exibirBoletosFiltradosouRelatorioSvc,
} from "@/services";

export async function postBoletos(req: Request, res: Response) {
  const { path } = req.file;
  try {
    const boletos = await postBoleto(path);
    return res.send(boletos).status(httpStatus.OK);
  } catch (error) {
    return res.send(error.message).status(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function separarBoletos(req: Request, res: Response) {
  const { path } = req.file;
  try {
    const boletos = await separarBoleto(path);
    console.log(boletos);
    return res.send(boletos).status(httpStatus.OK);
  } catch (error) {
    console.log(error);
    return res
      .send({ message: "Erro ao processar arquivo" })
      .status(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function exibirBoletos(req: Request, res: Response) {
  try {
    const boletos = await exibirTodosBoletos();
    return res.send(boletos).status(httpStatus.OK);
  } catch (error) {
    console.log(error);
    return res
      .send({ message: "Erro ao exibir boletos" })
      .status(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function exibirBoletosFiltradosouRelatorio(
  req: Request,
  res: Response
) {
  const { nome, valor_inicial, valor_final, id_lote, relatorioParam } =
    req.query;

  // Validar e tratar os parâmetros
  const parsedValorInicial = parseFloat(valor_inicial as string);
  const parsedValorFinal = parseFloat(valor_final as string);
  const parsedIdLote = parseInt(id_lote as string, 10);

  try {
    const boletosFiltrados = await exibirBoletosFiltradosouRelatorioSvc({
      nome: nome as string,
      valor_inicial: parsedValorInicial,
      valor_final: parsedValorFinal,
      id_lote: parsedIdLote,
      relatorioParam: relatorioParam as string,
    });
    return res.status(httpStatus.OK).send(boletosFiltrados);
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: "Erro ao exibir dados" });
  }
}
