var Vector = require("../vector");
var GameObject = require("../game-object");
var DrawableGameObject = require("../drawable-game-object");
var EventEmitter = require("../event-emitter");
var renderer = require("../renderer");
var input = require("../input");
var standards = require("../standards");
var util = require("../util");

var CameraDisplay = function(camera, surroundingImage, position, dimensions, angle){
  DrawableGameObject.call(this);

  this.image = surroundingImage;
  this.camera = camera;
  this.position = position || new Vector();
  this.dimensions = dimensions || new Vector();
  this.angle = angle || 0;
  
  return this;
}

util.inherits(CameraDisplay, DrawableGameObject);

CameraDisplay.prototype.init = function(){
  return this;
}

CameraDisplay.prototype.update = function(){
  this.rotateAroundMiddle(Math.PI/100 * standards.speed);
  return this;
}

CameraDisplay.prototype.draw = function(camera) {
  if(this.camera !== camera){
    this.camera.displayAngle = -camera.angleOnScreen(this.angle);
    this.camera.displayPosition = camera.positionOnScreen(this.position);
    this.camera.displayDimensions = camera.dimensionsOnScreen(this.dimensions);
    
    //console.log(camera.angleOnScreen(this.angle));
    this.camera.calculateZoomDimensions();
    
    leTestScene.drawWithCamera(this.camera);
  }
  camera.drawOnScreen(this.image, this.position, this.dimensions, this.angle);
}

module.exports = CameraDisplay;