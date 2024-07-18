export function handleFormSubmit() {
  const createSpan = document.getElementById('create-span');
  const radioInput = document.querySelectorAll('[name="tamanho"]');
  const uploadButton = document.getElementById('upload-button');
  const errorMessage = document.getElementById('error-message');
  const downloadButtonArea = document.getElementById('button-dowload-area');

  document.getElementById('form-upload').addEventListener('submit', async (e) => {
    e.preventDefault();

    uploadButton.disabled = true;
    createSpan.innerHTML = '';
    createSpan.classList.add('spinner-border', 'text-light');

    let radioSelect = '';

    radioInput.forEach(input => {
      if (input.checked) {
        radioSelect = input.id;
      }
    });

    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    const reader = new FileReader();

    reader.onload = async (e) => {

      try {
        const data = new Uint8Array(e.target.result);
        const XSLX = await import('xlsx');
        const workbook = XSLX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Obter a primeira linha da planilha que contém os nomes das colunas
        const firstRow = XSLX.utils.sheet_to_json(worksheet, { header: 1 })[0];

        console.log('firstRow', firstRow)

        // Criar um novo mapeamento para as colunas com .trim().toUpperCase()
        const newHeader = firstRow.map(columnName => columnName.trim().toUpperCase());

        // Converter a planilha em JSON usando o novo cabeçalho
        const dataJSON = XSLX.utils.sheet_to_json(worksheet, { header: newHeader });

        // Opcionalmente, se você quiser descartar a primeira linha original:
        dataJSON.shift();

        const headers = Object.keys(dataJSON[0]);
        const expectedHeaders = ['PRODUTO', 'MEDIDA', 'VALOR'];

        //console.log(headers)

        const validHeaders = headers.every((header, index) => {
          const isValid = header.trim().toUpperCase() === expectedHeaders[index]
          return isValid
        });

        //console.log('validHeaders', validHeaders)

        if (!validHeaders) {
          uploadButton.disabled = true;
          errorMessage.classList.remove('d-none');
          errorMessage.innerText = 'Verifique se a planilha está preenchida corretamente.';
          createSpan.innerHTML = `<svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          class="bi bi-x-lg text-danger"
          viewBox="0 0 16 16">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
          </svg>`;
          createSpan.classList.remove('spinner-border', 'text-light');
          return;
        }

        const dataSheetFinal = dataJSON.map(row => {
          if (row.VALOR) {
            row.VALOR = String(row.VALOR).replace(/\./g, ',');
          }
          return row;
        });


        console.log('dataSheetFinal', dataSheetFinal)

        const response = await fetch('http://localhost:3333/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ tamanho: radioSelect, data: dataSheetFinal })
        });

        const responseData = await response.json();
        console.log(responseData)
        await makeButtonDownloadAndDisabledSubmitButton(responseData)

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.statusText}`);
        }

      } catch (error) {
        errorMessage.classList.remove('d-none');
        errorMessage.innerText = 'Verifique se a planilha está preenchida corretamente.';
        console.error('Erro durante o processamento:', error);
      }

    };

    reader.readAsArrayBuffer(file);
  });

  async function makeButtonDownloadAndDisabledSubmitButton(responseData) {
    uploadButton.disabled = true;
    createSpan.innerHTML = `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    fill="currentColor"
    class="bi bi-check-lg text-success"
    viewBox="0 0 16 16">
    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
    </svg>`;
    createSpan.classList.remove('spinner-border', 'text-light');

    downloadButtonArea.innerHTML = `<div class="text-center mb-4">
              <p>Seus cartazes ficaram prontos!</p>
            </div><a class="btn btn-primary"
    href="${responseData.download}"
    target="_blank">
   BAIXAR CARTAZES
    </a>`;


  }

  const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));

  document.getElementById('button-click-here').addEventListener('click', () => {
    myModal.show();
  })
  document.getElementById('button-dimiss-modal').addEventListener('click', () => {
    myModal.hide();
  })
  document.getElementById('button-dimiss-modal2').addEventListener('click', () => {
    myModal.hide();
  })


}
