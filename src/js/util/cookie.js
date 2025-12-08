import { isArray, isObject, isStringValidJSON } from '@/js/util/is-object';

function setCookie(key, data, days = 3, path = '/') {
  if (isArray(data) || isObject(data)) {
    data = JSON.stringify(data);
  }

  const dateNow = new Date();
  dateNow.setTime(dateNow.getTime() + (days * 24 * 60 * 60 * 1000));

  document.cookie = `${key}=${data}; expires=${dateNow.toUTCString()}; path=${path}`;
}

function getCookie(key) {
  const cookieName = `${key}=`;
  const cookieArray = document.cookie.split(';');

  for (let i = 0; i < cookieArray.length; i += 1) {
    let c = cookieArray[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(cookieName) === 0) return formatCookie(key, c.substring(cookieName.length, c.length));
  }

  return null;
}

function formatCookie(key, data) {
  if (data && (data.charAt(0) === '[' || data.charAt(0) === '{')) {
    if (isStringValidJSON(data)) {
      data = JSON.parse(data);
    } else if (data.charAt(0) === '[') {
      data = [];
      flushCookie(key);
    } else if (data.charAt(0) === '{') {
      data = {};
      flushCookie(key);
    }
  }

  return data;
}

function flushCookie(key) {
  document.cookie = `${key}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {
  flushCookie,
  getCookie,
  setCookie,
};
