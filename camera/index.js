var Vector = require("../vector");
var Rederer= require("../draw-canvas");

var Camera = function(obj, dimensions, rotation, displayPosition, displayDimension, displayRotation, zoom){
    this.active = true;
	this.displaying = false;
    this.position = obj.position;
    this.dimensions = dimensions;
    this.rotation = rotation;
    this.displayPosition = displayPosition;
    this.displayDimension = displayDimension;
    this.displayRotation = displayRotation;
	this.zoom = zoom;
    this.offset = new Vector(0,0);
    
    return this;
}
Camera.prototype.activate = function(){
    //Turns Camera On
    if(this.active){
        console.log("This camera is already active!");
    }
    else{        
        this.active = true;
    }
}
Camera.prototype.deactivate = function(){
    //Turns Camera Off
    if(!this.active){
        console.log("This camera is already inactive!");
    }
    else{        
        this.active = false;
    }
}
//Camera.prototype.changeScene
Camera.prototype.linkTo = function(obj){
    //Links Camera to gameObject
    this.position = obj.position;
}
Camera.prototype.reset  = function(){
    //Resets Camera offset to (0,0)
	this.offset.reset();
}
Camera.prototype.setOffset = function(offset){
    this.offset = offset;
}
Camera.prototype.move  = function(V){
	this.offset.add(V);
}
Camera.prototype.setRotation = function(rotation){
    this.rotation = rotation;
}
Camera.prototype.rotate = function(angle){
    this.rotation += angle;
}
Camera.prototype.zoom = function(toZoom){
    if(toZoom >= 0){
        this.zoom *= toZoom;
    }
    else{
        console.log("Invalid zoom!");
    }
}
Camera.prototype.setZoom = function(toZoom){
    if(toZoom >= 0){
        this.zoom = toZoom;
    }
    else{
        console.log("Invalid zoom!");
    }
}
Camera.prototype.isObjectVisible = function(obj){
    if((obj.position.x + obj.dimensions.x >= this.position.x) && (obj.position.y + obj.dimensions.y >= this.position.y) && (obj.position.x <= this.position.x + this.dimensions.x) && (obj.position.y <= this.position.y + this.dimensions.y)){
        return true;
    }
    else{
        return false;
    }
}
Camera.prototype.drawScene = function(scene){
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
}
module.exports = Camera;