var Vector = require("../colliders").Vector;
Vector.prototype.reset = function(){
	this.x = 0;
	this.y = 0;

	return this;
}
Vector.prototype.distanceToCubed = function(V){
    return ((this.x - V.x) * (this.x - V.x) + (this.y - V.y) * (this.y - V.y));
}
Vector.prototype.distanceTo = function(V){    
    return Math.sqrt(this.distanceToCubed(V));
}

module.exports = Vector;