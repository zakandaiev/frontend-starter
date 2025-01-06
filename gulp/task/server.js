import browserSync from 'browser-sync';
import { isDev, isProd } from '../config/app.js';
import { path } from '../config/path.js';

const server = browserSync.create();

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
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
  });
  done();
}

export {
  reload,
  serve,
};

export default server;
