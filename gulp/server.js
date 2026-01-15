import browserSync from 'browser-sync';
import { isProd, processArg } from './app.js';
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
  port: processArg.port || isProd ? 3000 : 5173,
  tunnel: processArg.host ? true : false,
  open: false,
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
