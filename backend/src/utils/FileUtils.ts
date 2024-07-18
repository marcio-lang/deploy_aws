import fs from 'fs';

class CreateDirectory {
  execute(directoryPath: string) {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }
  }
}

class DeleteFile {
  execute(filePath: string, fileName: string) {
    const fileExpirationTime = 2 * 60 * 60 * 1000;

    setTimeout(() => {
      fs.unlink(filePath, (e) => {
        if (e) {
          return console.log(`Erro ao excluir o arquivo ${fileName}`, e);
        }
        return console.log(`Arquivo excluído ${filePath}`);
      })
    }, fileExpirationTime);
  }
}

export { CreateDirectory, DeleteFile };
