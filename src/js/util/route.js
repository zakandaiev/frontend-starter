const route = {
  get base() {
    return `${this.protocol}://${this.host}`;
  },

  get hash() {
    return window.location.hash.replace('#', '');
  },

  get host() {
    return window.location.host;
  },

  get hostname() {
    return window.location.hostname;
  },

  get origin() {
    return window.location.origin;
  },

  get port() {
    return window.location.port;
  },

  get protocol() {
    return window.location.protocol.replace(':', '');
  },

  get query() {
    return Object.fromEntries(new URLSearchParams(window.location.search));
  },

  get queryString() {
    return window.location.search.replace('?', '');
  },

  get uri() {
    return window.location.pathname;
  },

  get uriFull() {
    const { search } = window.location;
    return search
      ? `${this.uri}${search}`
      : this.uri;
  },

  get url() {
    return `${this.base}${this.uri}`;
  },

  get urlFull() {
    return window.location.href;
  },
};

export default route;
