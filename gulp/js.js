import { rollup } from 'rollup';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import multiInput from 'rollup-plugin-multi-input';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import { isDev, isProd, replaceData } from './app.js';
import { path, absPath } from './path.js';

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
      sourceMap: isDev,
    }),
    multiInput(),
  ];

  if (isProd) {
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
    sourcemap: isDev,
  });

  done();

  return result;
}

export default js;
