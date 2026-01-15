import Config from '@/config';
import { request } from '@/js/util/request';

async function getSearchResultByText(body = {}, opt = {}) {
  const url = `${Config.api.backend}/getSearchResultByText`;
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

export default getSearchResultByText;
