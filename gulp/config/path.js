import nodePath from 'node:path';
import { argv, cwd } from 'node:process';

const args = argv.slice(2);

const pathSrc = './src';

let pathDist = './dist';
const distIndex = args.indexOf('--dist');
if (distIndex !== -1 && distIndex + 1 < args.length) {
  pathDist = args[distIndex + 1];
}

const absPath = {
  dist: nodePath.resolve(cwd(), pathDist),
  src: nodePath.resolve(cwd(), pathSrc),
  data: nodePath.resolve(cwd(), `${pathSrc}/data`),
  font: nodePath.resolve(cwd(), `${pathSrc}/font`),
  img: nodePath.resolve(cwd(), `${pathSrc}/img`),
  js: nodePath.resolve(cwd(), `${pathSrc}/js`),
  public: nodePath.resolve(cwd(), `${pathSrc}/public`),
  sass: nodePath.resolve(cwd(), `${pathSrc}/sass`),
  template: nodePath.resolve(cwd(), `${pathSrc}/template`),
  view: nodePath.resolve(cwd(), `${pathSrc}/view`),
};

const path = {
  dist: pathDist,
  src: pathSrc,

  del: pathDist,

  font: {
    src: `${pathSrc}/font/**/*.{woff2,woff,svg,ttf,eot}`,
    watch: `${pathSrc}/font/**/*.{woff2,woff,svg,ttf,eot}`,
    dist: `${pathDist}/font`,
  },

  img: {
    src: `${pathSrc}/img/**/*.*`,
    watch: `${pathSrc}/img/**/*.*`,
    dist: `${pathDist}/img`,
  },

  js: {
    src: `${pathSrc}/js/*.js`,
    watch: `${pathSrc}/js/**/*.js`,
    dist: `${pathDist}/js`,
  },

  public: {
    src: `${pathSrc}/public/**/*.*`,
    watch: `${pathSrc}/public/**/*.*`,
    dist: pathDist,
  },

  sass: {
    src: `${pathSrc}/sass/*.{sass,scss}`,
    watch: `${pathSrc}/sass/**/*.{sass,scss}`,
    dist: `${pathDist}/css`,
  },

  twig: {
    src: `${pathSrc}/view/*.twig`,
    watch: [`${pathSrc}/view/**/*.twig`, `${pathSrc}/template/**/*.twig`],
    dist: pathDist,
  },
};

export {
  pathSrc,
  // pathDist,
  absPath,
  path,
};
