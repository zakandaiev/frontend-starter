function isArray(value) {
  return (!!value) && (value.constructor === Array);
}

function isObject(value) {
  return (!!value) && (value.constructor === Object);
}

function isBoolean(value) {
  return value === true || value === false ? true : false;
}

function isFunction(value) {
  return typeof value === 'function';
}

function isNumber(value) {
  return typeof value === 'number' && !Number.isNaN(value);
}

function isNumeric(value) {
  return /^-?\d+(\.\d+)?$/.test(value);
}

function isNumberInRange(number, min, max) {
  return number >= min && number < max;
}

function isString(value) {
  return typeof value === 'string';
}

function isStringBoolean(value) {
  if (!isString(value)) {
    return false;
  }
  return value === 'true' || value === 'false' ? true : false;
}

function isStringValidJson(value) {
  if (!isString(value)) {
    return false;
  }

  try {
    const parsed = JSON.parse(value);
    return isArray(parsed) || isObject(parsed);
  } catch {
    return false;
  }
}

function toNumber(value) {
  if (isNumber(value)) {
    return value;
  }

  if (!isString(value)) {
    return null;
  }

  const number = parseFloat(value.trim());
  return Number.isNaN(number) ? null : number;
}

function toString(value) {
  if (isString(value)) {
    return value;
  }

  if (isArray(value) || isObject(value)) {
    return JSON.stringify(value);
  }

  return String(value);
}

export {
  isArray,
  isBoolean,
  isFunction,
  isNumber,
  isNumberInRange,
  isNumeric,
  isObject,
  isString,
  isStringBoolean,
  isStringValidJson,
  toNumber,
  toString,
};
