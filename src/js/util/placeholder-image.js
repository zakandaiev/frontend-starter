import placeholderUrl from '@/img/no-image.jpg';

function placeholderImage(event, customUrl) {
  if (!event) {
    return false;
  }

  const image = event.target;

  if (!image || image.isPlaceholdered) {
    return false;
  }

  image.src = customUrl || placeholderUrl;
  image.isPlaceholdered = true;

  return true;
}

export default placeholderImage;
