renderer = require("../rederer")
var animation = function(sequence, looping){
    this.type = "animation";
    this.name = name;
    this.sequence = sequence;
    this.looping = looping;
    this.currentFrame = 0;
    return this;
}
animation.prototype.update = function(){
}
animation.prototype.draw = function(position, dimensions, rotation){
    this.sequence[currentFrame].i.draw(position, dimension, rotation);
}
animation.prototype.load = function(){
}
animation.prototype.getCollider = function(){
    
}
animation.prototype.reset = function(){
    this.currentFrame = 0;
}
module.exports = animation;