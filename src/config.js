const Config = {
  app: {
    name: process.env.npm_package_name,
    version: process.env.npm_package_version,
    mode: process.env.APP_MODE || process.env.NODE_ENV,
  },
  api: {
    delayMs: 500,
    timeoutMs: 30000,

    backend: 'http://localhost:4173',
  },
  search: {
    debounceMs: 1000,
  },
};

export default Config;
