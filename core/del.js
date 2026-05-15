import { path } from '#core/path.js';
import { rm } from 'node:fs/promises';

function del() {
  return rm(path.del, {
    force: true,
    recursive: true,
  });
}

export default del;
