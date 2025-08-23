import Config from '@/config';
import { request } from '@/js/util/request';

async function dummy(opt = {}) {
  if (!opt.dummy) {
    return false;
  }

  const url = `${Config.api.backend}/dummy`;
  const options = {
    method: 'POST',
    body: {
      dummy: opt.dummy,
    },
    ...opt,
  };

  const data = await request(url, options);
  return data;
}

export default dummy;
