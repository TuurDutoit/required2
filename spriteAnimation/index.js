renderer = require("../rederer");


var spriteAnimation = function(sequence, looping){
  this.type = "animation";
  this.name = name;
  this.sequence = sequence;
  this.looping = looping;
  this.currentFrame = 0;
  
  return this;
}

spriteAnimation.prototype.update = function() {
  
}

spriteAnimation.prototype.draw = function(position, dimensions, rotation) {
  this.sequence[currentFrame].I.draw(position, dimension, rotation);
}

spriteAnimation.prototype.load = function() {
  
}

spriteAnimation.prototype.getCollider = function() {
  
}

spriteAnimation.prototype.reset = function() {
  this.currentFrame = 0;
}



module.exports = spriteAnimation;