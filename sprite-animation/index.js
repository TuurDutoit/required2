renderer = require("../rederer");


var SpriteAnimation = function(sequence, looping){
  this.type = "animation";
  this.name = name;
  this.sequence = sequence;
  this.looping = looping;
  this.currentFrame = 0;
  
  return this;
}

SpriteAnimation.prototype.update = function() {
  
}

SpriteAnimation.prototype.draw = function(position, dimensions, rotation) {
  this.sequence[currentFrame].I.draw(position, dimension, rotation);
}

SpriteAnimation.prototype.load = function() {
  
}

SpriteAnimation.prototype.getCollider = function() {
  
}

SpriteAnimation.prototype.reset = function() {
  this.currentFrame = 0;
}



module.exports = SpriteAnimation;