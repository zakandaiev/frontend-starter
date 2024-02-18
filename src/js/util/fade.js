function fadeIn(element, callback = null, timing = 20) {
  if (!element) {
    return false;
  }

  let opacity = 0;

  const timer = setInterval(() => {
    if (opacity >= 1) {
      clearInterval(timer);

      if (callback instanceof Function) {
        callback(element);
      }
    }

    element.style.opacity = opacity.toFixed(1);

    opacity += 0.1;
  }, timing);
}

function fadeOut(element, callback = null, timing = 20) {
  if (!element) {
    return false;
  }

  let opacity = 1;

  const timer = setInterval(() => {
    if (opacity <= 0) {
      clearInterval(timer);

      if (callback instanceof Function) {
        callback(element);
      } else {
        element.remove();
      }
    }

    element.style.opacity = opacity.toFixed(1);

    opacity -= 0.1;
  }, timing);
}

export {
  fadeIn,
  fadeOut,
};
