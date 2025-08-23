import nodePath from 'node:path';
import { cwd } from 'node:process';
import { processArg } from './app.js';

const pathDist = processArg.dist || './dist';
const pathSrc = './src';

const absPath = {
  root: nodePath.resolve(cwd()),
  node: nodePath.resolve(cwd(), 'node_modules'),
  dist: nodePath.resolve(cwd(), pathDist),
  src: nodePath.resolve(cwd(), pathSrc),
  component: nodePath.resolve(cwd(), `${pathSrc}/component`),
  data: nodePath.resolve(cwd(), `${pathSrc}/data`),
  font: nodePath.resolve(cwd(), `${pathSrc}/font`),
  img: nodePath.resolve(cwd(), `${pathSrc}/img`),
  js: nodePath.resolve(cwd(), `${pathSrc}/js`),
  layout: nodePath.resolve(cwd(), `${pathSrc}/layout`),
  public: nodePath.resolve(cwd(), `${pathSrc}/public`),
  sass: nodePath.resolve(cwd(), `${pathSrc}/sass`),
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
    watch: [
      `${pathSrc}/component/**/*.twig`,
      `${pathSrc}/layout/**/*.twig`,
      `${pathSrc}/view/**/*.twig`,
    ],
    dist: pathDist,
  },
};

export {
  pathDist,
  pathSrc,
  absPath,
  path,
};
