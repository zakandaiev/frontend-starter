import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import multiInput from 'rollup-plugin-multi-input';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import {
  isProd, isDev, absPath, path, plugin, appData,
} from '../config.js';
import 'dotenv/config';

const processEnv = {
  ...appData,
  ...process.env,
};
const processEnvReplace = {
  'process.env': JSON.stringify(processEnv),
};

Object.keys(processEnv).forEach((key) => {
  processEnvReplace[`process.env.${key}`] = JSON.stringify(processEnv[key]);
});

async function js() {
  const plugins = [
    replace({
      ...processEnvReplace,
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
      terser(plugin.terser),
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

  return result;
}

export default js;
