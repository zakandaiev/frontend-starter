import Config from '@/config';
import { request } from '@/js/util/request';
import { urlFull } from '@/js/util/route';

async function logError(error) {
  if (Config.app.mode !== 'prod') {
    return false;
  }

  const url = `${Config.api.backend}/logError`;

  const options = {
    method: 'POST',
    body: {
      app: { ...Config.app },
      url: urlFull,
      error,
    },
  };

  const data = await request(url, options);

  return data;
}

window.onerror = async (message, source, line, col, error) => logError({
  message,
  source,
  line,
  col,
  stack: error?.stack || null,
});
