const Config = {
  app: {
    /* eslint-disable no-undef */
    name: APP_NAME,
    version: APP_VERSION,
    mode: APP_MODE,
  },
  api: {
    delayMs: 500,
    timeoutMs: 30000,

    backend: 'http://localhost:4173',
    key: APP_API_KEY,
  },
  search: {
    debounceMs: 1000,
  },
};

export default Config;
