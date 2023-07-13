export interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
  }
  
  declare global {
    namespace Express {
      interface Request {
        file?: MulterFile;
      }
    }
  }

  export interface BoletosFiltradosParams {
    nome?: string;
    valor_inicial?: number;
    valor_final?: number;
    id_lote?: number;
  }
  