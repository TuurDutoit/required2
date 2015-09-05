var renderer = require("../renderer");


var imageObject = function(object, current) {
  this.type = "imageObject";
  this.object = object;
  this.current = current || "standard";
  
  return this;
}

imageObject.prototype.update = function() {
  
}

imageObject.prototype.draw = function(position, dimensions, rotation) {
  this.object[this.current].draw(position, dimension, rotation);
}

imageObject.prototype.load = function(){
  
}

imageObject.prototype.changeCurrent = function(current) {
  this.current = current;
  if(this.object[this.current].type == "animation") {
    this.object[this.current].reset();
  }
}



module.exports = imageObject;