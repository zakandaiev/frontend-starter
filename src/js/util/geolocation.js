async function getUserPosition() {
  const position = {};

  if (!navigator || !navigator.geolocation) {
    return position;
  }

  try {
    const { coords } = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 });
    });

    if (coords.latitude && coords.longitude) {
      position.lat = coords.latitude;
      position.lng = coords.longitude;
    }
  } catch (error) {
    position.error = error;
  }

  return position;
}

export default getUserPosition;
