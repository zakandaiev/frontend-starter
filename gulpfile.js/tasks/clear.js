const del = require("del");

const clear = () => {
	return del($.path.clear);
}

module.exports = clear;