Vector = require("../vector");
var Terrain = function(matrix, depth, update){
    /** Example Terrain: 
                        [[1,1,1,1,1],
                         [1,0,0,0,1],
                         [1,0,0,0,1],
                         [1,0,0,0,1],
                         [1,1,1,1,1]]
    **/
    this.matrix = matrix;
    this.depth;
    this.update = update;
    //this.standardBlockSize = standardBlockSize;
    
    return this;
}
Terrain.prototype.start = function(){}
Terrain.prototype.update = function(){}
Terrain.prototype.draw = function(camera){
    
}

module.exports = Terrain;