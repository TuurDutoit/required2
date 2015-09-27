var Vector = require("../vector");
var GameObject = require("../game-object");
var EventEmitter = require("../event-emitter");
var util = require("../util");
var blocks =  require("../blocks");

var Terrain = function(matrix, patches, position, angle){
  EventEmitter.call(this);
  this.matrix = matrix;
  this.position = position || new Vector();
  this.angle = angle || 0;
  this.blockSize = 36;
  this.attachTerrainPatches(patches);
  this.convert();
  
  return this;
}

util.inherits(Terrain, GameObject);

Terrain.prototype.attachTerrainPatch = function(patch) {
  this.patches.push(patch);
  patch.attachTerrain(this);
  
  return this;
}

Terrain.prototype.attachTerrainPatches = function(patches) {
  this.patches = [];
  if(patches){
    for(i = 0, len = patches.length; i < len; i++) { 
      this.attachTerrainPatch(patches[i]);
    }
  }
  
  return this;
}

Terrain.prototype.convert = function(){
  this.forEachBlock(function(block, position, matrix){
    matrix[position.y][position.x] = blocks.getBlockById(matrix[position.y][position.x]);
  });
  
  return this;
}

Terrain.prototype.forEachBlock = function(cb){
  for(y = 0, lenA = this.matrix.length; y < lenA; y++) {
    for(x = 0, lenB = this.matrix[y].length; x < lenB; x++) {
      cb(this.matrix[y][x], new Vector(x,y), this.matrix);
    }
  }
  
  return this;
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
  return this;
}

Terrain.prototype.update = function(){
  return this;
}

Terrain.prototype.draw = function(camera){
  var self = this; 
  this.forEachBlock(function(block, position){
    block.draw(camera, position.add(self.position).multiply(self.blockSize), self.angle);
  });
  
  return this;
}

module.exports = Terrain;