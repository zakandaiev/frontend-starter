import { appData, processArg } from '#core/app.js';
import { absPath, path } from '#core/path.js';
import url from '@rollup/plugin-url';
import glob from 'fast-glob';
import { build } from 'rolldown';

async function js() {
  return build({
    input: await glob(path.js.src),
    plugins: url({
      limit: 0,
      fileName: '[dirname][name][extname]',
      sourceDir: absPath.src,
    }),
    resolve: {
      alias: {
        '@': absPath.src,
      },
    },
    transform: {
      define: Object.fromEntries(Object.entries(appData).map(([k, v]) => [k, JSON.stringify(v)])),
    },
    output: {
      dir: absPath.dist,
      entryFileNames: 'js/[name].js',
      chunkFileNames: 'js/[name]-[hash].js',
      minify: processArg.isBuild,
      sourcemap: !processArg.isBuild,
    },
  });
}

export default js;
