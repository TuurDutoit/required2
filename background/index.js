var Background = function(texture, position, dimensions, depth) {
  this.position = position;
  this.dimensions = dimensions;
  this.depth = depth;
  
  return this;
}

Background.prototype.update = function() {
  
}

Background.prototype.draw = function() {   
  texture.draw(this.position, this.dimensions, 0);
}



module.exports = Background;