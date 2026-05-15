import Config from '@/config';
import { isArray, isNumber, isObject } from '@/js/util/misc';
import sleep from '@/js/util/sleep';

function getApiTimeout(timeout) {
  if (isNumber(timeout)) {
    return timeout;
  }
  return Config.api.timeoutMs ?? 15000;
}

function getApiDelay(delay) {
  if (isNumber(delay)) {
    return delay;
  }
  return Config.api.delayMs ?? 500;
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

  if (options.headers.Authorization === undefined && Config.api.key) {
    options.headers.Authorization = Config.api.key;
  }

  if (options.method.toUpperCase() === 'GET' && isObject(options.body)) {
    const url = new URL(resource, window.location.origin);
    Object.entries(options.body).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        return false;
      }
      if (isArray(value) || isObject(value)) {
        url.searchParams.append(key, JSON.stringify(value));
      } else {
        url.searchParams.append(key, value);
      }
    });
    resource = url.toString();
    delete options.body;
  }

  if ((isArray(options.body) || isObject(options.body)) && options.body instanceof FormData !== true) {
    options.body = JSON.stringify(options.body);
  }

  const result = {
    code: null,
    status: null,
    message: null,
    data: null,
    error: null,
  };

  let response;
  let responseJson;
  let responseText;

  try {
    response = await fetchWithTimeout(resource, options, getApiTimeout(timeout));
    result.code = response.status;
  } catch {
    result.status = 'error';
    result.message = 'Request failed: resource is not reachable or response time was exceeded';
    return result;
  }

  try {
    responseText = await response.text();
  } catch (e) {
    result.status = 'error';
    result.message = `Request failed: ${e.message}`;
    return result;
  }

  try {
    responseJson = JSON.parse(responseText);
    Object.assign(result, responseJson);
  } catch {
    result.status = 'error';
    result.message = 'Request failed: the response is not valid JSON';
    result.data = responseText;
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
