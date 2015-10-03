var Vector = require("../vector");
var GameObject = require("../game-object");
var EventEmitter = require("../event-emitter");
var util = require("../util");
var blocks =  require("../blocks");

var Terrain = function(matrix, patches, position, angle){
  GameObject.call(this);
  this.matrix = matrix;
  this.position = position || new Vector();
  this.angle = angle || 0;
  this.blockSize = 36;
  this.appendPatches(patches);
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
    this.matrix[index.y][index.x] = new blocks.geBlockById(block)();
  }
  else if(typeof block === "string") {
    this.matrix[index.y][index.x] = new blocks[block]();
  }
  else{
    this.matrix[index.y][index.x] = block;
  }
    
  return this;
}

Terrain.prototype.init = function(){
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

Terrain.prototype.appendPatch = Terrain.prototype.appendChild;

Terrain.prototype.appendPatches = Terrain.prototype.appendChildren;

Terrain.prototype.prependPatch = Terrain.prototype.prependChild;

Terrain.prototype.insertPatch = Terrain.prototype.insertChild;

Terrain.prototype.insertPatchAfter = Terrain.prototype.insertChildAfter;

Terrain.prototype.insertPatchAt = Terrain.prototype.insertChildAt;

Terrain.prototype.insertPatchBefore = Terrain.prototype.insertChildBefore;

Terrain.prototype.removePatch = Terrain.prototype.removeChild;

Terrain.prototype.removePatchAt = Terrain.prototype.removeChildAt;

Terrain.prototype.replacePatch = Terrain.prototype.replaceChild;

Terrain.prototype.getPatch = Terrain.prototype.getChild;

Terrain.prototype.getPatchAt = Terrain.prototype.getChildAt;

Terrain.prototype.getPatchIndex = Terrain.prototype.getChildIndex;

Terrain.prototype.forEachPatch = Terrain.prototype.forEachChild;

module.exports = Terrain;