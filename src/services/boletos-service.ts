import fs from 'fs';
import csv from 'csv-parser';
import { Boleto } from '@prisma/client';
import { buscarLotePorNome, criarBoleto } from '@/repositories';
import { gerarObjeto } from '@/utils';

export function postBoleto(path: string): Promise<any> {
    
    return new Promise((resolve, reject) => {
      const boletos: Boleto[] = [];
  
      fs.createReadStream(path)
        .pipe(csv())
        .on('data', async (data) => {
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
          }
            await criarBoleto(boletoReq);
        })
        .on('end', () => {
          console.log('CSV file successfully processed');
          resolve(boletos);
        })
        .on('error', (error) => {
          console.error('Error processing CSV file:', error);
          reject(error);
        });
    });
  }