function isArray(a) {
  return (!!a) && (a.constructor === Array);
}

function isObject(o) {
  return (!!o) && (o.constructor === Object);
}

function isStringValidJSON(s) {
  if (
    /^[\],:{}\s]*$/.test(
      // eslint-disable-next-line
      s.replace(/\\["\\\/bfnrtu]/g, '@')
      // eslint-disable-next-line
        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''),
    )
  ) {
    return true;
  }

  return false;
}

export {
  isArray,
  isObject,
  isStringValidJSON,
};
