var Vector = require("../vector");
var GameObject = require("../game-object");
var EventEmitter = require("../event-emitter");
var renderer = require("../renderer");
var input = require("../input");
var standards = require("../standards");
var util = require("../util");

var Fireball = function(image, position, dimensions){
  EventEmitter.call(this);

  this.image = image;
  this.position = position || new Vector();
  this.dimensions = dimensions || new Vector();
  this.angle = 0;
  
  return this;
}

util.inherits(Fireball, GameObject);

Fireball.prototype.start = function(){

}

Fireball.prototype.update = function(){
  
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

Fireball.prototype.draw = function(camera){
  renderer.drawImage(this.image, this.position, this.dimensions, this.angle);
}

module.exports = Fireball;