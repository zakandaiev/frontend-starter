import { processArg } from '#core/app.js';
import { pathDist } from '#core/path.js';
import browserSync from 'browser-sync';

const server = browserSync.create();

function serve(done) {
  server.init({
    // proxy: 'starter.loc',
    // or
    server: {
      baseDir: pathDist,
      serveStaticOptions: {
        extensions: ['html'],
      },
    },
    port: processArg.port || processArg.isBuild ? 3000 : 5173,
    tunnel: processArg.host ? true : false,
    open: false,
    notify: false,
  });
  done();
}

function reload(done) {
  server.reload();
  done();
}

export {
  reload,
  serve,
};

export default server;
