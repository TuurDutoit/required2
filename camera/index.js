var Vector = require("../vector");
var Rederer= requite("../draw-canvas");

var Camera = function(obj, D){
    this.currentScene = null;
    this.active = true;
	this.displaying = false;
    this.position = obj.position;
    this.dimensions = D;
	this.offset = new Vector(0,0);
	
    return this;
}
Camera.prototype.activate = funtion(){
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
	this.offset.reset();
}
Camera.prototype.move  = function(V){
	this.offset.add(V);
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