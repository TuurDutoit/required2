var Vector = require("../vector");
var GameObject = require("../game-object");
var EventEmitter = require("../event-emitter");
var renderer= require("../renderer");
var input = require("../input");
var util = require("../util");

var Camera = function(obj, offset, dimensions, angle, displayPosition, displayDimensions, displayAngle){
  GameObject.call(this);
  this.active = true;
  this.displaying = false;
  this.position = obj.position || new Vector();
  this.offset = offset || new Vector();
  this.dimensions = dimensions || new Vector();
  this.angle = angle || 0;
  this.displayPosition = displayPosition || new Vector();
  this.displayDimensions = displayDimensions || this.dimensions;
  this.displayAngle = displayAngle || this.angle;
  this.calculateZoomDimensions();

  return this;
}

util.inherits(Camera, GameObject);

Camera.prototype.update = function() {
  //console.log("a");
  if(input.keyStatus("+")){
    this.zoom(1.01);
  }
  if(input.keyStatus("-")){
    this.zoom(0.99);
  }
  if(input.keyStatus("Z")){
    this.move(new Vector(0, -2));
  }
  if(input.keyStatus("S")){
    this.move(new Vector(0, 2));
  }
  if(input.keyStatus("Q")){
    this.move(new Vector(-2, 0));
  }
  if(input.keyStatus("D")){
    this.move(new Vector(2, 0));
  }
  if(input.keyStatus("W")){
    this.rotateAroundMiddle(0.01);
    //this.rotate(0.01);
  }
  if(input.keyStatus("X")){
    this.rotateAroundMiddle(-0.01);
    //this.rotate(-0.01);
  }
  this.forEachUi(function(ui){
    ui.update();
  });
}

Camera.prototype.draw = function() {
  var self = this;
  this.forEachUi(function(ui){
    ui.draw(self);
  });
}

Camera.prototype.moveBy = Camera.prototype.move = function(v) {
  this.offset.add(v);
  
  return this;
}

Camera.prototype.activate = function() {
  //Turns Camera On
  if(this.active) {
    console.log("This camera is already active!");
  }
  else {        
    this.active = true;
  }
}

Camera.prototype.deactivate = function() {
  //Turns Camera Off
  if(!this.active) {
    console.log("This camera is already inactive!");
  }
  else {        
    this.active = false;
  }
}

//Camera.prototype.changeScene
Camera.prototype.linkTo = function(obj) {
  //Links Camera to gameObject
  this.position = obj.position;
  
  return this;
}

Camera.prototype.reset  = function() {
  //Resets Camera offset to (0,0)
  this.offset.reset();
  
  return this;
}

Camera.prototype.setOffset = function(offset) {
  this.offset = offset;
  
  return this;
}

Camera.prototype.setRotation = function(rotation) {
  this.angle = rotation;
  
  return this;
}

Camera.prototype.rotate = function(angle) {
  this.angle += angle;
  
  return this;
}

Camera.prototype.rotateAround = function(v, angle) {
  if(v instanceof Vector){
    this.offset.add(this.position).rotateAround(v, angle).sub(this.position);
  }
  else{
    this.offset.add(this.position).rotateAround(v.position, angle).sub(this.position);
  }
  this.rotate(angle);
  
  return this;
}

Camera.prototype.rotateAroundMiddle = function(angle) {
  this.rotateAround(this.getMiddle(), angle);
  
  return this;
}

Camera.prototype.rotateAroundOrigin = function(angle) {
  this.rotateAround(new Vector(), angle);
  
  return this;
}

Camera.prototype.getMiddle = function(){
  //console.log(this.dimensions.clone().divide(2).add(this.absolutePosition()).rotateAround(this.absolutePosition(), this.angle));
  return this.dimensions.clone().divide(2).add(this.absolutePosition()).rotateAround(this.absolutePosition(), this.angle);
}

Camera.prototype.absolutePosition = function() {
  return this.position.clone().add(this.offset);
}

Camera.prototype.calculateZoomDimensions = function() {
  this.zoomDimensions = this.displayDimensions.clone().divide(this.dimensions);
  return this;
}

Camera.prototype.zoom = function(toZoom) {
  if(toZoom >= 0){
    this.dimensions.divide(toZoom);  
    this.calculateZoomDimensions();
  }
  else{
    console.log("Invalid zoom!");
  }
  
  return this;
}

Camera.prototype.setZoom = function(toZoom) {
  if(toZoom >= 0) {
    this.zoom = toZoom;
  }
  else {
    console.log("Invalid zoom!");
  }
  return this;
}

Camera.prototype.isObjectVisible = function(obj) {
  if((obj.position.x + obj.dimensions.x >= this.position.x) && (obj.position.y + obj.dimensions.y >= this.position.y) && (obj.position.x <= this.position.x + this.dimensions.x) && (obj.position.y <= this.position.y + this.dimensions.y)) {
    return true;
  }
  else {
    return false;
  }
}

Camera.prototype.drawScene = function(scene) {
  //Draws the visible scene
  if(this.active){
    if(this.position.x - this.dimensions.x < 0){
      this.position = this.dimensions.x;
    }
    if(this.position.y - this.dimensions.y < 0){
      this.position = this.dimensions.y;
    }
    if(this.displaying){
      //Draw Camera
    }
  }
  
  return this;
}

Camera.prototype.positionOnScreen = function(position) {
  return position.clone().rotateAround(this.absolutePosition(), -this.angle ).sub(this.absolutePosition()).multiply(this.zoomDimensions).add(this.displayPosition).rotateAround(this.displayPosition, -this.displayAngle);
}

Camera.prototype.dimensionsOnScreen = function(dimensions) {
  return dimensions.clone().multiply(this.zoomDimensions);
}

Camera.prototype.angleOnScreen = function(angle) {
  return angle - this.angle - this.displayAngle;
}

Camera.prototype.sizeOnScreen = function(size) {
  return size * this.zoomDimensions.y;
}
  
Camera.prototype.setDisplayDimensions = function(v) {
  this.displayDimensions = v;
  
  return this;
}

Camera.prototype.setDisplayPosition = function(v) {
  this.displayPosition = v;
  
  return this;
}

Camera.prototype.appendUi = Camera.prototype.appendChild;

Camera.prototype.prependUi = Camera.prototype.prependChild;

Camera.prototype.insertUi = Camera.prototype.insertChild;

Camera.prototype.insertUiAfter = Camera.prototype.insertChildAfter;

Camera.prototype.insertUiAt = Camera.prototype.insertChildAt;

Camera.prototype.insertUiBefore = Camera.prototype.insertChildBefore;

Camera.prototype.removeUi = Camera.prototype.removeChild;

Camera.prototype.removeUiAt = Camera.prototype.removeChildAt;

Camera.prototype.replaceUi = Camera.prototype.replaceChild;

Camera.prototype.getUi = Camera.prototype.getChild;

Camera.prototype.getUiAt = Camera.prototype.getChildAt;

Camera.prototype.getUiIndex = Camera.prototype.getChildIndex;

Camera.prototype.forEachUi = Camera.prototype.forEachChild;

Camera.prototype.drawOnCanvas = function(image, position, dimensions, angle) { 
  image.draw(position, dimensions, angle);  

  return this;
}

Camera.prototype.drawTextOnCanvas = function(text, position, size, angle, font, color) { 
  renderer.drawText(text, position, size, angle, font, color);

  return this;
}

Camera.prototype.drawOnScreen = function(image, position, dimensions, angle) { 
  image.draw(this.positionOnScreen(position),this.dimensionsOnScreen(dimensions), this.angleOnScreen(angle));  

  return this;
}

Camera.prototype.drawOnScreen = function(image, position, dimensions, angle) { 
  image.draw(this.positionOnScreen(position),this.dimensionsOnScreen(dimensions), this.angleOnScreen(angle));  

  return this;
}

Camera.prototype.drawTextOnScreen = function(text, position, size, angle, font, color) {
  renderer.drawText(text, this.positionOnScreen(position),this.sizeOnScreen(size), this.angleOnScreen(angle), font, color);
  
  return this;
}



module.exports = Camera;