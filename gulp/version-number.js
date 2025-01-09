import versionNumberInstance from 'gulp-version-number';
import { packageData } from './app.js';

const versionNumberConfig = {
  value: packageData.version || '%MDS%',
  append: {
    key: 'v',
    to: 'all',
  },
};

const versionNumber = () => versionNumberInstance(versionNumberConfig);

export default versionNumber;
