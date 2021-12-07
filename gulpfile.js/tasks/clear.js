const del = require("del");

const clear = () => {
	return del($.path.clear, {force: true});
}

module.exports = clear;