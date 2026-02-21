import placeholderUrl from '@/img/no-image.jpg';

window.onload = () => {
  document.querySelectorAll('img').forEach((image) => {
    if (image.complete && typeof image.naturalWidth === 'number' && image.naturalWidth <= 0) {
      image.src = placeholderUrl;
    }
  });
};
