var Vector = require("../../../vector");
var GameObject = require("../../../game-object");
var DrawableGameObject = require("../../../drawable-game-object");
var EventEmitter = require("../../../event-emitter");
var renderer = require("../../../renderer"); 
var input = require("../../../input");
var standards = require("../../../standards");
var util = require("../../../util");
var Crash = require("../../../colliders");
var SpriteAnimation = require("../../../sprite-animation");

VVV = new Vector(100,100);
var Goomba = function(position, dimensions, angle, moveDirection, walkingSpeed){
  DrawableGameObject.call(this);

  this.image = new SpriteAnimation("enemy", [[new Vector(0,3), new Vector(16, 16), 200], [new Vector(2 * 16 - 2, 3), new Vector(16, 16), 200]], true);
  
  
  this.position = position || new Vector();
  this.dimensions = dimensions || new Vector();
  this.angle = angle || 0;
  
  this.moveDirection = moveDirection || new Vector(1,0); 
  this.walkingSpeed  = walkingSpeed  || new Vector(1,1);
  
  this.grounded = true;
  
  this.setCollider(new Crash.Box(this.position, this.dimensions.x, this.dimensions.y, true));
  
  return this;
}

util.inherits(Goomba, DrawableGameObject);

Goomba.prototype.update = function(){
  
  if(this.grounded){
    this.move(this.moveDirection.clone().scale(this.walkingSpeed));
  }
  //else{
    this.move(new Vector(0, 3));
  //}
    
  return this;
}

Goomba.prototype.draw = function(camera){
  camera.drawOnScreen(this.image, this.position, this.dimensions, this.angle);
}

Goomba.prototype.onCollision = function(c, res, cancel){
  //console.log("Blard");
  //this.grounded = false;
  if(c.data.solid) {
    if(res.overlapV.x > 0 || res.overlapV.x < 0){
      this.moveDirection.reverse();
    }
    this.moveBy(res.overlapV.clone());
    //cancel();
    //cancel();
    //console.log(res.overlap);
    //console.log(res.overlapV.y);
    //console.log(res.overlapN.x, res.overlapN.y);
    /**if(res.overlapV.y < 0 || 1/res.overlapV.y === -Infinity){
      //|| res.overlapV.x < 0){
      this.grounded = true;
    }
    else{
      this.grounded = false;
    }**/
  }
  
  return this;
}

module.exports = Goomba;