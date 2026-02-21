import { processArg } from '#core/app.js';
import { Transform } from 'stream';

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

        const urlFormatted = url === '/' ? '' : `${url.trim().replace(/^\/|\/$/g, '')}`;

        return `${attr}="${baseFormatted}${urlFormatted.length ? `/${urlFormatted}` : ''}"`;
      });

      file.contents = Buffer.from(modifiedHtml);

      callback(null, file);
    },
  });
}

export default htmlTransformBase;
