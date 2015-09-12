var Vector = require("../vector");
var Block = require("../block");
var EventEmitter = require("../event-emitter");
var util = require("util");

var EmptyBlock = function() {
  EventEmitter.call(this);
  this.name = "empty";
  this.id = 0;
  this.offset = new Vector();
  this.dimensions = new Vector();
  this.angle = 0;

  return this;
}

util.inherits(EmptyBlock, Block);

EmptyBlock.prototype.update = function() {

}

EmptyBlock.prototype.draw = function(position, camera) {

}



module.exports = EmptyBlock;