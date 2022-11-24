import { handleImagePreview } from './handleImagePreview';
import { handleStateChanges } from './handleStateChanges';

export interface ResponseProps {
  message: string;
  imageUrl: string;
  error?: string;
}

export async function handleSubmit(file: File): Promise<void> {
  const uploadCard: HTMLFormElement = document.querySelector('.card')!;
  const loadingCard: HTMLDivElement = document.querySelector('.loading-card')!;

  uploadCard.dataset.active = 'false';
  loadingCard.dataset.active = 'true';

  try {
    if (!(/image/.test(file.type))) throw new Error('Only images types are allowed.');

    const formData = new FormData();
    formData.append('file', file);

    if (!formData) throw new Error('Error creating the data / Invalid data.');

    const response: ResponseProps = await fetch(import.meta.env.VITE_API_URL, {
      method: 'POST',
      mode: 'cors',
      body: formData
    })
      .then(response => response.json());

    if (response.error) throw new Error(response.error);

    handleStateChanges(response);
    handleImagePreview(response);
  }
  catch (err) {
    console.error(err);
  }
  finally {
    uploadCard.dataset.active = 'true';
    loadingCard.dataset.active = 'false';
  }
}
