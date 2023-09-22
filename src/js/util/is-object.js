function isArray(a) {
  return (!!a) && (a.constructor === Array);
}

function isObject(o) {
  return (!!o) && (o.constructor === Object);
}

function isStringValidJSON(s) {
  if (
    /^[\],:{}\s]*$/.test(
      s.replace(/\\["\\\/bfnrtu]/g, '@')
        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
        .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
    )
  ) {
    return true;
  }

  return false;
}
