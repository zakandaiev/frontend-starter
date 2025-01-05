import { deleteAsync } from 'del';
import { path } from '../config/path.js';
import { del as delConfig } from '../config/plugin.js';

function del() {
  return deleteAsync(path.del, delConfig);
}

export default del;
