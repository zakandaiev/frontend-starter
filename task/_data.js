import fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';

const absPath = {
  dist: path.resolve(cwd(), './dist'),
  src: path.resolve(cwd(), './src'),
  data: path.resolve(cwd(), './src/data'),
  font: path.resolve(cwd(), './src/font'),
  img: path.resolve(cwd(), './src/img'),
  js: path.resolve(cwd(), './src/js'),
  public: path.resolve(cwd(), './src/public'),
  sass: path.resolve(cwd(), './src/sass'),
  template: path.resolve(cwd(), './src/template'),
  view: path.resolve(cwd(), './src/view'),
};

const packageData = JSON.parse(fs.readFileSync('./package.json'));

function getTwigGlobals() {
  const data = {
    APP_NAME: packageData.name,
    APP_NAME_FORMATTED: packageData.name.replace(/[^a-z]+/gi, ' ').replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
    APP_VERSION: packageData.version,
    APP_AUTHOR: packageData.author,
    APP_REPOSITORY: packageData.repository?.url,
    APP_DESCRIPTION: packageData.description,
    APP_KEYWORDS: packageData.keywords,
  };

  const dataFolder = absPath.data;
  const dataFiles = fs.readdirSync(dataFolder).filter((file) => file.endsWith('.json')) || [];

  dataFiles.forEach((file) => {
    const filePath = path.join(dataFolder, file);
    const fileContent = fs.readFileSync(filePath, 'utf8') || '{}';
    const fileData = JSON.parse(fileContent);
    const fileName = file.replace('.json', '').replace(/[\s-]+/g, '_').replace(/[^a-z_]+/g, '').replace(/(_)./g, (s) => s.slice(-1).toUpperCase());

    data[fileName] = fileData;
  });

  return data;
}

export {
  absPath,
  packageData,
  getTwigGlobals,
};
