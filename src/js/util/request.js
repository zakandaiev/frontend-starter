import Config from '@/config';
import sleep from '@/js/util/sleep';

function getApiTimeout(timeout) {
  return timeout || Config.api.timeoutMs || 15000;
}

function getApiDelay(delay) {
  return delay || Config.api.delayMs || 1000;
}

async function fetchWithTimeout(resource, options = {}, timeout = null) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), getApiTimeout(timeout));

  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } catch (error) {
    return { error };
  } finally {
    clearTimeout(id);
  }
}

async function request(resource, opt = {}, timeout = null, delay = null) {
  const startTime = performance.now();

  const options = {
    ...opt,
    headers: opt.headers || { 'Content-Type': 'application/json' },
    method: opt.method || 'GET',
  };

  if (Config.api.key && Config.api.key.length && options.headers.Authorization === undefined) {
    options.headers.Authorization = Config.api.key;
  }

  if (options.method.toUpperCase() === 'GET' && typeof options.body === 'object') {
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

  const response = await fetchWithTimeout(resource, options, getApiTimeout(timeout));

  if (response?.error) {
    const err = response.error;
    result.code = 0;
    result.status = 'error';
    result.message = err.name === 'AbortError'
      ? `Request to ${resource} timed out`
      : err.message || 'Network error';
    result.error = err;
  } else {
    result.code = response.status;
    try {
      const responseData = await response.json();
      if (responseData && typeof responseData === 'object') {
        result.status = responseData.status || null;
        result.message = responseData.message || null;
        result.data = responseData.data || responseData.payload || responseData || null;
      }
    } catch (parseError) {
      result.status = 'error';
      result.message = 'Failed to parse JSON';
      result.error = parseError;
    }
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
