var renderer = require("../renderer");
var Vector = require("../vector");

var Image = function(location, position, dimensions, angle) {
    this.location = location;
    this.loadedImage = null;  
    this.position = position || new Vector();
    this.dimensions = dimensions || new Vector(1,1);
    this.angle = angle || 0; 
    this.load();
    return this;
}

Image.prototype.type = "image";

Image.prototype.draw = function(position, dimensions, angle) {
  
  if(this.loadedImage) {
    renderer.drawImage(this.loadedImage, position.clone().add(this.position), dimensions.clone().multiply(this.dimensions), angle + this.angle);
  }
  
  return this;
}

Image.prototype.load = function() {
  this.loadedImage = document.getElementById(this.location)
}

module.exports = Image;