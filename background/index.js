var Background = function(texture, position, dimensions){
    this.position = position;
    this.dimensions = dimensions;
    
    return this;
}
Background.prototype.update = function(){
}
Background.prototype.draw = function(){   
    texture.draw(this.position, this.dimensions, 0);
}
module.exports = Background;