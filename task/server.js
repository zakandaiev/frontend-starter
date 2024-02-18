import browserSync from 'browser-sync';
import { path } from '../config.js';

function server() {
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
    port: 3000,
    notify: false,
    open: true,
  });
}

export default server;
