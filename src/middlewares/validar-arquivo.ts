import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { arquivoNaoEncontrado } from '@/errors';

export function validarArquivo(req: Request, res: Response, next: NextFunction) {
    if( !req.file ) return res.status(httpStatus.BAD_REQUEST).json(arquivoNaoEncontrado());
    if( req.file && !req.file.originalname.endsWith(`.csv`) && !req.file.originalname.endsWith(`.pdf`) ) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: 'Formato de arquivo inválido. Deve ser um arquivo CSV.' });
    }
    next();
}