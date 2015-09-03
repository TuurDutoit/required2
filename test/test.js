events = require("../events");
var loop-draw = require("../loop");
var loop-update = requite("../loop-update");
var Game = {
    start: function(){
        loop-draw.start(),
        loop-update.start()
    }
}