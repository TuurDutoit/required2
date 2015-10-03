var renderer = require("../renderer");

var Sprite = function(location, sheetPosition, sheetDimensions) {
  
  this.location = location;
  this.loadedSheet = null;
  this.sheetPosition = sheetPosition;
  this.sheetDimensions = sheetDimensions;

  this.load();
  
  return this;
}

Sprite.prototype.type = "sprite";

Sprite.prototype.draw = function(position, dimensions, angle) {
  if(this.loadedSheet) {
    renderer.drawSprite(this.loadedSheet, this.sheetPosition, this.sheetDimensions, position, dimensions, angle);
  }
  
  return this;
}

Sprite.prototype.load = function() {
  this.loadedSheet = document.getElementById(this.location);
  
  return this;
}




module.exports = Sprite;