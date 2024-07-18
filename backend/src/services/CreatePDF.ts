import pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions, Content } from "pdfmake/interfaces";
import * as fs from "fs";
import path from "path";

const urbaneFontPath = path.join(__dirname, "fonts", "Urbane-Bold.ttf");
const urbaneFont = fs.readFileSync(urbaneFontPath).toString("base64");

pdfMake.vfs = {
  "Urbane-Bold.ttf": urbaneFont,
};

pdfMake.fonts = {
  Urbane: {
    bold: "Urbane-Bold.ttf",
  },
};

interface DataRow {
  PRODUTO: string;
  MEDIDA: string;
  VALOR: string;
}

class CreatePDF {
  async execute(
    data: DataRow[],
    outputFilePath: string,
    checkBoxSmallPoster: string,
  ): Promise<void> {
    const validRows = data.filter(
      (row) => row.PRODUTO != '' && row.VALOR != '' && row.MEDIDA != '');

      const documentDefinitions = checkBoxSmallPoster === 'cartaz-pequeno' ? this.generateSmallPoster(validRows) : this.generateBigPoster(validRows);

      const pdfDocGenerator = pdfMake.createPdf(documentDefinitions);

      pdfDocGenerator.getBuffer((buffer) => {
       fs.writeFile(outputFilePath, buffer, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("PDF criado com sucesso.");
        }
      });
    });
  }

  private generateBigPoster(data: DataRow[]): TDocumentDefinitions {
    const content = data.map((row, index) => {
      console.log('linha',index , '-', row)
      const pageContent: Content = {
        stack: [
          {
            text: row.PRODUTO,
            bold: true,
            fontSize: 50,
            alignment: "center",
            absolutePosition: { x: 208, y: 180 },
          },
          {
            text: "POR:",
            bold: true,
            fontSize: 30,
            alignment: "left",
            absolutePosition: { x: 50, y: 500 },
          },
          {
            text: "R$",
            bold: true,
            fontSize: 30,
            alignment: "left",
            absolutePosition: { x: 17, y: 720 },
          },
          {
            text: row.VALOR,
            bold: true,
            fontSize: 170,
            alignment: "center",
            absolutePosition: { x: 10, y: 520 },
          },
          {
            text: row.MEDIDA,
            bold: true,
            fontSize: 30,
            alignment: "right",
            absolutePosition: { x: 0, y: 720 },
          }
        ],
        margin: [0, 0, 0, 20],
      };

      if (index < data.length - 1) {
        pageContent.stack.push({ text: "", pageBreak: "after" });
      }

      return pageContent;
    })

    return {
      pageSize: "A4",
      pageMargins: [10, 10, 20, 10],
      content: content,
      defaultStyle: {
        font: "Urbane",
        bold: true
      },
    };
  }

  private generateSmallPoster(data: DataRow[]): TDocumentDefinitions {
    const content: Content[] = [];

    for (let i = 0; i < data.length; i += 2) {
      console.log(i)
      const row = data[i];
      const nextRow = data[i + 1] ? data[i + 1] : null

      console.log(nextRow)

      if (nextRow) {
        console.log('entrou no nextRow')
        const pageContent: Content = {
          stack: [
            {
              text: row.PRODUTO,
              fontSize: 37,
              alignment: "center",
              absolutePosition: { x: 280, y: 80 },
            },
            {
              text: "R$",
              fontSize: 20,
              alignment: "left",
              absolutePosition: { x: 280, y: 335 },
            },
            {
              text: row.VALOR,
              bold: true,
              fontSize: 76,
              alignment: "center",
              absolutePosition: { x: 280, y: 276 },
            },
            {
              text: row.MEDIDA,
              fontSize: 20,
              alignment: "right",
              absolutePosition: { x: 0, y: 335 },
            },
            {
              text: nextRow.PRODUTO,
              fontSize: 37,
              alignment: "center",
              absolutePosition: { x: 280, y: 510 },
            },
            {
              text: "R$",
              fontSize: 20,
              alignment: "left",
              absolutePosition: { x: 280, y: 755 },
            },
            {
              text: nextRow.VALOR,
              fontSize: 76,
              alignment: "center",
              absolutePosition: { x: 280, y: 696 },
            },
            {
              text: nextRow.MEDIDA,
              fontSize: 20,
              alignment: "right",
              absolutePosition: { x: 0, y: 755 },
            },
          ],
          margin: [0, 0, 0, 20],
        };
        if (i + 2 < data.length) {
          pageContent.stack.push({ text: "", pageBreak: "after" });
        }
        content.push(pageContent);
      } else {
        const pageContent: Content = {
          stack: [
            {
              text: row.PRODUTO,
              fontSize: 37,
              alignment: "center",
              absolutePosition: { x: 280, y: 80 },
            },
            {
              text: "R$",
              fontSize: 20,
              alignment: "left",
              absolutePosition: { x: 280, y: 335 },
            },
            {
              text: row.VALOR,
              bold: true,
              fontSize: 76,
              alignment: "center",
              absolutePosition: { x: 280, y: 276 },
            },
            {
              text: row.MEDIDA,
              fontSize: 20,
              alignment: "right",
              absolutePosition: { x: 0, y: 335 },
            }
          ],
          margin: [0, 0, 0, 20],
        };
        if (i + 2 < data.length) {
          pageContent.stack.push({ text: "", pageBreak: "after" });
        }
        content.push(pageContent);
      }
    }

    return {
      pageSize: "A4",
      pageMargins: [10, 10, 28, 10],
      content: content,
      defaultStyle: {
        font: "Urbane",
        bold: true
      },
    };
  }
}

export { CreatePDF, DataRow };
