import copyToClipboard from '@/js/util/clipboard';

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (event) => {
    const clipboardNode = event.target.closest('[data-copy]');

    if (!clipboardNode) {
      return false;
    }

    const text = clipboardNode.getAttribute('data-copy').length > 0 ? clipboardNode.getAttribute('data-copy') : clipboardNode.textContent;

    if (!text) {
      return false;
    }

    copyToClipboard(text);
  });
});
