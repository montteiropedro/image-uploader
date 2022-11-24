import { handleCopyToClipboard } from './handlers/handleCopyToClipboard';
import { handleDragDropEvent } from './handlers/handleDragDropEvent';
import { handleSubmit } from './handlers/handleSubmit';

const inputImage: HTMLInputElement = document.querySelector('#image')!;

inputImage.addEventListener('change', () => {
  if (!inputImage.files) return;

  const [file] = inputImage.files;

  if (!file) return;

  handleSubmit(file);
});

// Activate drag and drop support
handleDragDropEvent();

// Let user copy image link to clipboard on button click
handleCopyToClipboard();
