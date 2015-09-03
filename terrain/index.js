Vector = require("../vector");
var Terrain = function(matrix, standardBlockSize){
    /** Example Terrain: 
                        [[1,1,1,1,1],
                         [1,0,0,0,1],
                         [1,0,0,0,1],
                         [1,0,0,0,1],
                         [1,1,1,1,1]]
    **/
    this.matrix = matrix;
    this.standardBlockSize = standardBlockSize;
    
    return this;
}
Terrain.prototype.update = function(){
}
Terrain.prototype.draw = function(camera){
    
}

module.exports = Terrain;