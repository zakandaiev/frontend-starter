document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('contextmenu', (event) => {
    if (event.target.nodeName === 'IMG') {
      event.preventDefault();
    }
  });
});
