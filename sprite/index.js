var renderer = require("../renderer");


var Sprite = function(name, sheetPosition, sheetDimensions, collider) {
  this.type = "sprite";
  this.name = name;
  this.loadedSheet = null;
  this.sheetPosition = sheetPosition;
  this.sheetDimensions = sheetDimensions;
  this.collider = collider;

  return this;
}

Sprite.prototype.update = function() {
  
}

Sprite.prototype.draw = function(position, dimensions, rotation) {
  renderer.drawImage(this.loadedSheet, this.sheetPosition, this.sheetDimensions, position, dimensions, rotation);
}

Sprite.prototype.load = function() {
  
}




module.exports = Sprite;