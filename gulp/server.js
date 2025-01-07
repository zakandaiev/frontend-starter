import browserSync from 'browser-sync';
import { isDev, isProd } from './app.js';
import { pathDist } from './path.js';

const server = browserSync.create();

const serverConfig = {
  // proxy: 'starter.loc',
  // or
  server: {
    baseDir: pathDist,
    serveStaticOptions: {
      extensions: ['html'],
    },
  },
  // tunnel: true,
  port: isProd ? 3000 : 5173,
  open: isDev,
  notify: false,
};

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init(serverConfig);
  done();
}

export {
  reload,
  serve,
};

export default server;
