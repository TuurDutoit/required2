var Vector = require("../vector");
var GameObject = require("../game-object");
var EventEmitter = require("../event-emitter");
var util = require("../util");
var blocks =  require("../blocks");

var Terrain = function(matrix, position){
  EventEmitter.call(this);
  this.matrix = matrix;
  this.position = position || new Vector();
  this.blockSize = 36;
  this.convert();
  
  return this;
}

util.inherits(Terrain, GameObject);

Terrain.prototype.convert = function(){
  this.forEachBlock(function(block, position, matrix){
    matrix[y][x] = blocks.getBlockById(matrix[y][x]);
  });
}

Terrain.prototype.forEachBlock = function(cb){
  for(y = 0, lenA = this.matrix.length; y < lenA; y++) {
    for(x = 0, lenB = this.matrix[y].length; x < lenB; x++) {
      cb(this.matrix[y][x], new Vector(x,y), this.matrix);
    }
  }
}

Terrain.prototype.getBlock = function(index){
  return matrix[index.y][index.x];
}

Terrain.prototype.replaceBlock = function(index, block){
  if(typeof block === "number") {
    this.matrix[index.y][index.x] = blocks.getElementById(block);
  }
  else if(typeof block === "string") {
    this.matrix[index.y][index.x] = blocks[block];
  }
  else{
    this.matrix[index.y][index.x] = block;
  }
    
  return this;
}

Terrain.prototype.start = function(){

}

Terrain.prototype.update = function(){

}

Terrain.prototype.draw = function(camera){
  var pos = this.position;
  var blockS = this.blockSize;
  this.forEachBlock(function(block, position){
    block.draw(position.add(pos).multiply(blockS));
  });
}

module.exports = Terrain;