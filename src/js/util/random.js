function randomInt(mi, ma) {
  const min = parseInt(mi, 10);
  const max = parseInt(ma, 10);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloat(mi, ma) {
  const min = parseFloat(mi);
  const max = parseFloat(ma);

  return Math.random() * (max - min) + min;
}

function randomString() {
  return Math.random().toString(32).replace('0.', '');
}

export {
  randomFloat,
  randomInt,
  randomString,
};
