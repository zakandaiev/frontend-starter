import fs from 'node:fs';
import { argv, env } from 'node:process';
import minimist from 'minimist';
import dotenv from 'dotenv';

dotenv.config({ path: ['.env.local', '.env'], override: true });

const processArg = minimist(argv.slice(2));

const isProd = processArg.prod;
const isDev = !isProd;

const packageData = JSON.parse(fs.readFileSync('./package.json'));

const appData = {
  APP_IS_DEV: isDev,
  APP_IS_PROD: isProd,
  APP_MODE: isProd ? 'prod' : 'dev',

  APP_NAME: packageData.name,
  APP_NAME_FORMATTED: packageData.name.replace(/[^a-z]+/gi, ' ').replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),

  APP_VERSION: packageData.version,
  APP_AUTHOR: packageData.author,
  APP_AUTHOR_URL: packageData.authorUrl,
  APP_REPOSITORY: packageData.repository?.url,

  APP_DESCRIPTION: packageData.description,
  APP_KEYWORDS: packageData.keywords,
};

const envData = {};
Object.keys(env).forEach((key) => {
  if (key.startsWith('APP_')) {
    envData[key] = env[key];
  }
});

const replaceData = {
  ...Object.fromEntries(Object.entries(appData).map(([k, v]) => [k, JSON.stringify(v)])),
  ...Object.fromEntries(Object.entries(envData).map(([k, v]) => [k, JSON.stringify(v)])),
};

export {
  processArg,
  isDev,
  isProd,
  packageData,
  appData,
  envData,
  replaceData,
};
