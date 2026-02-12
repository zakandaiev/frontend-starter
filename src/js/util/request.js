import Config from '@/config';
import sleep from '@/js/util/sleep';

function getApiTimeout(timeout) {
  if (typeof timeout === 'number') {
    return timeout;
  }

  if (Config.api.timeoutMs === 'number') {
    return Config.api.timeoutMs;
  }

  return 15000;
}

function getApiDelay(delay) {
  if (typeof delay === 'number') {
    return delay;
  }

  if (Config.api.delayMs === 'number') {
    return Config.api.delayMs;
  }

  return 1000;
}

async function fetchWithTimeout(resource, options = {}, timeout = null) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), getApiTimeout(timeout));

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });

  clearTimeout(timeoutId);

  return response;
}

async function request(resource, opt = {}, timeout = null, delay = null) {
  const startTime = performance.now();

  const options = {
    ...opt,
    headers: opt.headers || { 'Content-Type': 'application/json' },
    method: opt.method || 'GET',
  };

  if (options.headers.Authorization === undefined && Config.api.key && Config.api.key.length) {
    options.headers.Authorization = Config.api.key;
  }

  if (options.method.toUpperCase() === 'GET' && typeof options.body === 'object' && options.body !== null) {
    const url = new URL(resource, window.location.origin);
    Object.entries(options.body).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        return false;
      }
      if (typeof value === 'object') {
        url.searchParams.append(key, JSON.stringify(value));
      } else {
        url.searchParams.append(key, value);
      }
    });
    resource = url.toString();
    delete options.body;
  }

  if (typeof options.body === 'object' && !(options.body instanceof FormData)) {
    options.body = JSON.stringify(options.body);
  }

  const result = {
    code: null,
    status: null,
    message: null,
    data: null,
    error: null,
  };

  let response = {};

  try {
    response = await fetchWithTimeout(resource, options, getApiTimeout(timeout));
    result.code = response.status;
  } catch {
    result.status = 'error';
    result.message = 'Request failed: resource is not reachable or response time was exceeded';
    return result;
  }

  try {
    const responseData = await response.json() || {};
    if (responseData.constructor.name === 'Object') {
      Object.assign(result, responseData);
    }

    result.status = responseData.status || null;
    result.message = responseData.message || null;
    result.data = responseData.data || responseData.payload || responseData || null;
  } catch {
    result.status = 'error';
    result.message = 'Request failed: the response is not valid JSON';
    return result;
  }

  const endTime = performance.now();
  const differenceTime = endTime - startTime;
  const delayTime = getApiDelay(delay);

  if (differenceTime < delayTime) {
    await sleep(delayTime - differenceTime);
  }

  return result;
}

export {
  fetchWithTimeout,
  request,
};

export default request;
