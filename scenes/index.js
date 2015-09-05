var events = require("../events");
var Scenes = {
    scenes: [],
    addScene: function(scene){
        Scenes.scenes.push(scene);
    },
    draw: function(){ 
        //console.log(Scenes.scenes.length);
        for (i = 0; i < Scenes.scenes.length; i++){
            //console.log("Drawing Scene 2");
            Scenes.scenes[i].draw();
        }
    },
    update: function(){
        for (i = 0; i < Scenes.scenes.length; i++){
            //console.log("Drawing Scene 2");
            Scenes.scenes[i].update();
        }
    }
}
events.on("loop:draw", function() {
    //console.log("Hello?");
    Scenes.draw();
});
events.on("loop:update", function() {
    //console.log("Hello?");
    Scenes.update();
});
module.exports = Scenes;