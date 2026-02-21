import { appData, processArg } from '#core/app.js'; // eslint-disable-line
import { absPath, path } from '#core/path.js';
import alias from '@rollup/plugin-alias'; // eslint-disable-line
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import url from '@rollup/plugin-url';
import { rollup } from 'rollup';
import multiInput from 'rollup-plugin-multi-input';

const replaceData = Object.fromEntries(Object.entries(appData).map(([k, v]) => [k, JSON.stringify(v)]));

const terserConfig = {
  mangle: true,
  keep_classnames: true,
  keep_fnames: false,
  ie8: false,
};

async function js(done) {
  const plugins = [
    replace({
      ...replaceData,
      preventAssignment: true,
    }),
    alias({
      entries: [
        { find: '@', replacement: absPath.src },
      ],
    }),
    nodeResolve(),
    url({
      limit: 0,
      fileName: '[dirname][name][extname]',
      sourceDir: absPath.src,
    }),
    commonjs({
      requireReturnsDefault: true,
      sourceMap: !processArg.build,
    }),
    multiInput(),
  ];

  if (processArg.build) {
    plugins.push(terser(terserConfig));
  }

  const bundle = await rollup({
    input: path.js.src,
    plugins,
  });

  const result = await bundle.write({
    dir: absPath.dist,
    sourcemap: !processArg.build,
  });

  done();

  return result;
}

export default js;
