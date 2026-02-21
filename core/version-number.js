import { packageData } from '#core/app.js';
import versionNumberInstance from 'gulp-version-number';

const versionNumberConfig = {
  value: packageData.version || '%MDS%',
  append: {
    key: 'v',
    to: 'all',
  },
};

const versionNumber = () => versionNumberInstance(versionNumberConfig);

export default versionNumber;
