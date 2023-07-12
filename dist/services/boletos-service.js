"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBoleto = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
function postBoleto(path) {
    const boletos = [];
    fs_1.default.createReadStream(path)
        .pipe((0, csv_parser_1.default)())
        .on('data', (data) => boletos.push(data))
        .on('end', () => {
        console.log(boletos);
        return boletos;
    });
}
exports.postBoleto = postBoleto;
