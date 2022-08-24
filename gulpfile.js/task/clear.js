const del = require('del');

const clear = () => {
	return del($.path.clear, $.setting.clear);
}

module.exports = clear;
