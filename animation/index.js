var renderer = require("../renderer");



var Animation = function(sequence, looping) {
  this.type = "animation";
  this.name = name;
  this.sequence = sequence;
  this.looping = looping;
  this.currentFrame = 0;
  
  return this;
}

Animation.prototype.update = function() {
  
}

Animation.prototype.draw = function(position, dimensions, rotation) {
  this.sequence[currentFrame].i.draw(position, dimension, rotation);
}

Animation.prototype.load = function() {
  
}

Animation.prototype.getCollider = function() {
    
}

Animation.prototype.reset = function() {
  this.currentFrame = 0;
}



module.exports = Animation;