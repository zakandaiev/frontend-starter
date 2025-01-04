const { host } = window.location;
const protocol = window.location.protocol.replace(':', '');
const uri = window.location.pathname;
const [url, queryString] = window.location.href.split('?');

const uriFull = `${uri}?${queryString}`;
const urlFull = `${url}?${queryString}`;

const base = `${protocol}://${host}`;

const query = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const route = {
  host,
  protocol,
  uri,
  url,
  uriFull,
  urlFull,
  base,
  query,
  queryString,
};

export {
  host,
  uri,
  url,
  uriFull,
  urlFull,
  base,
  query,
  queryString,

  route,
};

export default route;
