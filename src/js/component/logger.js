import Config from '@/config';
import { request } from '@/js/util/request';
import route from '@/js/util/route';

async function logError(error, customBody = {}) {
  if (Config.app.mode !== 'prod') {
    return false;
  }

  if (error && !error?.stack?.includes(window.location.hostname)) {
    return false;
  }

  const url = `${Config.api.backend}/logError`;
  const options = {
    method: 'POST',
    body: {
      app: Config.app,
      client: getClientInfo(),
      error,
      url: route.urlFull,
      ...customBody,
    },
  };
  const data = await request(url, options);

  return data;
}

function getClientInfo() {
  return {
    userAgent: window.navigator.userAgent,
    language: window.navigator.language,
    hardwareConcurrency: window.navigator.hardwareConcurrency,
    deviceMemory: window.navigator.deviceMemory,
    webdriver: window.navigator.webdriver,
    maxTouchPoints: window.navigator.maxTouchPoints,
    onLine: window.navigator.onLine,
    screen: {
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
      width: window.screen.width,
      height: window.screen.height,
      dpi: window.devicePixelRatio,
      orientation: window.screen?.orientation?.type,
    },
    window: {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    },
    deviceType: (() => {
      const { userAgent } = window.navigator;
      if (/ip(hone|od)|android.+mobile|blackberry|iemobile/i.test(userAgent)) return 'mobile';
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(userAgent)) return 'tablet';
      return 'desktop';
    })(),
  };
}

window.onerror = async (message, source, line, col, error) => logError({
  message,
  source,
  line,
  col,
  stack: error?.stack || null,
});
