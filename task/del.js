import { deleteAsync } from 'del';
import { path, plugin } from '../config.js';

function del() {
  return deleteAsync(path.del, plugin.del);
}

export default del;
