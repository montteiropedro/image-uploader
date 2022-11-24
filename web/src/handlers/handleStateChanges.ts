import { ResponseProps } from "./handleSubmit";

interface UploadCardFooter extends HTMLDivElement {
  firstElementChild: HTMLDivElement;
}

export function handleStateChanges(apiResponse: ResponseProps): void {
  const uploadCardInitialHeader: HTMLDivElement = document.querySelector('.card__header--initial-state')!;
  const uploadCardCompletedHeader: HTMLDivElement = document.querySelector('.card__header--completed-state')!;
  const uploadCardInitialFooter: UploadCardFooter = document.querySelector('.card__footer--initial-state')!;
  const uploadCardCompletedFooter: UploadCardFooter = document.querySelector('.card__footer--completed-state')!;

  uploadCardInitialHeader.dataset.active = 'false';
  uploadCardCompletedHeader.dataset.active = 'true';

  uploadCardInitialFooter.dataset.active = 'false';
  uploadCardCompletedFooter.dataset.active = 'true';

  uploadCardCompletedFooter.firstElementChild!.textContent = apiResponse.imageUrl;
  uploadCardCompletedFooter.firstElementChild!.title = apiResponse.imageUrl;
}
