import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import multiInput from 'rollup-plugin-multi-input';
import terser from '@rollup/plugin-terser';
import {
  isProd, isDev, absPath, path, plugin,
} from '../config.js';

function js() {
  const plugins = [
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
    multiInput.default(),
  ];

  if (isProd) {
    plugins.push(
      terser(plugin.terser),
    );
  }

  return rollup({
    input: path.js.src,
    plugins,
  })
    .then((bundle) => bundle.write({
      dir: absPath.dist,
      sourcemap: isDev,
    }));
}

export default js;
