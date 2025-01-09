import { Transform } from 'stream';
import { processArg } from './app.js';

function htmlTransformBase() {
  return new Transform({
    objectMode: true,

    transform(file, enc, callback) {
      if (file.isNull() || !file.isBuffer()) {
        return callback(null, file);
      }

      const { base } = processArg;

      if (!base || base === '/' || base.startsWith('.')) {
        return callback(null, file);
      }

      const baseFormatted = `/${base.trim().replace(/^\/|\/$/g, '')}`;

      const html = file.contents.toString(enc);

      const modifiedHtml = html.replace(/(href|src)=["']([^"']+)["']/gi, (match, attr, url) => {
        if (!url || !url.length || url.startsWith('./') || url.startsWith(baseFormatted) || url.startsWith('http') || url.startsWith('www')) {
          return match;
        }

        const modifiedUrl = url.startsWith('/') ? `${baseFormatted}${url}` : `${baseFormatted}/${url}`;

        return `${attr}="${modifiedUrl}"`;
      });

      file.contents = Buffer.from(modifiedHtml);

      callback(null, file);
    },
  });
}

export default htmlTransformBase;
