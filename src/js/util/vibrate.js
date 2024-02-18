function getVibrate(type) {
  switch (type) {
    case 'success': {
      return [40];
    }
    case 'warning': {
      return [40, 20, 40];
    }
    case 'error': {
      return [20, 20, 20, 20, 20];
    }
    default: {
      return [20];
    }
  }
}

function vibrate(type = null) {
  const isSupports = window.navigator && window.navigator.vibrate ? true : false;

  if (!isSupports) {
    return false;
  }

  const signal = typeof type === 'string' ? getVibrate(type) : type;

  window.navigator.vibrate(signal);

  return true;
}

export {
  getVibrate,
  vibrate,
};
