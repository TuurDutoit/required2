var renderer = require("../renderer");
var Vector

var imageObject = function(object, current, position, dimensions, angle) {
  this.object = object;
  this.current = current || "standard";
  this.position = position || new Vector();
  this.dimensions = dimensions || new Vector(1,1);
  this.angle = angle || 0;
  
  return this;
}

imageObject.prototype.type = "imageObject";

imageObject.prototype.draw = function(position, dimensions, angle) {
  this.object[this.current].draw(position.clone().add(this.position), dimensions.clone().multiply(this.dimensions), angle + this.angle);
  
  return this;
}

imageObject.prototype.load = function(){
  
  return this;
}

imageObject.prototype.changeCurrent = function(current) {
  this.current = current;
  if(this.object[this.current].type == "animation") {
    this.object[this.current].reset();
  }
  
  return this;
}



module.exports = imageObject;