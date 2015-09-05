var events = require("../events");
var Scene = function(name, sequence){
    this.name = name;
    this.sequence = sequence;
    this.cameras = [];
    
    return this;
}
Scene.prototype.update = function(){
    for (i = 0; i < this.sequence.length; i++) {
        //console.log(this.sequence[i]);
        this.sequence[i].update();
        this.sequence[i].fixedUpdate();
        
        //console.log(this.sequence[i]);
        
    }
}
Scene.prototype.draw = function(){
    //console.log(this.cameras.length);
    for (i = 0; i < this.cameras.length; i++) {
        //console.log("Drawing Scene 2.5");
        for (e = 0; e < this.sequence.length; e++) {
            //console.log("Drawing Scene 3");
            this.sequence[e].draw(this.cameras[i]);
        }
    }
}
Scene.prototype.addCamera = function(camera){
    this.cameras.push(camera);
}
module.exports = Scene;