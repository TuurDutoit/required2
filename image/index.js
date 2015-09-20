var renderer = require("../renderer");


var Image = function(name, collider) {
    this.type = "image";
    this.name = name;
    this.loadedImage = null;
    
    this.loadedImage = this.name;
  
    this.collider = collider;
    
    return this;
}

Image.prototype.update = function() {
  
}

Image.prototype.draw = function(position, dimensions, angle) {
  renderer.drawImage(this.loadedImage, position, dimensions, angle);
  
  return this;
}

Image.prototype.load = function() {
  
}

Image.prototype.getCollider = function() {
  return this.collider;
}


module.exports = Image;