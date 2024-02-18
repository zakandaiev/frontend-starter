import { isArray, isObject, isStringValidJSON } from '@/js/util/is-object';

function encode(data) {
  if (isArray(data) || isObject(data)) {
    data = JSON.stringify(data);
  }

  return window.btoa(encodeURIComponent(data));
}

function decode(data) {
  data = decodeURIComponent(window.atob(data));

  if (data.charAt(0) === '[' || data.charAt(0) === '{') {
    if (isStringValidJSON(data)) {
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
  encode,
  decode,
};
