import { isFunction } from '@/js/util/misc';

function randomInt(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloat(min = 0, max = 100) {
  return Math.random() * (max - min) + min;
}

function randomString(length = 16) {
  if (isFunction(crypto?.getRandomValues)) {
    return [...crypto.getRandomValues(new Uint8Array(length))]
      .map((x) => (x % 36).toString(36))
      .join('');
  }

  let str = '';

  while (str.length < length) {
    str += Math.random().toString(32).replace('0.', '');
  }

  return str.slice(0, length);
}

function randomUUIDv7(returnBytes = false) {
  if (!isFunction(crypto?.getRandomValues)) {
    return false;
  }

  const value = new Uint8Array(16);
  crypto.getRandomValues(value);

  const timestamp = BigInt(Date.now());

  /* eslint-disable no-bitwise */
  value[0] = Number((timestamp >> 40n) & 0xffn);
  value[1] = Number((timestamp >> 32n) & 0xffn);
  value[2] = Number((timestamp >> 24n) & 0xffn);
  value[3] = Number((timestamp >> 16n) & 0xffn);
  value[4] = Number((timestamp >> 8n) & 0xffn);
  value[5] = Number(timestamp & 0xffn);

  value[6] = (value[6] & 0x0f) | 0x70;
  value[8] = (value[8] & 0x3f) | 0x80;

  return returnBytes
    ? value
    : Array.from(value)
      .map((b, i) => (i === 4 || i === 6 || i === 8 || i === 10 ? '-' : '') + b.toString(16).padStart(2, '0'))
      .join('');
}

export {
  randomFloat,
  randomInt,
  randomString,
  randomUUIDv7,
};
