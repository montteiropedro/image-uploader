import { handleSubmit } from './handleSubmit';

export function handleDragDropEvent(): void {
  const dropZone: HTMLLabelElement = document.querySelector('.card__dropzone')!;

  dropZone.addEventListener('dragover', e => {
    e.preventDefault();

    dropZone.classList.add('dragover--active');
  });

  ['dragleave', 'dragend'].forEach(type => {
    dropZone.addEventListener(type, e => {
      e.preventDefault();

      dropZone.classList.remove('dragover--active');
    });
  });

  dropZone.addEventListener('drop', e => {
    e.preventDefault();

    const inputImage: HTMLInputElement = document.querySelector('#image')!;

    if (e.dataTransfer && e.dataTransfer.files.length) {
      inputImage.files = e.dataTransfer.files;
      
      const [file] = inputImage.files;

      if (!file) return;

      handleSubmit(file);
    };

    dropZone.classList.remove('dragover--active');
  });
}
