import gulp from 'gulp';
import gulpif from 'gulp-if';
import twigInstance from 'gulp-twig';
import fs from 'node:fs';
import nodePath from 'node:path';
import { appData, envData, isProd } from './app.js';
import { absPath, pathSrc, path } from './path.js';
import htmlmin from './htmlmin.js';
import versionNumber from './version-number.js';

const twigConfig = {
  base: pathSrc,
  data: getTwigGlobals(),
};

function twig() {
  return gulp.src(path.twig.src, { encoding: false })
    .pipe(twigInstance(twigConfig))
    .pipe(
      gulpif(
        isProd,
        versionNumber,
      ),
    )
    .pipe(
      gulpif(
        isProd,
        htmlmin,
      ),
    )
    .pipe(gulp.dest(path.twig.dist));
}

function getTwigGlobals() {
  const data = {
    ...appData,
    ...envData,
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

export default twig;
