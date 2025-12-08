import Config from '@/config';
import { request } from '@/js/util/request';

async function dummy(opt = {}) {
  const url = `${Config.api.backend}/dummy`;
  const options = {
    method: 'POST',
    body: {
      ...opt,
    },
  };

  const data = await request(url, options);
  if (data.status !== 'success') {
    return false;
  }

  return data;
}

export default dummy;
