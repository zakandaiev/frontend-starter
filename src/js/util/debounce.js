let timeout;

async function debounce(callback, delay = 500, ...args) {
  return new Promise((resolve) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(async () => {
      const result = await callback(...args);

      resolve(result);
    }, delay);
  });
}

export default debounce;
