import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export function validarArquivo(req: Request, res: Response, next: NextFunction) {
    if( !req.file && req.file.originalname.endsWith('.csv')) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: 'Formato de arquivo inválido. Deve ser um arquivo CSV.' });
    }
}