import { ResponseProps } from "./handleSubmit";

export function handleImagePreview(apiResponse: ResponseProps): void {
  const previewArea: HTMLImageElement = document.querySelector('.image-preview')!;
  const dropZonePlaceholders: NodeListOf<HTMLElement> = document.querySelectorAll('.card__dropzone--placeholder')!;

  try {
    if (!apiResponse) throw new Error('No file found.');

    dropZonePlaceholders.forEach(placeholderElement => {
      placeholderElement.style.display = 'none';
    });

    previewArea.src = apiResponse.imageUrl;
    previewArea.style.display = 'block';
  }
  catch (err) {
    console.error(err);
  }
}
