/* eslint-disable no-console */
import { processArg } from '#core/app.js';
import { SourceMapConsumer } from 'source-map';

const MAP_FILE_URL = processArg.file;
if (!MAP_FILE_URL) {
  console.log('⚠️  missed --file argument');
  process.exit(0);
}

const LINECOL_STRING = processArg.linecol;
if (!LINECOL_STRING) {
  console.log('⚠️  missed --linecol argument');
  process.exit(0);
}

const [DEBUG_LINE, DEBUG_COLUMN] = LINECOL_STRING.toString().split(':');
if (!DEBUG_LINE || !DEBUG_COLUMN) {
  console.log('⚠️  invalid --linecol argument (format is line:col)');
  process.exit(0);
}

const fetchResult = await fetch(MAP_FILE_URL);
const fetchResultText = await fetchResult.text();

const fileText = fetchResultText?.toString()?.trim() || '';
if (!fileText.startsWith('{') && !fileText.endsWith('}')) {
  console.log('⚠️  the file is not valid JSON');
  process.exit(0);
}

try {
  SourceMapConsumer.with(fileText, null, (consumer) => {
    const position = consumer.originalPositionFor({
      line: parseFloat(DEBUG_LINE),
      column: parseFloat(DEBUG_COLUMN),
    });
    console.log('✅ Result:\n', position);
  });
} catch (error) {
  console.log(`❌ ${error.message}`);
}
