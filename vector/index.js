var Vector = require("../colliders").Vector;


Vector.prototype.reset = function() {
  this.x = 0;
  this.y = 0;

  return this;
}

Vector.prototype.rotateAround = function(v, angle) {
  var s = Math.sin(angle);
  var c = Math.cos(angle);
  this.sub(v);
  var x = c * (this.x) - s * (this.y);
  var y = s * (this.x) + c * (this.y);
  this.x = x;
  this.y = y;
  this.add(v);
  return this;
}

Vector.prototype.rotateAroundOrigin = function(angle) {
  this.rotateAround(new Vector(), angle)
  
  return this;
}

Vector.prototype.multiply = function(V){
  if(typeof V === "number") {
    this.x *= V;
    this.y *= V;
  }
  else{
    this.x *= V.x;
    this.y *= V.y;
  }
  
  return this;
}

Vector.prototype.divide = function(V){
  if(typeof V === "number") {
    this.x /= V;
    this.y /= V;
  }
  else{
    this.x /= V.x;
    this.y /= V.y;
  }
  
  return this;
}

Vector.prototype.addX = function(V) {
  if(typeof V === "number") {
    this.x += V;
  }
  else{
    this.x += V.x;
  }

  return this;
}

Vector.prototype.addY = function(V) {
  if(typeof V === "number") {
    this.y += V;
  }
  else{
    this.y += V.y;
  }

  return this;
}

Vector.prototype.subX = function(V) {
  if(typeof V === "number") {
    this.x -= V;
  }
  else{
    this.x -= V.x;
  }

  return this;
}

Vector.prototype.subY = function(V) {
  if(typeof V === "number") {
    this.y -= V;
  }
  else{
    this.y += V.y;
  }

  return this;
}

Vector.prototype.distance2 = function(V) {
  return ((this.x - V.x) * (this.x - V.x) + (this.y - V.y) * (this.y - V.y));
}

Vector.prototype.distance = function(V) {    
  return Math.sqrt(this.distance2(V));
}



module.exports = Vector;