var events = require("../events");
var renderer = require("../renderer");
Vector = require("../vector");
var Scene  = require("../scene");
var Camera = require("../camera");
var standards = require("../standards");
var GameObject = require("../game-object");
var Terrain = require("../terrain");
var TerrainPatch = require("../terrain-patch");
var AI = require("../ai");
var AIComponent = require("../ai-component");
var loop = require("../loop");
var Block = require("../block");
var EmptyBlock = require("../empty-block");
var input = require("../input");
var Player = require("../player");
var Background = require("../background");
var Image = require("../image");
var Text = require("../text");
var Ui = require("../ui");
loop.updateFps(60);
Game = {
    start: function(){
        loop.start()
    }
}
Play = new Player(new Image(document.getElementById("Icon")), new Vector(), new Vector(36,72), 0);
leTestScene = new Scene();
CAMOBJ = new GameObject(new Vector(), new Vector(), 0);
CAMERA = new Camera(Play, new Vector(324, 324), 0, new Vector(0,0), new Vector(324, 324), 0, 1);
CAMERA.appendChild(new Ui("BATMAN", new Vector(0, 0), 0));
CAMERAB = new Camera(Play, new Vector(324, 324), 0, new Vector(0,324/2), new Vector(324/2, 324/2), 0, 1);
CAMERAC = new Camera(Play, new Vector(324, 324), 0, new Vector(324/2,324/2), new Vector(324/2, 324/2), 0, 1);
CAMERAD = new Camera(CAMOBJ, new Vector(324, 324), 0, new Vector(324/2,0), new Vector(324/2, 324/2), 0, 1);
leTestScene.addCamera(CAMERA);
//leTestScene.addCamera(CAMERAB);
//leTestScene.addCamera(CAMERAC);
//leTestScene.addCamera(CAMERAD);
leTestScene.appendChild(new Background(new Image(document.getElementById("background-scene1")), new Vector(), new Vector(324,324)));

TERRAIN = new Terrain([[1,1,1,1,1,1,1,1,1],
                       [1, , , , , , , ,1],
                       [1, , , , , , , ,1],
                       [1, , , , , , , ,1],
                       [1, , , , , , , ,1],
                       [1, , , , , , , ,1],
                       [1, , , , , , , ,1],
                       [1, , , , , , , ,1],
                       [1,1,1,1,1,1,1,1,1]], [new TerrainPatch([[1,1],
                                                              [1,1]])], new Vector());
leTestScene.appendChild(TERRAIN);
leTestScene.appendChild(Play);
input.mapKey(38, "up").mapKey(40, "down").mapKey(37, "left").mapKey(39, "right").mapKey(107, "+").mapKey(109, "-").mapKey(81, "Q").mapKey(83, "S").mapKey(68, "D").mapKey(90, "Z").mapKey(88, "X").mapKey(87, "W");
A = new Text(standards);
events.on("loop:draw", function(){
  leTestScene.draw();
});

events.on("loop:update", function(){
  leTestScene.update();
});

events.on("loop:update:before", function(){
  //A.draw(new Vector(100,100), 0);
  //renderer.drawText(standards.speed, "20px Georgia", new Vector(40,90), 90  * Math.PI/180 );
});

document.body.appendChild(renderer.DOMElement);