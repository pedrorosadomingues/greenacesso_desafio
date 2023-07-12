"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBoletos = void 0;
const http_status_1 = __importDefault(require("http-status"));
const services_1 = require("@/services");
async function postBoletos(req, res) {
    const { file } = req;
    const boletos = await (0, services_1.postBoleto)(file.path);
    return res.status(http_status_1.default.OK).json(boletos);
}
exports.postBoletos = postBoletos;
