import { toNumber } from '@/js/util/misc';

/* eslint-disable no-undef */
const Config = {
  app: {
    name: APP_NAME,
    version: APP_VERSION,
    mode: APP_MODE,
  },
  appMeta: {
    // REMOVE SENSITIVE DATA IF YOU DONT USE IT
    mode: APP_MODE,
    name: APP_NAME,
    nameFormatted: APP_NAME_FORMATTED,
    version: APP_VERSION,
    author: APP_AUTHOR,
    authorUrl: APP_AUTHOR_URL,
    repository: APP_REPOSITORY,
    description: APP_DESCRIPTION,
    keywords: APP_KEYWORDS,
  },
  api: {
    url: APP_API_URL,
    key: APP_API_KEY,
    delayMs: toNumber(APP_API_DELAY_MS) ?? 500,
    timeoutMs: toNumber(APP_API_TIMEOUT_MS) ?? 15000,
  },
  search: {
    debounceMs: 1000,
  },
};

export default Config;
