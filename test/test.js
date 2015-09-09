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
var E = new EmptyBlock();
var B = new Block(document.getElementById("bricks"), 1, new Vector(), new Vector(36,36), 0);
var O = new Block(document.getElementById("Icon"), 1, new Vector(), new Vector(36,36), 0);
var Play = new Player(document.getElementById("Icon"), new Vector(), new Vector(36,72), 0);
leTestScene = new Scene();
leTestScene.addCamera(new Camera(new GameObject("Q", "Q", null, new Vector(0,0), new Vector(100,100), null), new Vector(300, 300), 0, new Vector(0,0), new Vector(0,0), 0, 0));
leTestScene.appendChild(new Terrain([[B,B,B,B,B,B,B,B],
                                                   [B,E,E,E,E,E,E,B],
                                                   [B,E,E,E,E,E,E,B],
                                                   [B,E,E,E,E,E,E,B],
                                                   [B,B,B,B,B,B,B,B]]
                                                 )
                       );
leTestScene.appendChild(Play);
input.mapKey(38, "up").mapKey(40, "down").mapKey(37, "left").mapKey(39, "right");
events.on("loop:draw", function(){
  leTestScene.draw();
  //console.log(input.keyStatus("up"));
  //console.log(input.keyStatus("down"));
});
events.on("loop:update", function(){leTestScene.update()});

events.on("loop:update:before", function(){
  renderer.drawText(standards.speed, "20px Georgia", new Vector(40,90), 90  * Math.PI/180 );
});

document.body.appendChild(renderer.DOMElement);