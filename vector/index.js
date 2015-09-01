var V = require("../colliders").Vector;
V.prototype.reset = function(){
	this.x = 0;
	this.y = 0;

	return this;
}
module.exports = V;