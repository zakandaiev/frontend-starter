import Config from '@/config';
import { request } from '@/js/util/request';

async function dummy(body = {}, opt = {}) {
  const url = `${Config.api.backend}/dummy`;
  const options = {
    method: 'POST',
    body: {
      ...body,
    },
  };

  const result = await request(url, options);
  if (result.status !== 'success') {
    return false;
  }

  return opt.returnResponse === true
    ? result
    : result.data;
}

export default dummy;
