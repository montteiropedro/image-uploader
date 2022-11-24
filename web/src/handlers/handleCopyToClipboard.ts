export function handleCopyToClipboard(): void {
  const copyToClipboardBtn: HTMLButtonElement = document.querySelector('.card__copy-link-btn')!;
  
  if (!copyToClipboardBtn) return;

  copyToClipboardBtn.addEventListener('click', e => {
    e.preventDefault();

    try {
      const url = copyToClipboardBtn.previousElementSibling?.textContent;

      if (!url) throw new Error('No image URL found.');
  
      copyToClipboardBtn.dataset.afterActive = 'true';
  
      navigator.clipboard.writeText(url);
    }
    catch (err) {
      console.error(err);
    }
  });

  setInterval(() => {
    copyToClipboardBtn.dataset.afterActive = 'false';
  }, 1500);
}
