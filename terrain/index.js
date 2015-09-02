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
    for (y = matrix.length; y > 0; --y) {
        for (x = 0; x < matrix.lenght; ++x) {
            matrix[y][x].Draw(new Vector(x * standardBlockSize, y * standardBlockSize), camera);
        }
    }
}

module.exports = Terrain;