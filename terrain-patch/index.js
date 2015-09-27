var Vector = require("../vector");
var GameObject = require("../game-object");
var Terrain = require("../terrain");
var EventEmitter = require("../event-emitter");
var util = require("../util");
var blocks =  require("../blocks");

var TerrainPatch = function(matrix, position){
  EventEmitter.call(this);
  this.matrix = matrix;
  this.position = position || new Vector();
  
  return this;
}

util.inherits(TerrainPatch, Terrain);

TerrainPatch.prototype.apply = function() {
  var self = this;
  this.forEachBlock(function(block, position, matrix){
    self.parent.replaceBlock(position.add(self.position), blocks.getBlockById(block));
  });
  
  return this;
}

module.exports = TerrainPatch;