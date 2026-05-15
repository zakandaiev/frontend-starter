import { packageData } from '#core/app.js';
import versionNumberInstance from 'gulp-version-number';

function versionNumber() {
  return versionNumberInstance({
    value: packageData.version || '%MDS%',
    append: {
      key: 'v',
      to: 'all',
    },
  });
}

export default versionNumber;
