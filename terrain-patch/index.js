var Vector = require("../vector");
var GameObject = require("../game-object");
var EventEmitter = require("../event-emitter");
var util = require("../util");
var blocks =  require("../blocks");

var TerrainPatch = function(matrix, position){
  EventEmitter.call(this);
  this.matrix = matrix;
  this.position = position || new Vector();
  
  return this;
}

util.inherits(TerrainPatch, GameObject);

TerrainPatch.prototype.attachTerrain = function(terrain) {
  this.terrain = terrain;
  
  return this
}

TerrainPatch.prototype.apply = function() {
  var self = this;
  this.forEachBlock(function(block, position, matrix){
    self.terrain.replaceBlock(position.add(self.position), blocks.getBlockById(block));
  });
  
  return this;
}

TerrainPatch.prototype.forEachBlock = function(cb){
  for(y = 0, lenA = this.matrix.length; y < lenA; y++) {
    for(x = 0, lenB = this.matrix[y].length; x < lenB; x++) {
      cb(this.matrix[y][x], new Vector(x,y), this.matrix);
    }
  }
  
  return this;
}



module.exports = TerrainPatch;