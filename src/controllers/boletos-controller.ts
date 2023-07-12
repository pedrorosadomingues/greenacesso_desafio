import { Request, Response } from "express";
import httpStatus from "http-status";
import { postBoleto } from "@/services";


export async function postBoletos(req: Request, res: Response) {
    const { file } = req;
    const boletos = await postBoleto(file.path);
    return res.status(httpStatus.OK).json(boletos);
}