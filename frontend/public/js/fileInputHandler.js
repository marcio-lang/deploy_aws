export function handleFileInputChange() {
  const createSpan = document.getElementById('create-span');
  const fileInput = document.getElementById('file-input');
  const uploadButton = document.getElementById('upload-button');
  const errorMessage = document.getElementById('error-message');
  const downloadButtonArea = document.getElementById('button-dowload-area');

  fileInput.addEventListener('change', () => {
    createSpan.innerText = 'CRIAR';
    errorMessage.innerText = '';
    uploadButton.disabled = false;
    downloadButtonArea.innerHTML = '';
    createSpan.classList.remove('spinner-border', 'text-light');
  });
}
