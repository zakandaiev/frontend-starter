import { argv } from 'node:process';
import { packageData, getTwigGlobals } from './task/_data.js';

const args = argv.slice(2);

const isProd = argv.includes('--prod');
const isDev = !isProd;

const pathSrc = './src';

let pathDist = './dist';
const distIndex = args.indexOf('--dist');
if (distIndex !== -1 && distIndex + 1 < args.length) {
  pathDist = args[distIndex + 1];
}

const path = {
  src: pathSrc,
  dist: pathDist,

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

const plugin = {
  // DEL
  del: {
    force: true,
  },

  // HTML
  twig: {
    base: './src',
    data: getTwigGlobals(),
  },
  htmlmin: {
    collapseWhitespace: true,
    includeAutoGeneratedTags: false,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
  },
  versionNumber: {
    value: packageData.version || '%MDS%',
    append: {
      key: 'v',
      to: 'all',
    },
  },

  // IMAGE
  imagemin: {
    gifsicle: {
      optimizationLevel: 1,
      interlaced: false,
    },
    optipng: {
      optimizationLevel: 5,
    },
    mozjpeg: {
      quality: 75, progressive: true,
    },
    pngquant: {
      quality: [0.7, 0.9],
      speed: 7,
    },
    svgo: {
      plugins: [
        {
          name: 'removeViewBox',
          active: false,
        },
        {
          name: 'convertShapeToPath',
          active: false,
        },
        {
          name: 'convertEllipseToCircle',
          active: false,
        },
      ],
    },
  },

  // CSS
  sass: {
    includePaths: ['node_modules'],
  },
  autoprefixer: {
    cascade: !isProd,
    grid: false,
  },
  cssnano: {
    preset: [
      'default',
      {
        discardComments: {
          removeAll: true,
        },
      },
    ],
  },

  // JS
  terser: {
    mangle: true,
    keep_classnames: true,
    keep_fnames: false,
    ie8: false,
  },
};

export {
  isProd,
  isDev,
  path,
  plugin,
};
