var events = require("../events");
var renderer = require("../renderer");
var Vector = require("../vector");
var Scene  = require("../scene");
var Camera = require("../camera");
var standards = require("../standards");
var GameObject = require("../game-object");
var Terrain = require("../terrain");
var AI = require("../ai");
var AIComponent = require("../ai-component");
var loop = require("../loop");
var Block = require("../block");
var EmptyBlock = require("../empty-block");
var input = require("../input");
var Player = require("../player");

loop.updateFps(60);
Game = {
    start: function(){
        loop.start()
    }
}
var Play = new Player(document.getElementById("Icon"), new Vector(), new Vector(36,72), 0);
leTestScene = new Scene();
leTestScene.addCamera(new Camera(new GameObject("Q", "Q", null, new Vector(0,0), new Vector(100,100), null), new Vector(300, 300), 0, new Vector(0,0), new Vector(0,0), 0, 0));
leTestScene.appendChild(new Terrain([[1,1,1,1,1,1,1,1],
                                     [1,0,0,0,0,0,0,1],
                                     [1,0,0,0,0,0,0,1],
                                     [1,0,0,0,0,0,0,1],
                                     [1,1,1,1,1,1,1,1]]));
leTestScene.appendChild(Play);
input.mapKey(38, "up").mapKey(40, "down").mapKey(37, "left").mapKey(39, "right");
events.on("loop:draw", function(){
  leTestScene.draw();
});

events.on("loop:update", function(){
  leTestScene.update()
});

events.on("loop:update:before", function(){
  renderer.drawText(standards.speed, "20px Georgia", new Vector(40,90), 90  * Math.PI/180 );
});

document.body.appendChild(renderer.DOMElement);