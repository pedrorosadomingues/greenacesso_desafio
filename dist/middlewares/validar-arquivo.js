"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarArquivo = void 0;
const http_status_1 = __importDefault(require("http-status"));
function validarArquivo(req, res, next) {
    if (!req.file && req.file.originalname.endsWith('.csv')) {
        return res.status(http_status_1.default.BAD_REQUEST).json({ message: 'Formato de arquivo inválido. Deve ser um arquivo CSV.' });
    }
}
exports.validarArquivo = validarArquivo;
