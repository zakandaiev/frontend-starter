import Config from '@/config';
import logApiDebugToConsole from '@/js/util/log-api-debug-to-console';
import { randomString, randomUUIDv7 } from '@/js/util/random';
import { request } from '@/js/util/request';

async function dummy(body = {}, opt = {}) {
  const url = `${Config.api.url}/dummy`;
  const options = {
    method: 'POST',
    body: {
      ...body,
    },
  };

  if (Config.api.isHardcodeForLocalDebug) {
    return logApiDebugToConsole(url, options, getLocalApiAnswerExample(opt));
  }

  const result = await request(url, options);

  if (opt.returnResponse === true) {
    return result;
  }

  if (result.status !== 'success') {
    return false;
  }

  return result.data;
}

function getLocalApiAnswerExample(opt = {}) {
  const data = [
    {
      id: randomUUIDv7(),
      name: randomString(),
    },
  ];

  if (opt.returnResponse === true) {
    return {
      status: 'success',
      data,
    };
  }

  return data;
}

export default dummy;
