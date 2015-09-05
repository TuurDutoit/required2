var Vector = require("../colliders").Vector;


Vector.prototype.reset = function() {
  this.x = 0;
  this.y = 0;

  return this;
}

Vector.prototype.distance2 = function(V) {
  return ((this.x - V.x) * (this.x - V.x) + (this.y - V.y) * (this.y - V.y));
}

Vector.prototype.distance = function(V) {    
  return Math.sqrt(this.distance2(V));
}

module.exports = Vector;