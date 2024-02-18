import { isArray, isObject, isStringValidJSON } from '@/js/util/is-object';

function setStorage(key, data, type = 'session') {
  if (isArray(data) || isObject(data)) {
    data = JSON.stringify(data);
  }

  if (type === 'session') {
    sessionStorage.setItem(key, data);
  } else {
    localStorage.setItem(key, data);
  }

  return true;
}

function getStorage(key, type = 'session') {
  let data = (type === 'session') ? sessionStorage.getItem(key) : localStorage.getItem(key);

  if (data && (data.charAt(0) === '[' || data.charAt(0) === '{')) {
    if (isStringValidJSON(data)) {
      data = JSON.parse(data);
    } else if (data.charAt(0) === '[') {
      data = [];
      flushStorage(key);
    } else if (data.charAt(0) === '{') {
      data = {};
      flushStorage(key);
    }
  }

  return data;
}

function flushStorage(key, type = 'session') {
  if (type === 'session') {
    sessionStorage.removeItem(key);
  } else {
    localStorage.removeItem(key);
  }

  return true;
}

export {
  setStorage,
  getStorage,
  flushStorage,
};
