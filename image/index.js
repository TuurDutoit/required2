renderer = require("../rederer")
var image = function(name, collider){
    this.type = "image";
    this.name = name;
    this.loadedImage = null;
    this.collider = collider;
    
    return this;
}
image.prototype.update = function(){
}
image.prototype.draw = function(position, dimensions, rotation){
    renderer.drawImage(loadedImage, position, dimension, rotation);
}
image.prototype.load = function(){
}
module.exports = image;