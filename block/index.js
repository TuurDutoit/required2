var renderer = require("../renderer");
var Vector = require("../vector");

var Block = function(name, id, texture, offset, dimensions, angle) {
  this.texture = texture;
  this.id = id;
  this.offset = offset || new Vector();
  this.dimensions = dimensions || new Vector();
  this.angle = angle || 0;

  return this;
}

Block.prototype.update = function() {
  
}

Block.prototype.draw = function(camera, position, angle) {
  camera.drawOnScreen(this.texture, position.add(this.offset), this.dimensions, this.angle + angle);
  
  return this;
}



module.exports = Block;