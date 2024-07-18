import { Request, Response } from "express";
import path from 'path';
import { CreatePDF } from "../services/CreatePDF";
import { CreateDirectory, DeleteFile } from '../utils/FileUtils'

const createPDF = new CreatePDF();
const createDirectory = new CreateDirectory();
const deleteFile = new DeleteFile()

class UploadFile {
  async execute(req: Request, res: Response) {
    try {
      const sheet = req.body.data;
      const tamanho = req.body.tamanho;

      if (!sheet) {
        return res.status(400).json({
          status: 'Error',
          message: 'Planilha inválida.'
        });
      }

      const pdfDirectory = path.resolve(__dirname, '../../pdfs');
      createDirectory.execute(pdfDirectory);

      const pdfFileName = `Cartaz_${new Date().
        getDate()}_${new Date().getMonth() + 1}_${Math.random().toFixed(2)}.pdf`;

      const pdfFilePath = path.resolve(pdfDirectory, pdfFileName);

      deleteFile.execute(pdfFilePath, pdfFileName);

      await createPDF.execute(sheet, pdfFilePath, tamanho);

      const downloadUrl = `${req.protocol}://${req.get('host')}/pdfs/${pdfFileName}`;
      return res.status(200).json({
        status: "Success",
        download: downloadUrl
      });
    } catch (e) {
      return res.status(500).json({
        status: 'Error',
        message: 'Algo deu errado'
      })
    }
  }
}

export { UploadFile };
