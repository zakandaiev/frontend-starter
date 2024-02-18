function toast(text, type = 'default', duration = null) {
  if (typeof text !== 'string' || !text?.length) {
    return false;
  }

  let container = document.querySelector('.toasts');
  if (!container) {
    container = document.createElement('div');
    container.classList.add('toasts');
    document.body.appendChild(container);
  }

  const toastNode = document.createElement('div');
  toastNode.classList.add('toasts__item');
  if (type) {
    toastNode.classList.add(type);
  }

  const toastIcon = document.createElement('i');
  toastIcon.classList.add('toasts__icon');

  const toastText = document.createElement('span');
  toastText.classList.add('toasts__text');
  toastText.textContent = text;

  toastNode.appendChild(toastIcon);
  toastNode.appendChild(toastText);

  container.appendChild(toastNode);

  toastNode.addEventListener('click', () => toastRemove(container, toastNode));

  setTimeout(() => toastRemove(container, toastNode), duration || 5000);

  return true;
}

function toastRemove(toastContainer, toastNode) {
  toastNode.classList.add('disappear');

  toastNode.addEventListener('animationend', () => {
    toastNode.remove();

    if (toastContainer && toastContainer.childElementCount <= 0) {
      toastContainer.remove();
    }
  });
}

export default toast;
