const del = require('del');

const clear = () => del($.path.clear, $.setting.clear);

module.exports = clear;
