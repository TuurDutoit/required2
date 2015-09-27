var events = require("events");

var getArgs = function(args) {
  return Array.prototype.slice.call(args, 1);
}


events.on("object:init", function(object) {
  if(object.onInit) {
    object.onInit(getArgs(arguments));
  }
});

events.on("object:destroy", function(object) {
  if(object.onDestroy) {
    object.onDestroy(getArgs(arguments));
  }
});

events.on("object:move", function(object) {
  if(object.onMove) {
    object.onMove(getArgs(arguments));
  }
});

events.on("object:rotate", function(object) {
  if(object.onRotate) {
    object.onRotate(getArgs(arguments));
  }
});

events.on("object:change", function(object) {
  if(object.onChange) {
    object.onChange(getArgs(arguments));
  }
});

events.on("object:insert", function(object) {
  if(object.onInsert) {
    object.onInsert(getArgs(arguments));
  }
});

events.on("object:remove", function(object) {
  if(object.onRemove) {
    object.onRemove(getArgs(arguments));
  }
});

events.on("object:appear", function(object) {
  if(object.onAppear) {
    object.onAppear(getArgs(arguments));
  }
});

events.on("object:disappear", function(object) {
  if(object.onDisappear) {
    object.onDisappear(getArgs(arguments));
  }
});