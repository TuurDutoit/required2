var events = require("../events");
var renderer = require("../renderer");
var Vector = require("../vector");
var scenes = require("../scenes");
var Scene  = require("../scene");
var Camera = require("../camera");
var standarSpeed = require("../standard-speed");
var GameObject = require("../game-object");
var AI = require("../ai");
var AIComponent = require("../ai-component");
var loop = require("../loop");
Game = {
    start: function(){
        loop.start()
    }
}
leTestScene = new Scene("TestScene", [new GameObject("Test", "Test", null, new Vector(0,0), new Vector(100,100), 0, {}, new AI([new AIComponent(function(obj, stuff){
    obj.move(new Vector(1,0));
})]))]);
leTestScene.addCamera(new Camera(new GameObject("Q", "Q", null, new Vector(0,0), new Vector(100,100), null), new Vector(300, 300), 0, new Vector(0,0), new Vector(0,0), 0, 0));
scenes.addScene(leTestScene);

events.on("loop:draw", function() {
   // renderer.drawRectangle(new Vector(0,0), new Vector(100,100));
});

document.body.appendChild(renderer.DOMElement);