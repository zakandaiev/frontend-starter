async function getUserPosition(opt = {}) {
  const position = {
    error: true,
    errorMessage: null,
    lat: null,
    lng: null,
  };

  if (!navigator || !navigator.geolocation) {
    return position;
  }

  try {
    const { coords } = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
          ...opt,
        },
      );
    });

    if (coords.latitude && coords.longitude) {
      position.error = false;
      position.lat = coords.latitude;
      position.lng = coords.longitude;
    }
  } catch (error) {
    position.error = true;
    position.errorMessage = error;
  }

  return position;
}

function getDistanceBetweenCoords(lat1, lon1, lat2, lon2, unit = 'mi') {
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0;
  }

  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;

  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = (dist * 60) * 1.1515;

  if (unit === 'km') {
    dist *= 1.609344;
  } else if (unit === 'm') {
    dist *= 1609.344;
  }

  return dist;
}

function watchUserPosition(callback, opt = {}) {
  if (!navigator.geolocation || typeof callback !== 'function') {
    return false;
  }

  const updateIntervalMs = opt.updateIntervalMs || 0;
  let lastUpdateTimestamp = 0;

  const watchId = navigator.geolocation.watchPosition(
    (pos) => {
      const nowTimestamp = Date.now();
      if (updateIntervalMs > 0 && nowTimestamp - lastUpdateTimestamp < updateIntervalMs) {
        return false;
      }

      lastUpdateTimestamp = nowTimestamp;

      const { coords } = pos;
      if (coords.latitude && coords.longitude) {
        callback({
          error: false,
          errorMessage: null,
          lat: coords.latitude,
          lng: coords.longitude,
        });
      }
    },
    (err) => {
      callback({
        error: true,
        errorMessage: err,
        lat: null,
        lng: null,
      });
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
      ...opt,
    },
  );

  return watchId;
}

function stopWatchUserPosition(watchId) {
  if (watchId && navigator.geolocation) {
    return navigator.geolocation.clearWatch(watchId);
  }

  return false;
}

export {
  getDistanceBetweenCoords,
  getUserPosition,
  stopWatchUserPosition,
  watchUserPosition,
};

export default getUserPosition;
