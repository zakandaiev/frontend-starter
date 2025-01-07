import { deleteAsync } from 'del';
import { path } from './path.js';

const delConfig = {
  force: true,
};

function del() {
  return deleteAsync(path.del, delConfig);
}

export default del;
