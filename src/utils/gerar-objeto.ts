export function gerarObjeto(data: string) {
  const key = Object.keys(data)[0] as string;
  const value = Object.values(data)[0] as string;

  // Dividir a chave em um array de propriedades
  const properties = key.split(";");

  // Criar o objeto final
  const result = properties.reduce((obj: any, prop: string, index: number) => {
    obj[prop] = value.split(";")[index];
    return obj;
  }, {});

  return result;
}
