import { toNumber } from '@/js/util/misc';

function randomInt(mi, ma) {
  const min = toNumber(mi);
  const max = toNumber(ma);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloat(mi, ma) {
  const min = toNumber(mi);
  const max = toNumber(ma);
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
