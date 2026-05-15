import placeholderUrl from '@/img/no-image.jpg';
import { isNumber } from '@/js/util/misc';

window.onload = () => {
  document.querySelectorAll('img').forEach((image) => {
    if (!image.complete || !isNumber(image.naturalWidth) || image.naturalWidth > 0) {
      return false;
    }

    image.src = placeholderUrl;
  });
};
