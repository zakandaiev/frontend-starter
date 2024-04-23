import browserSync from 'browser-sync';
import { path, isProd, isDev } from '../config.js';

function server(options = {}) {
  return browserSync.init({
    // proxy: 'starter.loc',
    // or
    server: {
      baseDir: path.dist,
      serveStaticOptions: {
        extensions: ['html'],
      },
    },
    // tunnel: true,
    port: isProd ? 3000 : 5173,
    open: isDev,
    notify: false,
    ...options,
  });
}

export default server;
