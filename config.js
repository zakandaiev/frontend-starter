import fs from 'node:fs';
import nodePath from 'node:path';
import { argv, cwd } from 'node:process';

const args = argv.slice(2);

const isProd = argv.includes('--prod');
const isDev = !isProd;

const pathSrc = './src';

let pathDist = './dist';
const distIndex = args.indexOf('--dist');
if (distIndex !== -1 && distIndex + 1 < args.length) {
  pathDist = args[distIndex + 1];
}

const packageData = JSON.parse(fs.readFileSync('./package.json'));
const appData = {
  ...packageData,

  NODE_ENV: isProd ? 'prod' : 'dev',
  APP_MODE: isProd ? 'prod' : 'dev',

  APP_NAME: packageData.name,
  APP_NAME_FORMATTED: packageData.name.replace(/[^a-z]+/gi, ' ').replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
  APP_VERSION: packageData.version,
  APP_AUTHOR: packageData.author,
  APP_REPOSITORY: packageData.repository?.url,
  APP_DESCRIPTION: packageData.description,
  APP_KEYWORDS: packageData.keywords,
};

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
    api: 'modern-compiler',
    loadPaths: ['node_modules'],
    silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'],
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

function getTwigGlobals() {
  const data = {
    ...appData,
  };

  const dataFolder = absPath.data;
  const dataFiles = fs.readdirSync(dataFolder).filter((file) => file.endsWith('.json')) || [];

  dataFiles.forEach((file) => {
    const filePath = nodePath.join(dataFolder, file);
    const fileContent = fs.readFileSync(filePath, 'utf8') || '{}';
    const fileData = JSON.parse(fileContent);
    const fileName = file.replace('.json', '').replace(/[\s-]+/g, '_').replace(/[^a-z_]+/g, '').replace(/(_)./g, (s) => s.slice(-1).toUpperCase());

    data[fileName] = fileData;
  });

  return data;
}

export {
  isProd,
  isDev,
  packageData,
  appData,
  absPath,
  path,
  plugin,
  getTwigGlobals,
};
