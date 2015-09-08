Vector = require("../vector");
GameObject = require("../game-object");

var Terrain = function(matrix, position){
  this._super.call(this, arguments);
  this.matrix = matrix;
  this.position = position || new Vector();
  
  return this;
}

Terrain.prototype.forEachBlock = function(cb){
  for(var y = 0; var lenA = this.matrix.length; y < lenA; y++) {
    for(var x = 0; var lenB = this.matrix[y].length; x < lenB; x++) {
      cb(this.matrix[y][x], new Vector(x,y), this.matrix);
    }
  }
}

Terrain.prototype.start = function(){

}

Terrain.prototype.update = function(){

}

Terrain.prototype.draw = function(camera){
  this.forEachBlock(function(block, position){
    block.draw(camera, position.add(this.position);
  });
}

util.inherits(Terrain, GameObject);

module.exports = Terrain;