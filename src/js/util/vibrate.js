import { isString } from '@/js/util/misc';

function getVibrate(type) {
  if (type === 'success') {
    return [40];
  }

  if (type === 'warning') {
    return [40, 20, 40];
  }

  if (type === 'error') {
    return [20, 20, 20, 20, 20];
  }

  return [20];
}

function vibrate(type = null) {
  const isSupports = window.navigator && window.navigator.vibrate ? true : false;

  if (!isSupports) {
    return false;
  }

  const signal = isString(type) ? getVibrate(type) : type;

  window.navigator.vibrate(signal);

  return true;
}

export {
  getVibrate,
  vibrate,
};
