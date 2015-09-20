var renderer = require("../renderer");


var Text = function(text, size, font, collider) {
    this.text = text || "Undefined";
    this.size = size || 20;
    this.font = font || "Georgia";
    this.name = "A";
    this.loadedImage = null;
    
    this.loadedImage = this.name;
  
    this.collider = collider;
    
    return this;
}

Text.prototype.update = function() {
  
}

Text.prototype.draw = function(position, angle) {
  renderer.drawText(this.text.speed, this.size.toString() + "px " + this.font, position, angle);
  
  return this;
}

Text.prototype.load = function() {
  
}

Text.prototype.getCollider = function() {
  return this.collider;
}

Text.prototype.changeText = function(text) {
  this.text = text;
  
  return this;
}

module.exports = Text;