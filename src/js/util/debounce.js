function debounce(callback, delay = 100) {
  let timeoutId = null;

  return (...args) => new Promise((resolve) => {
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(async () => {
      const result = await callback(...args);
      resolve(result);
    }, delay);
  });
}

export default debounce;
