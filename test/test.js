var events = require("../events");
var renderer = require("../renderer");
Vector = require("../vector");
var Scene  = require("../scene");
var Camera = require("../camera");
var standards = require("../standards");
var GameObject = require("../game-object");
var DrawableGameObject = require("../drawable-game-object");
var CameraDisplayObject = require("../camera-display-object");
var Terrain = require("../terrain");
var TerrainPatch = require("../terrain-patch");
var AI = require("../ai");
var AIComponent = require("../ai-component");
var Animation = require("../animation");
var loop = require("../loop");
var Block = require("../block");
var EmptyBlock = require("../empty-block");
var input = require("../input");
var Player = require("../player");
var Background = require("../background");
var Image = require("../image");
var Text = require("../text");
var Ui = require("../ui");
var Sprite = require("../sprite");
var SpriteAnimation = require("../sprite-animation");
var Crash = require("../colliders");

loop.updateFps(60);
Game = {
    start: function(){
        loop.start()
    }
}
Play = new Player(new SpriteAnimation("Mario", [[new Vector(6 * 16, 0), new Vector(16, 32), 200], [new Vector(7 * 16, 0), new Vector(16, 32), 200] , [new Vector(8 * 16, 0), new Vector(16, 32), 200] , [new Vector(7 * 16, 0), new Vector(16, 32), 200]], true), new Vector(36,324 - 1.5 * 72), new Vector(36,72), 0);
leTestScene = new Scene();
CAMOBJ = new GameObject(new Vector(), new Vector(), 0);
CAMERA = new Camera(Play, new Vector(-Play.position.x,-Play.position.y), new Vector(324, 324/2), 0, new Vector(), new Vector(324, 324/2), 0, 1);
CAMERAQ = new Camera(new GameObject(), new Vector(), new Vector(324, 324), 0, new Vector(0,0), new Vector(324, 324), 0, 1);
CAMERA.appendChild(new Ui("BATMAN", new Vector(0, 0), 0));
CAMERAB = new Camera(new GameObject(), new Vector(), new Vector(324, 324/2), 0, new Vector(0,324/2), new Vector(324, 324/2), 0, 1);
CAMERAC = new Camera(Play, new Vector(), new Vector(324, 324), 0, new Vector(324/2,324/2), new Vector(324/2, 324/2), 0, 1);
CAMERAD = new Camera(CAMOBJ, new Vector(), new Vector(324, 324), 0, new Vector(324/2,0), new Vector(324/2, 324/2), 0, 1);
leTestScene.addCamera(CAMERA);
leTestScene.addCamera(CAMERAB);
//leTestScene.addCamera(CAMERAC);
//leTestScene.addCamera(CAMERAD);
leTestScene.appendChild(new Background(new Image("background-scene1"), new Vector(), new Vector(324,324), 0, new Vector(0.1, 1)));

TERRAIN = new Terrain([[ , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ],
                       [ , , , , , , , , , , , , , , , , , , , , , ,3, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,2,2,2,2,2,2,2,2, , , ,2,2,2,3, , , , , , , , , , , , , , ,3, , , , , , , , , , , ,2,2,2, , , , ,2,3,3,2, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,6,6],
                       [ , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,6,6,6],
                       [ , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,6,6,6,6],
                       [ , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,6,6,6,6,6],
                       [ , , , , , , , , , , , , , , , ,3, , , ,2,3,2,3,2, , , , , , , , , , , , , , , , , , , , , ,5, , , , , , , , , , ,5, , , , , , , , , , , , , , , , , , , ,2,3,2, , , , , , , , , , , , , , ,2, , , , , ,2,2, , , , ,3, , ,3, , ,3, , , , , ,2, , , , , , , , , , ,2,2, , , , , , ,6, , ,6, , , , , , , , , , ,6,6, , ,6, , , , , , , , , , , , ,2,2,2,3, , , , , , , , , , , , ,6,6,6,6,6,6],
                       [ , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,5, , , , , , , ,4, , , , , , , , , , ,4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,6,6, , ,6,6, , , , , , , , ,6,6,6, , ,6,6, , , , , , , , , , , , , , , , , , , , , , , , , , ,6,6,6,6,6,6,6],
                       [ , , , , , , , , , , , , , , , , , , , , , , , , , , , ,5, , , , , , , , , ,4, , , , , , , ,4, , , , , , , , , , ,4, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,6,6,6, , ,6,6,6, , , , , , ,6,6,6,6, , ,6,6,6, , , , , ,5, , , , , , , , , , , , , , , ,5, , ,6,6,6,6,6,6,6,6],
                       [ , , , , , , , , , , ,7,8,8,8,9, , , , , , , ,7,8,9, , ,4, , , , , , , , , ,4, , ,7,8,8,9, ,4, , , , , , , , , , ,4, ,7,8,8,8,9, , , , , , , ,7,8,9, , , , , , , , , , , , , , , ,7,8,8,9, , , , , , , , , , , , , , ,7,8,8,8,9, , , , , , , , , , , , , , , , , , , , , , ,6,6,6,6,8,8,6,6,6,6, , , , ,6,6,6,6,6, , ,6,6,6,6,9, , , ,4, , , ,7,8,9, , , , , , , , , ,4, ,6,6,6,6,6,6,6,6,6],
                       [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, , ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, , , ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, , ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                       [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, , ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, , , ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,,1,1,1,1,1,1,1,1,,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]], [new TerrainPatch([[1,1],
              [1,1]])], new Vector());
leTestScene.appendChild(TERRAIN);
//camera, surroundingImage, position, dimensions, angle
leTestScene.appendChild(new CameraDisplayObject(CAMERAQ, new Image("icon"), new  Vector(150, 250), new Vector(100, 100), 0));
//leTestScene.appendChild(new DrawableGameObject(new Image("Icon"), new  Vector(0, 0), new Vector(100, 100), 0));

leTestScene.appendChild(new DrawableGameObject(new Sprite("Icon", new Vector(0,0), new Vector(16, 16)), new  Vector(0, 0), new Vector(100, 100), 0));

leTestScene.appendChild(Play);


var leGameObject = new GameObject();
leGameObject.collider = new Crash.Box(new Vector(), 100, 100, true, leGameObject);

var go = new GameObject();
go.collider = new Crash.Box(new Vector(), 100, 100, true, leGameObject);

events.on("collision", function(a, b, res, cancel) {
  console.log("collision:", a, b, res);
  a.moveBy(res.overlapV.clone().reverse());
});

events.on("loop:update", function() {
  
});


input.mapKey(38, "up").mapKey(40, "down").mapKey(37, "left").mapKey(39, "right").mapKey(76, "+").mapKey(77, "-").mapKey(81, "Q").mapKey(83, "S").mapKey(68, "D").mapKey(90, "Z").mapKey(88, "X").mapKey(87, "W").mapKey(66, "B").mapKey(78, "N");

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