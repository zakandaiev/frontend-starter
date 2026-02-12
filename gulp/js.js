import alias from '@rollup/plugin-alias'; // eslint-disable-line
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import { rollup } from 'rollup';
import multiInput from 'rollup-plugin-multi-input';
import { appData, processArg } from './app.js';
import { absPath, path } from './path.js';

const replaceData = Object.fromEntries(Object.entries(appData).map(([k, v]) => [k, JSON.stringify(v)]));

const terserConfig = {
  mangle: true,
  keep_classnames: true,
  keep_fnames: false,
  ie8: false,
};

async function js(done) {
  const plugins = [
    replace(replaceData),
    nodeResolve(),
    alias({
      entries: [
        { find: '@', replacement: absPath.src },
      ],
    }),
    commonjs({
      requireReturnsDefault: true,
      sourceMap: !processArg.build,
    }),
    multiInput(),
  ];

  if (processArg.build) {
    plugins.push(
      terser(terserConfig),
    );
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
