import { Request, Response } from "express";
import httpStatus from "http-status";
import { postBoleto, separarBoleto, exibirTodosBoletos } from "@/services";
import exp from "constants";

export async function postBoletos(req: Request, res: Response) {
  const { path } = req.file;
  try {
    const boletos = await postBoleto(path);
    console.log(boletos);
    return res.send(boletos).status(httpStatus.OK);
  } catch (error) {
    console.log(error);
    return res
      .send({ message: "Erro ao processar arquivo" })
      .status(httpStatus.INTERNAL_SERVER_ERROR);
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
   return await exibirTodosBoletos();
  } catch (error) {
    console.log(error);
  }
}