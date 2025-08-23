async function copyToClipboard(textToCopy) {
  let result = false;

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(textToCopy);

      result = true;
    } finally {
      // do nothing
    }
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;

    textArea.style.position = 'fixed';
    textArea.style.zIndex = '-1000000';
    textArea.style.top = '100%';
    textArea.style.left = '100%';
    textArea.style.opacity = '0';
    textArea.style.visibility = 'hidden';

    document.body.append(textArea);

    textArea.select();

    try {
      document.execCommand('copy');

      result = true;
    } finally {
      textArea.remove();
    }
  }

  return result;
}

export default copyToClipboard;
