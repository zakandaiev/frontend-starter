/* eslint-disable no-console */

function logApiDebugToConsole(url, options, data) {
  console.log(`[API LOCAL DEBUG] > ${url}`);
  console.log('> options: ', options);
  console.log('> data: ', data);
  return data;
}

export default logApiDebugToConsole;
