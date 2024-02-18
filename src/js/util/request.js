import sleep from '@/js/util/sleep';

async function fetchWithTimeout(resource, options = {}, timeout = 15000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });

  clearTimeout(id);

  return response;
}

async function request(resource, options = {}, timeout = 15000, delay = 1000) {
  const startTime = performance.now();

  if (!options.method) {
    options.method = 'POST';
  }

  if (options.method.toLowerCase() !== 'get') {
    if (!options.headers) {
      options.headers = {
        'Content-Type': 'application/json',
      };
    }

    if (options.body) {
      options.body = JSON.stringify(options.body);
    } else {
      options.body = JSON.stringify({});
    }
  }

  const data = {
    code: null,
    status: null,
    message: null,
    data: null,
  };

  try {
    const response = await fetchWithTimeout(resource, options, timeout);
    const responseData = await response.json() ?? {};

    data.code = response.status;
    data.status = responseData.status;
    data.message = responseData.message;
    data.data = responseData.data;
  } catch (error) {
    data.status = 'error';
    data.message = error;
  }

  const endTime = performance.now();

  const differenceTime = endTime - startTime;

  if (differenceTime < delay) {
    await sleep(delay - differenceTime);
  }

  return data;
}

export {
  fetchWithTimeout,
  request,
};
