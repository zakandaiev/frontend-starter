import { isArray, isObject, isValidJsonString } from '@/js/util/misc';

function encodeToBase64(data) {
  if (isArray(data) || isObject(data)) {
    data = JSON.stringify(data);
  }
  return window.btoa(encodeURIComponent(data));
}

function decodeFromBase64(data) {
  data = decodeURIComponent(window.atob(data));

  if (data.charAt(0) === '[' || data.charAt(0) === '{') {
    if (isValidJsonString(data)) {
      data = JSON.parse(data);
    } else if (data.charAt(0) === '[') {
      data = [];
    } else if (data.charAt(0) === '{') {
      data = {};
    }
  }

  return data;
}

export {
  decodeFromBase64,
  encodeToBase64,
};
