import { path } from '#core/path.js';
import { deleteAsync } from 'del';

const delConfig = {
  force: true,
};

function del() {
  return deleteAsync(path.del, delConfig);
}

export default del;
