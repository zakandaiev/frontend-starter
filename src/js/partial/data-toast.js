import toast from '@/js/util/toast';

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (event) => {
    const toastNode = event.target.closest('[data-toast]');

    if (!toastNode) {
      return false;
    }

    const text = toastNode.getAttribute('data-toast').length > 0 ? toastNode.getAttribute('data-toast') : toastNode.textContent;
    const type = toastNode.getAttribute('data-toast-type');
    const duration = toastNode.getAttribute('data-toast-duration');

    toast(text, type, duration);
  });
});
