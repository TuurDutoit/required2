var Vector = require("../vector");
var GameObject = require("../game-object");
var EventEmitter = require("../event-emitter");
var renderer = require("../renderer");
var input = require("../input");
var standards = require("../standards");
var util = require("../util");

var Player = function(image, position, dimensions, angle){
  EventEmitter.call(this);

  this.image = image;
  this.position = position || new Vector();
  this.dimensions = dimensions || new Vector();
  this.angle = angle || 0;
  
  return this;
}

util.inherits(Player, GameObject);

Player.prototype.start = function(){

}

Player.prototype.update = function(){
  
  if(input.keyStatus("up")){
    this.move(new Vector(0,-2 * standards.speed));
  }
  if(input.keyStatus("down")){
    this.move(new Vector(0,2 * standards.speed));
  }
  if(input.keyStatus("left")){
    this.move(new Vector(-2 * standards.speed ,0));
  }
  if(input.keyStatus("right")){
    this.move(new Vector(2 * standards.speed ,0));
  }
  
  return this;
}

Player.prototype.draw = function(camera){
  renderer.drawImage(this.image, this.position, this.dimensions, this.angle);
}

module.exports = Player;