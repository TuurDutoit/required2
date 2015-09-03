renderer = require("../rederer")
var sprite = function(name, sheetPosition, sheetDimensions, collider){
    this.type = "sprite";
    this.name = name;
    this.loadedSheet = null;
    this.sheetPosition = sheetPosition;
    this.sheetDimensions = sheetDimensions;
    this.collider = collider;
    
    return this;
}
sprite.prototype.update = function(){
}
sprite.prototype.draw = function(position, dimensions, rotation){
    renderer.drawImage(loadedImage, sheetPosition, sheetDimensions, position, dimension, rotation);
}
sprite.prototype.load = function(){
}
module.exports = sprite;