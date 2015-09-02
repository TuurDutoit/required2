//Vector = require("../vector");
var Block = function(offset, dimensions){
    this.offset = offset;
    this.dimensions = dimensions;    
    return this;
}
Block.prototype.update = function(){
}
Block.prototype.draw = function(position, camera){
    this.position = position;
    if(camera.isObjectVisible(this)){
        
    }
}

module.exports = Block;