import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import multiInput from 'rollup-plugin-multi-input';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import {
  isDev, isProd, appData, envData,
} from '../config/app.js';
import { path, absPath } from '../config/path.js';
import { terser as terserConfig } from '../config/plugin.js';

const appDataReplace = Object.fromEntries(Object.entries(appData).map(([k, v]) => [k, JSON.stringify(v)]));
const envDataReplace = Object.fromEntries(Object.entries(envData).map(([k, v]) => [k, JSON.stringify(v)]));

async function js(done) {
  const plugins = [
    replace({
      ...appDataReplace,
      ...envDataReplace,
    }),
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
