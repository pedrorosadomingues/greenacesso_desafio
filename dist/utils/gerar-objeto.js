"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarObjeto = void 0;
function gerarObjeto(data) {
    const key = Object.keys(data)[0];
    const value = Object.values(data)[0];
    // Dividir a chave em um array de propriedades
    const properties = key.split(";");
    // Criar o objeto final
    const result = properties.reduce((obj, prop, index) => {
        obj[prop] = value.split(";")[index];
        return obj;
    }, {});
    return result;
}
exports.gerarObjeto = gerarObjeto;
