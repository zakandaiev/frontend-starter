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
    options.method = 'GET';
  }

  if (!options.headers) {
    options.headers = {
      'Content-Type': 'application/json',
    };
  }

  if (typeof options.body === 'object' && !(options.body instanceof FormData)) {
    options.body = JSON.stringify(options.body);
  }

  const data = {
    code: null,
    status: null,
    message: null,
    data: null,
  };

  let response = {};

  try {
    response = await fetchWithTimeout(resource, options, timeout);

    data.code = response.status;
  } catch (error) {
    // do nothing
  }

  try {
    const responseData = await response.json() || {};

    Object.assign(data, responseData);

    data.status = responseData.status || null;
    data.message = responseData.message || null;
    data.data = responseData.data || responseData.payload || null;
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
