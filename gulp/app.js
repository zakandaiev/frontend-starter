import dotenv from 'dotenv';
import minimist from 'minimist';
import fs from 'node:fs';
import { argv, env } from 'node:process';

const packageData = JSON.parse(fs.readFileSync('./package.json'));
const processArg = minimist(argv.slice(2));
const appData = {
  APP_MODE: 'dev',

  APP_NAME: packageData.name,
  APP_NAME_FORMATTED: packageData.name
    .replace(/[^a-z]+/gi, ' ')
    .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),

  APP_VERSION: packageData.version,
  APP_AUTHOR: packageData.author,
  APP_AUTHOR_URL: packageData.authorUrl,
  APP_REPOSITORY: packageData.repository?.url,

  APP_DESCRIPTION: packageData.description,
  APP_KEYWORDS: packageData.keywords,
};

dotenv.config({
  path: ['.env', '.env.local'],
  override: true,
  quiet: true,
});

Object.keys(env).forEach((key) => {
  if (key.startsWith('APP_')) {
    appData[key] = env[key];
  }
});

export {
  appData,
  packageData,
  processArg,
};
