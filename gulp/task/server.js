import browserSync from 'browser-sync';
import { isDev, isProd } from '../config/app.js';
import { path } from '../config/path.js';

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
