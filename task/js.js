import { rollup } from 'rollup';
import multiInput from 'rollup-plugin-multi-input';
import alias from '@rollup/plugin-alias';
import terser from '@rollup/plugin-terser';
import {
  isProd, isDev, path, plugin,
} from '../config.js';
import { absPath } from './_data.js';

function js() {
  const plugins = [
    multiInput.default(),
    alias({
      entries: [
        { find: '@', replacement: absPath.src },
      ],
    }),
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
