import fs from 'node:fs';
import { argv } from 'node:process';

const isProd = argv.includes('--prod');
const isDev = !isProd;

const packageData = JSON.parse(fs.readFileSync('./package.json'));

const appData = {
  ...packageData,

  isDev,
  isProd,

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

export {
  isDev,
  isProd,
  packageData,
  appData,
};
