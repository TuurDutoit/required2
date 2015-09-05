var Vector = require("../vector");



var GameObject = function(position, dimensions, angle, rotationCenter) {
  this.position = position || new Vector();
  this.absolutePosition = 
  this.dimensions = dimensions|| new Vector();
  this.angle = angle || 0;
  this.rotationCenter = rotationCenter || new Vector();
  this.children = [];
  this.parent = null;
  
  return this;
}

GameObject.prototype.absolutePosition = function() {
  return this.parent.absolutePosition().clone().add(this.position);
}

GameObject.prototype



module.exports = GameObject;