var Vector = require("../vector");
var GameObject = require("../game-object");
var DrawableGameObject = require("../drawable-game-object");
var EventEmitter = require("../event-emitter");
var renderer = require("../renderer");
var input = require("../input");
var standards = require("../standards");
var util = require("../util");

VVV = new Vector(100,100);
var Player = function(image, position, dimensions, angle){
  DrawableGameObject.call(this);

  this.image = image;
  this.position = position || new Vector();
  this.dimensions = dimensions || new Vector();
  this.angle = angle || 0;
  
  return this;
}

util.inherits(Player, DrawableGameObject);

Player.prototype.init = function(){

}

Player.prototype.update = function(){
  //this.rotateAround(new Vector(150, 150), 0.05);
  if(input.keyStatus("up")){
    this.moveAlongAngle(new Vector(0,-2 * standards.speed));
  }
  if(input.keyStatus("down")){
    this.moveAlongAngle(new Vector(0,2 * standards.speed));
  }
  if(input.keyStatus("left")){
    this.moveAlongAngle(new Vector(-2 * standards.speed ,0));
  }
  if(input.keyStatus("right")){
    this.moveAlongAngle(new Vector(2 * standards.speed ,0));
  }
  if(input.keyStatus("B")){
    this.rotateAroundMiddle(0.05);
  }
  if(input.keyStatus("N")){
    this.rotateAroundMiddle(-0.05);
  }
  //console.log(this.position);
  //this.moveToBy(VVV, standards.speed);
  return this;
}

Player.prototype.draw = function(camera){
  camera.drawOnScreen(this.image, this.position, this.dimensions, this.angle);
}

module.exports = Player;