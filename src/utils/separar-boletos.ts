const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

// Caminho para o arquivo PDF original
const pdfPath = './src/assets/pdf_desafio_greenacesso.pdf';

// Nome do diretório para salvar os arquivos separados
const outputDir = './src/boletos_separados';

// Função para separar o PDF em arquivos individuais
export async function separarPaginasPDF(pdfPath: any, outputDir: any) {
  // Ler o arquivo PDF original
  const pdfBytes = fs.readFileSync(pdfPath);

  // Verificar se o diretório de saída existe, caso contrário, criá-lo
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // Carregar o PDF usando pdf-lib
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const numPages = pdfDoc.getPageCount();

  // Para cada página, criar um novo documento e adicionar a página a ele
  for (let pageNumber = 0; pageNumber < numPages; pageNumber++) {
    // Criar um novo documento
    const separatedDoc = await PDFDocument.create();

    // Clonar a página atual do documento original
    const [page] = await separatedDoc.copyPages(pdfDoc, [pageNumber]);

    // Adicionar a página ao novo documento
    separatedDoc.addPage(page);

    // Salvar o novo documento como um arquivo separado no diretório de saída
    const separatedPDFBytes = await separatedDoc.save();
    const outputPath = `${outputDir}/${pageNumber + 1}.pdf`;
    fs.writeFileSync(outputPath, separatedPDFBytes);
  }

  console.log('Separation completed!');
}