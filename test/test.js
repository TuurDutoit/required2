events = require("../events");
renderer = require("../renderer");
Vector = require("../vector");
scenes = require("../scenes");
Scene  = require("../scene");
Camera = require("../camera");
GameObject = require("../gameObject");
AI = require("../AI");
AIComponent = require("../AIComponent");
var loop = require("../loop");
Game = {
    start: function(){
        loop.start()
    }
}
leTestScene = new Scene("TestScene", [new GameObject("Test", "Test", null, new Vector(0,0), new Vector(100,100), new AI([new AIComponent(function(obj, stuff){
    obj.move(new Vector(1,0));
    console.log("Move");
    console.log(obj);
})]))]);
leTestScene.addCamera(new Camera(new GameObject("Test", "Test", null, new Vector(0,0), new Vector(100,100), null), new Vector(300, 300), 0, new Vector(0,0), new Vector(0,0), 0, 0));
scenes.addScene(leTestScene);

events.on("loop:draw", function() {
   // renderer.drawRectangle(new Vector(0,0), new Vector(100,100));
});
//