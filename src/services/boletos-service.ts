import fs from 'fs';
import csv from 'csv-parser';
import { Boleto } from '@prisma/client';

export function postBoleto(path: string) {
    const boletos = [] as Boleto[];

    fs.createReadStream(path)
    .pipe(csv())
    .on('data', (data) => boletos.push(data))
    .on('end', () => {
        console.log(boletos);
        return boletos;
    });



}