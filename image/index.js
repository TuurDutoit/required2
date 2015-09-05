var renderer = require("../renderer");


var Image = function(name, collider) {
    this.type = "image";
    this.name = name;
    this.loadedImage = null;
    this.collider = collider;
    
    return this;
}

Image.prototype.update = function() {
  
}

Image.prototype.draw = function(position, dimensions, rotation) {
  renderer.drawImage(this.loadedImage, position, dimension, rotation);
}

Image.prototype.load = function() {
  
}



module.exports = Image;