import Config from '@/config';
import { request } from '@/js/util/request';

async function dummy(body = {}, opt = {}) {
  const url = `${Config.api.url}/dummy`;
  const options = {
    method: 'POST',
    body: {
      ...body,
    },
  };

  const result = await request(url, options);

  if (opt.returnResponse === true) {
    return result;
  }

  if (result.status !== 'success') {
    return false;
  }

  return result.data;
}

export default dummy;
