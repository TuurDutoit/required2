(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var AI = function(list) {
  this.list = list;
  this.dominant = null;

  return this;
}

AI.prototype.addAIComponent = function(component) {
  this.list.push(component);
}

AI.prototype.makeDominant = function(component) {
  this.dominant = component;
}

AI.prototype.removeDominant = function() {
  this.dominant = null;
}

AI.prototype.update = function(gameObject) {
  if(this.dominant){
    this.dominant.update(gameObject, this);
  }
  else{
    for(i = 0; i < this.list.length; i++) {
      this.list[i].update(gameObject, this);   
    }
  }
}
   


module.exports = AI;
},{}],2:[function(require,module,exports){
var AIComponent = function(update) {
  this.update = update;

  return this;
}

    
module.exports = AIComponent;
},{}],3:[function(require,module,exports){
var clock = require("../clock");

var requestAnimationFrame = window.requestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame;

if(! requestAnimationFrame) {
  var vendors = ["ms", "moz", "webkit", "o"];
  for(var i = 0, len = vendors.length; i < len && !requestAnimationFrame; i++) {
    requestAnimationFrame = window[vendors[i]+'RequestAnimationFrame'];
    cancelAnimationFrame = window[vendors[i]+'CancelAnimationFrame'] 
                               || window[vendors[i]+'CancelRequestAnimationFrame'];
  }
  
  
  if(! requestAnimationFrame) {
    var lastTime = 0;
    requestAnimationFrame = function(callback, element) {
      var currTime = clock.now();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = setTimeout(function() { callback(currTime + timeToCall); }, 
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    }
    cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
}


module.exports = {
  request: function(cb) {
    requestAnimationFrame.call(window, cb);
  },
  cancel: function(id) {
    cancelAnimationFrame.call(window, id);
  }
}
},{"../clock":5}],4:[function(require,module,exports){
var Vector = require("../vector");
var renderer= require("../renderer");

var Camera = function(obj, dimensions, rotation, displayPosition, displayDimension, displayRotation, zoom){
  this.active = true;
  this.displaying = false;
  this.position = obj.position;
  this.dimensions = dimensions;
  this.rotation = rotation;
  this.displayPosition = displayPosition;
  this.displayDimension = displayDimension;
  this.displayRotation = displayRotation;
  this.zoom = zoom;
  this.offset = new Vector(0,0);

  return this;
}

Camera.prototype.update = function() {
  
}

Camera.prototype.draw = function() {
  
}

Camera.prototype.activate = function() {
  //Turns Camera On
  if(this.active) {
    console.log("This camera is already active!");
  }
  else {        
    this.active = true;
  }
}

Camera.prototype.deactivate = function() {
  //Turns Camera Off
  if(!this.active) {
    console.log("This camera is already inactive!");
  }
  else {        
    this.active = false;
  }
}

//Camera.prototype.changeScene
Camera.prototype.linkTo = function(obj) {
  //Links Camera to gameObject
  this.position = obj.position;
}

Camera.prototype.reset  = function() {
  //Resets Camera offset to (0,0)
  this.offset.reset();
}

Camera.prototype.setOffset = function(offset) {
  this.offset = offset;
}

Camera.prototype.move = function(V) {
  this.offset.add(V);
}

Camera.prototype.setRotation = function(rotation) {
  this.rotation = rotation;
}

Camera.prototype.rotate = function(angle) {
  this.rotation += angle;
}

Camera.prototype.zoom = function(toZoom) {
  if(toZoom >= 0){
    this.zoom *= toZoom;
  }
  else{
    console.log("Invalid zoom!");
  }
}

Camera.prototype.setZoom = function(toZoom) {
  if(toZoom >= 0) {
    this.zoom = toZoom;
  }
  else {
    console.log("Invalid zoom!");
  }
}

Camera.prototype.isObjectVisible = function(obj) {
  if((obj.position.x + obj.dimensions.x >= this.position.x) && (obj.position.y + obj.dimensions.y >= this.position.y) && (obj.position.x <= this.position.x + this.dimensions.x) && (obj.position.y <= this.position.y + this.dimensions.y)) {
    return true;
  }
  else {
    return false;
  }
}

Camera.prototype.drawScene = function(scene) {
  //Draws the visible scene
  if(this.active){
    if(this.position.x - this.dimensions.x < 0){
      this.position = this.dimensions.x;
    }
    if(this.position.y - this.dimensions.y < 0){
      this.position = this.dimensions.y;
    }
    if(this.displaying){
      //Draw Camera
    }
  }
}

Camera.prototype.drawOnScreen = function(image, position, dimensions, rotation) {
  image.draw(position, dimensions, rotation);
}



module.exports = Camera;
},{"../renderer":17,"../vector":21}],5:[function(require,module,exports){
var events = require("../events");

var lastUpdateTime;
var lastDrawTime;


var Clock = {
  timeout: function(cb, time) {
    setTimeout(cb, time);
  },
  now: (function() {
    if("performance" in window) {
      return function() {return performance.now();}
    }
    else if("webkitPerformance" in window) {
      return function() {return webkitPerformance.now();}
    }
    else if("now" in Date) {
      return function() {return Date.now();}
    }
    else {
      return function() {return new Date();}
    }
  })(),
  deltaTime: {},
}



var Timer = function(start) {
  this.time = 0;
  this.startTime = 0;
  this.running = false;
  this.started = false;
  this.stopped = false;
  
  if(start) {
    this.start();
  }
}

Timer.prototype.start = function() {
  if(!this.running && !this.stopped) {
    this.startTime = Clock.now();
    this.running = true;
    this.started = true;
  }
  
  return this;
}

Timer.prototype.pause = function() {
  if(this.running && !this.stopped) {
    this.time += Clock.now() - this.startTime;
    this.running = false;
  }
  
  return this;
}

Timer.prototype.stop = function() {
  if(!this.stopped) {
    if(this.running) {
      this.time += Clock.now() - this.startTime;
      this.running = false;
    }
    this.stopped = true;
  }
  
  return this;
}

Clock.Timer = Timer;

Clock.timer = function() {
  return new Timer(true);
}






events.on("loop:update:start", function() {
  lastUpdateTime = Clock.now();
});

events.on("loop:draw:start", function() {
  lastDrawTime = Clock.now();
});

events.on("loop:update", function() {
  Clock.time = Clock.now();
  Clock.deltaTime.update = Clock.time - lastUpdateTime;
});

events.on("loop:draw", function() {
  Clock.time = Clock.now();
  Clock.deltaTime.draw = Clock.time - lastDrawTime;
});



module.exports = Clock;
},{"../events":10}],6:[function(require,module,exports){
// Crash
// Version 1.1.0 - Copyright 2015 - Tuur Dutoit <me@tuurdutoit.be>
//
// Released under the MIT License - https://github.com/TuurDutoit/crash
//
// Crash performs optimized 2D collisions, powered by RBush and SAT.js, written in javascript.


// Create a UMD wrapper for Crash. Works in:
//
//  - Plain browser via global Crash variable
//  - AMD loader (like require.js)
//  - Node.js

(function(factory) {
    "use strict";
    
    if(typeof define === "function" && define["amd"]) {
        define(["RBush","SAT"], factory);
    }
    else if(typeof exports === "object") {
        module.exports = factory(require("rbush"), require("sat"));
    }
    else {
        window.Crash = factory(window.rbush, window.SAT);
    }
    
}(function(RBush, SAT) {
    "use strict";
    

    
    
    
    
    
    
    
    /*************
     * EXPORTS   *
     * UTILITIES *
     *************/
    
    
    var exports = {
        RBush:       RBush,
        SAT:         SAT,
        Vector:      SAT.Vector,
        V:           SAT.Vector,
        Response:    SAT.Response,
        rbush:       null,
        RESPONSE:    new SAT.Response(),
        BREAK:       false,
        MAX_CHECKS:   100,
        OVERLAP_LIMIT: 0.5,
        __listeners: [],
        __notYetInserted: [],
        __moved: []
    }
    
    
    
    
    
    exports.extend = function(child, base) {
        child.prototype = Object.create(base.prototype, {
            constructor: {
                value: child,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
    }
    
    exports.reset = function(maxEntries) {
        this.clear();
        this.__listeners = [];
        this.BREAK = false;
        this.MAX_CHECKS = 100;
        this.OVERLAP_LIMIT = 0.5;
        this.RESPONSE.clear();
        this.init(maxEntries);
        
        return this;
    }
    
    exports.onCollision = function(listener) {
        this.__listeners.push(listener);
        
        return this;
    }
    
    exports.offCollision = function(listener) {
        var index = this.__listeners.indexOf(listener);
        if(index > -1) {
            this.__listeners.splice(index, 1);
        }
        
        return this;
    }
    
    exports.__onCollision = function(a, b, res) {
        for(var i = 0, len = this.__listeners.length; i < len; i++) {
            this.__listeners[i].call(this, a, b, res, this.cancel);
        }
        
        return this;
    }
    
    exports.cancel = function() {
        this.BREAK = true;
        return false;
    }
    
    exports.getTestString = function(type1, type2) {
        return type1 === "circle" ? (
            type2 === "circle" ? "testCircleCircle" : "testCirclePolygon"
        ) : (
            type2 === "circle" ? "testPolygonCircle" : "testPolygonPolygon"
        )
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /***********
     * EXPORTS *
     * METHODS *
     ***********/
    
    
    exports.init = function(maxEntries) {
        this.rbush = new RBush((maxEntries || 9), [".aabb.x1", ".aabb.y1", ".aabb.x2", ".aabb.y2"]);
        
        for(var i = 0, len = this.__notYetInserted.length; i < len; i++) {
            this.rbush.insert(this.__notYetInserted.pop());
        }
        
        return this;
    }
    
    
    exports.insert = function(collider) {
        if(this.rbush) {
            this.rbush.insert(collider);
        }
        else {
            this.__notYetInserted.push(collider);
        }
        
        return this;
    }
    
    exports.remove = function(collider) {
        if(this.rbush) {
            this.rbush.remove(collider);
        }
        else {
            var index = this.__notYetInserted.indexOf(collider);
            if(index > -1) {
                this.__notYetInserted.splice(index, 1);
            }
        }
        
        return this;
    }
    
    exports.all = function() {
        return this.rbush ? this.rbush.all() : this.__notYetInserted;
    }
    
    var SEARCH_ARRAY = [];
    exports.search = function(collider) {
        if(this.rbush) {
            SEARCH_ARRAY[0] = collider.aabb.x1;
            SEARCH_ARRAY[1] = collider.aabb.y1;
            SEARCH_ARRAY[2] = collider.aabb.x2;
            SEARCH_ARRAY[3] = collider.aabb.y2;
            var res = this.rbush.search(SEARCH_ARRAY);
            var index = res.indexOf(collider);
            if(index > -1) {
                res.splice(index, 1);
            }
            
            return res;
        }
        else {
            return [];
        }
    }
    
    exports.clear = function() {
        if(this.rbush) {
            this.rbush.clear();
        }
        this.__moved = [];
        this.__notYetInserted = [];
        
        return this;
    }
    
    
    exports.addToMoved = function(collider) {
        if(this.__moved.indexOf(collider) === -1) {
            this.__moved.push(collider);
        }
        
        return this;
    }
    
    exports.update = function(collider) {
        this.updateAABB(collider);
        this.remove(collider);
        this.insert(collider);
        
        return this;
    }
    
    exports.moved = function(collider) {
        this.update(collider);
        this.addToMoved(collider);
        
        return this;
    }

    
    
    
    
    
    
    
    
    
    
    /****************
    * AABB UPDATES *
    ****************/
    
    
    exports.updateAABB = function(collider) {
        switch(collider.type) {
            case "polygon":
                return exports.updateAABBPolygon(collider);
                break;
            case "box":
                return exports.updateAABBBox(collider);
                break;
            case "circle":
                return exports.updateAABBCircle(collider);
                break;
            case "point":
                return exports.updateAABBPoint(collider);
                break;
        }
    }
    
    exports.updateAABBPolygon = function(collider) {
        var aabb = collider.aabb;
        var pos = collider.sat.pos;
        var points = collider.sat.calcPoints;
        var len = points.length;
        var xMin = points[0].x;
        var yMin = points[0].y;
        var xMax = points[0].x;
        var yMax = points[0].y;
        for (var i = 1; i < len; i++) {
            var point = points[i];
            if (point.x < xMin) {
                xMin = point.x;
            }
            else if (point.x > xMax) {
                xMax = point.x;
            }
            if (point.y < yMin) {
                yMin = point.y;
            }
            else if (point.y > yMax) {
                yMax = point.y;
            }
        }
        
        aabb.x1 = pos.x + xMin;
        aabb.y1 = pos.y + yMin;
        aabb.x2 = pos.x + xMax;
        aabb.y2 = pos.y + yMax;
    }
    
    exports.updateAABBBox = function(collider) {
        var points = collider.sat.calcPoints;
        var aabb = collider.aabb;
        
        aabb.x1 = points[0].x;
        aabb.y1 = points[0].y;
        aabb.x2 = points[2].x;
        aabb.y2 = points[2].y;
    }
    
    exports.updateAABBCircle = function(collider) {
        var aabb = collider.aabb;
        var r = collider.sat.r;
        var center = collider.sat.pos;

        aabb.x1 = center.x - r;
        aabb.y1 = center.y - r;
        aabb.x2 = center.x + r;
        aabb.y2 = center.y + r;
    }
    
    exports.updateAABBPoint = function(collider) {
        var aabb = collider.aabb;
        var pos = collider.sat.pos;
        
        aabb.x1 = aabb.x2 = pos.x;
        aabb.y1 = aabb.y2 = pos.x;
    }
    
    
    
    
    
    
    
    
    /*********
     * TESTS *
     *********/
    
    exports.test = function(a, b, res) {
        var res = res || this.RESPONSE;
        var str = this.getTestString(a.type, b.type);
        
        res.clear();
        return SAT[str](a.sat, b.sat, res);
    }
    
    
    exports.testAll = function(a, res) {
        var res = res || this.RESPONSE;
        var possible = this.search(a);
        
        loop:
        for(var i = 0, len = possible.length; i < len; i++) {
            var b = possible[i];
            var str = this.getTestString(a.type, b.type);
            res.clear();
            
            if(SAT[str](a.sat, b.sat, res)) {
                // Fix collisions with infinitely small overlaps causing way too many loops
                if( (this.OVERLAP_LIMIT && Math.abs(res.overlap) > this.OVERLAP_LIMIT) || !this.OVERLAP_LIMIT) {
                    this.__onCollision(a, b, res);
                    if(this.BREAK) {
                        break loop;
                    }
                }
            }
        }
        
        a.lastPos.copy(a.pos);
        
        var cancelled = this.BREAK;
        this.BREAK = false;
        
        return !cancelled;
    }
    
    
    var ALL_MOVED = []; // holds all the colliders that have moved during check(), so we can set their lastCheckedPos
    exports.check = function(res) {
        var i = 0;
        while(this.__moved.length && i < this.MAX_CHECKS) {
            var collider = this.__moved.pop();
            var index = ALL_MOVED.indexOf(collider);
            if(index === -1) {
                ALL_MOVED.push(collider);
            }
            
            this.testAll(collider, res);
            i++;
        }
        
        for(var i = 0, len = ALL_MOVED.length; i < len; i++) {
            ALL_MOVED[i].lastCheckedPos.copy(ALL_MOVED[i].pos);
        }
        ALL_MOVED.splice(0, ALL_MOVED.length);
        
        return this;
    }
    
    exports.checkAll = function(res) {
        var all = this.all();
        for(var i = 0, len = all.length; i < len; i++) {
            this.testAll(all[i], res);
        }
        this.check(res);
        
        return this;
    }
    
    
    
    
    
    
    
    
    /***********
     * CLASSES *
     ***********/
    
    var Collider = exports.Collider = function Collider(type, sat, insert, data) {
        this.type = type;
        this.sat = sat;
        this.data = data;
        this.pos = this.sat.pos;
        this.lastPos = this.pos.clone();
        this.lastCheckedPos = this.pos.clone();
        this.aabb = {};
        
        exports.updateAABB(this);
        
        if(insert) {
            exports.insert(this);
        }
        
        return this;
    }
    
    Collider.prototype.insert = function() {
        exports.insert(this);
        
        return this;
    }
    
    Collider.prototype.remove = function() {
        exports.remove(this);
        
        return this;
    }
    
    Collider.prototype.update = function() {
        exports.update(this);
        
        return this;
    }
    
    Collider.prototype.updateAABB = function() {
        exports.updateAABB(this);
        
        return this;
    }
    
    Collider.prototype.moved = function() {
        exports.moved(this);
        
        return this;
    }
    
    Collider.prototype.search = function() {
        return exports.search(this);
    }
    
    Collider.prototype.setData = function(data) {
        this.data = data;
        
        return this;
    }
    
    Collider.prototype.getData = function() {
        return this.data;
    }
    
    Collider.prototype.moveTo = function(x, y) {
        this.sat.pos.x = x;
        this.sat.pos.y = y;
        this.moved();
        
        return this;
    }
    
    Collider.prototype.moveBy = Collider.prototype.move = function(x, y) {
        this.sat.pos.x += x;
        this.sat.pos.y += y;
        this.moved();
        
        return this;
    }
    
    
    
    
    
    
    var Polygon = exports.Polygon = function Polygon(pos, points, insert, data) {
        var sat = new SAT.Polygon(pos, points);
        Collider.call(this, "polygon", sat, insert, data);
        
        return this;
    }
    
    exports.extend(Polygon, Collider);
    
    Polygon.prototype.setPoints = function(points) {
        this.sat.setPoints(points);
        this.moved();
        
        return this;
    }
    
    Polygon.prototype.setAngle = function(angle) {
        this.sat.setAngle(angle);
        this.moved();
        
        return this;
    }
    
    Polygon.prototype.setOffset = function(offset) {
        this.sat.setOffset(offset);
        this.moved();
        
        return this;
    }
    
    Polygon.prototype.rotate = function(angle) {
        this.sat.rotate(angle);
        this.moved();
        
        return this;
    }
    
    
    
    
    var Circle = exports.Circle = function Circle(pos, r, insert, data) {
        var sat = new SAT.Circle(pos, r);
        Collider.call(this, "circle", sat, insert, data);
        
        return this;
    }
    
    exports.extend(Circle, Collider);
    
    
    
    
    
    var Point = exports.Point = function Point(pos, insert, data) {
        var sat = (new SAT.Box(pos, 1, 1)).toPolygon();
        Collider.call(this, "point", sat, insert, data);
        
        return this;
    }
    
    exports.extend(Point, Collider);
    
    
    
    
    
    var Box = exports.Box = function Box(pos, w, h, insert, data) {
        var sat = (new SAT.Box(pos, w, h)).toPolygon();
        Collider.call(this, "box", sat, insert, data);
        
        return this;
    }
    
    exports.extend(Box, Collider);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    return exports;
    
    
    
    
    
}));
},{"rbush":15,"sat":16}],7:[function(require,module,exports){
module.exports = require("./crash");
},{"./crash":6}],8:[function(require,module,exports){
var Vector = require("../vector");


var canvas = document.createElement('canvas');
canvas.width   = 300;
canvas.height  = 300;
var context	   = canvas.getContext("2d"); 

module.exports = {
  canvasDimensions: function(){
    return new Vector(canvas.width, canvas.height);
  },
  changeCanvasDimensions: function(D){
    canvas.width = D.x;
    canvas.height= D.y;
  },
  clearCanvas: function(){
    context.clearRect(0, 0, canvas.width, canvas.height);  
  },
  drawImage: function(image, position, dimensions, rotation){
    context.drawImage(image, position.x, canvas.height - position.y, dimensions.x, dimensions.y);
  },
  drawSprite: function(image, sheetPosition, sheetDimensions, position, dimensions, rotation){
    context.drawImage(image, sheetPosition.x, sheetPosition.y, sheetDimensions.x, sheetDimensions.y, position.x, canvas.height - position.y, dimensions.x, dimensions.y);
  },
  drawRectangle: function(position, dimensions){
    context.fillRect(position.x, canvas.height - position.y - dimensions.y,dimensions.x,dimensions.y);
  },
  DOMElement: canvas
};
},{"../vector":21}],9:[function(require,module,exports){
var EventEmitter = function() {
  this._eventemitter = {
    events: {},
    proxies: []
  }
}


EventEmitter.prototype.on = function(event, listener, context) {
  var listeners = this._eventemitter.events[event];
  listener.__context__ = context || null;
  if(! listeners) {
    var listeners = this._eventemitter.events[event] = [];
  }
  listeners.push(listener);
  
  return this;
}


EventEmitter.prototype.once = function(event, listener, context) {
  var self = this;
  var cb = function() {
    listener.apply(this, arguments);
    self.off(event, cb);
  }
  this.on(event, cb, context);
  
  return this;
}


EventEmitter.prototype.many = function(event, listener, amount, context) {
  var self = this;
  var count = 0;
  var cb = function() {
    listener.apply(this, arguments);
    count++;
    if(count === amount) {
      self.off(event, cb);
    }
  }
  this.on(event, cb, context);
  
  return this;
}


EventEmitter.prototype.off = function(event, listener) {
  var listeners = this._eventemitter.events[event];
  if(listeners) {
    if(listener) {
      var index = listeners.indexOf(listener);
      if(index !== -1) {
        listeners.splice(index, 1);
      }
    }
    else {
      listeners.length = 0;
    }
  }
  
  return this;
}


EventEmitter.prototype.emit = function(event, args) {
  var listeners = this._eventemitter.events[event];
  if(listeners) {
    for(var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener.apply(listener.__context__ || null, args);
    }
  }
  
  var proxies = this._eventemitter.proxies;
  for(var i = 0, len = proxies.length; i < len; i++) {
    var proxy = proxies[i];
    proxy.exec(this, proxy.other, event, args);
  }
  
  return this;
}


EventEmitter.prototype.listeners = function(event) {
  return this._eventemitter.events[event] || [];
}


EventEmitter.prototype.count = function(event) {
  return this.listeners(event).length;
}


EventEmitter.prototype.pipe = function(other, exec) {
  if(typeof exec === "string") {
    var exec = createPrefixedExec(exec);
  }
  else if(typeof exec !== "function") {
    var exec = defaultExec;
  }
  
  this._eventemitter.proxies.push({other: other, exec: exec});
  
  return this;
}


EventEmitter.prototype.pipeFrom = function(other, exec) {
  other.pipe(this, exec);
  
  return this;
}


EventEmitter.prototype.proxy = function(other, execPush, execFrom) {
  this.pipe(other, execPush);
  other.pipe(this, execFrom || execPush);
  
  return this;
}







function defaultExec(self, other, event, args) {
  other.emit(event, args);
}


function createPrefixedExec(prefix) {
  return function(self, other, event, args) {
    other.emit(prefix+event, args);
  }
}






module.exports = EventEmitter;
},{}],10:[function(require,module,exports){
var EventEmitter = require("../event-emitter");

module.exports = new EventEmitter();
},{"../event-emitter":9}],11:[function(require,module,exports){
var renderer = require("../renderer");


var gameObject = function(name, type, image, position, dimensions, depth, children, AI){
  this.name = name;
  this.type = type;
  this.image = image;
  this.position = position;
  this.dimensions = dimensions;
  this.depth = depth;
  this.children = children;
  this.AI = AI;

  return this;
}

gameObject.prototype.start = function() {
  
}

gameObject.prototype.fixedUpdate = function() {
  //this.image.update();
  //this.AI.update(this);
  return this;
}

gameObject.prototype.addChild = function(name, child){
  if(this.children[name]){
    console.log("Space already occupied.");
  }
  else{
    this.children[name] = child;
  }
}

gameObject.prototype.update = function() {
  
}

gameObject.prototype.draw   = function() {
  renderer.drawRectangle(this.position, this.dimensions);
}

gameObject.prototype.move = function(V) {
  this.position.add(V);
  
  return this;
}

gameObject.prototype.distanceToGameObject = function(obj) {
  return this.position.getDistanceTo(obj.position);
}

gameObject.prototype.distanceToGameObjectCubed = function(obj) {
  return this.position.getDistanceToCubed(obj.position);
}



module.exports = gameObject;
},{"../renderer":17}],12:[function(require,module,exports){
var EventEmitter = require("../event-emitter");
var events = require("../events");
var clock = require("../clock");
var animationFrame = require("../animation-frame");

var staticFps = false;
var fps;
var timeoutTime;
var timer;
var timerIsRAF;


var mod = new EventEmitter();
mod.pipe(events, function(self, other, event, args) {
  var e = event === "draw" ? "loop:draw" : "loop:draw:" + event;
  other.emit(e, args);
});


var timeout = function() {
  if(staticFps) {
    timer = clock.timeout(loop, timeoutTime);
    timerIsRAF = false;
  }
  else {
    timer = animationFrame.request(loop);
    timerIsRAF = true;
  }
}

var clearTimeout = function() {
  if(timerIsRAF) {
    animationFrame.cancel(timer);
  }
  else {
    clock.clearTimeout(timer);
  }
}





var loop = function() {
  mod.emit("draw");
  timeout();
}

var start = function() {
  mod.emit("start");
  loop();
}

var pause = function() {
  mod.emit("pause");
  clearTimeout();
}

var stop = function() {
  mod.emit("stop");
  clearTimeout();
}

var setFps = function(val) {
  if(val === undefined) {
    return fps;
  }
  else if(typeof fps === "number") {
    fps = val;
    timeoutTime = 1000 / fps;
    staticFps = true;
    mod.emit("fps", [true, val]);
  }
  else {
    staticFps = false;
    mod.emit("fps", [false, val]);
  }
}



mod.start = start;
mod.pause = pause;
mod.stop = stop;
mod.setFps = setFps;


module.exports = mod;
},{"../animation-frame":3,"../clock":5,"../event-emitter":9,"../events":10}],13:[function(require,module,exports){
var EventEmitter = require("../event-emitter");
var events = require("../events");
var clock = require("../clock");
var animationFrame = require("../animation-frame");

var fps = 60;
var timeoutTime = 1000 / fps;
var staticFps = true;
var timer;
var timerIsRAF;


var mod = new EventEmitter();
mod.pipe(events, function(self, other, event, args) {
  var e = event === "update" ? "loop:update" : "loop:update:" + event;
  other.emit(e, args);
});


var timeout = function() {
  if(staticFps) {
    timer = clock.timeout(loop, timeoutTime);
    timerIsRAF = false;
  }
  else {
    timer = animationFrame.request(loop);
    timerIsRAF = true;
  }
}

var clearTimeout = function() {
  if(timerIsRAF) {
    animationFrame.cancel(timer);
  }
  else {
    clock.clearTimeout(timer);
  }
}





var loop = function() {
  mod.emit("update");
  timeout();
}

var start = function() {
  mod.emit("start");
  loop();
}

var pause = function() {
  mod.emit("pause");
  clearTimeout();
}

var stop = function() {
  mod.emit("stop");
  clearTimeout();
}

var setFps = function(val) {
  if(val === undefined) {
    return fps;
  }
  else if(typeof fps === "number") {
    fps = val;
    timeoutTime = 1000 / fps;
    staticFps = true;
    mod.emit("fps", [true, val]);
  }
  else {
    staticFps = false;
    mod.emit("fps", [false, val]);
  }
}



mod.start = start;
mod.pause = pause;
mod.stop = stop;
mod.setFps = setFps;


module.exports = mod;
},{"../animation-frame":3,"../clock":5,"../event-emitter":9,"../events":10}],14:[function(require,module,exports){
var updateLoop = require("../loop-update");
var drawLoop = require("../loop-draw");

module.exports = {
  start: function() {
    updateLoop.start();
    drawLoop.start();
  },
  pause: function() {
    updateLoop.pause();
    drawLoop.pause();
  },
  stop: function() {
    updateLoop.stop();
    drawLoop.stop();
  },
  updateFps: function(val) {
    updateLoop.fps(val);
  },
  drawFps: function(val) {
    drawLoop.fps(val);
  }
}
},{"../loop-draw":12,"../loop-update":13}],15:[function(require,module,exports){
/*
 (c) 2013, Vladimir Agafonkin
 RBush, a JavaScript library for high-performance 2D spatial indexing of points and rectangles.
 https://github.com/mourner/rbush
*/

(function () { 'use strict';

function rbush(maxEntries, format) {

    // jshint newcap: false, validthis: true
    if (!(this instanceof rbush)) return new rbush(maxEntries, format);

    // max entries in a node is 9 by default; min node fill is 40% for best performance
    this._maxEntries = Math.max(4, maxEntries || 9);
    this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4));

    if (format) {
        this._initFormat(format);
    }

    this.clear();
}

rbush.prototype = {

    all: function () {
        return this._all(this.data, []);
    },

    search: function (bbox) {

        var node = this.data,
            result = [],
            toBBox = this.toBBox;

        if (!intersects(bbox, node.bbox)) return result;

        var nodesToSearch = [],
            i, len, child, childBBox;

        while (node) {
            for (i = 0, len = node.children.length; i < len; i++) {

                child = node.children[i];
                childBBox = node.leaf ? toBBox(child) : child.bbox;

                if (intersects(bbox, childBBox)) {
                    if (node.leaf) result.push(child);
                    else if (contains(bbox, childBBox)) this._all(child, result);
                    else nodesToSearch.push(child);
                }
            }
            node = nodesToSearch.pop();
        }

        return result;
    },

    collides: function (bbox) {

        var node = this.data,
            toBBox = this.toBBox;

        if (!intersects(bbox, node.bbox)) return false;

        var nodesToSearch = [],
            i, len, child, childBBox;

        while (node) {
            for (i = 0, len = node.children.length; i < len; i++) {

                child = node.children[i];
                childBBox = node.leaf ? toBBox(child) : child.bbox;

                if (intersects(bbox, childBBox)) {
                    if (node.leaf || contains(bbox, childBBox)) return true;
                    nodesToSearch.push(child);
                }
            }
            node = nodesToSearch.pop();
        }

        return false;
    },

    load: function (data) {
        if (!(data && data.length)) return this;

        if (data.length < this._minEntries) {
            for (var i = 0, len = data.length; i < len; i++) {
                this.insert(data[i]);
            }
            return this;
        }

        // recursively build the tree with the given data from stratch using OMT algorithm
        var node = this._build(data.slice(), 0, data.length - 1, 0);

        if (!this.data.children.length) {
            // save as is if tree is empty
            this.data = node;

        } else if (this.data.height === node.height) {
            // split root if trees have the same height
            this._splitRoot(this.data, node);

        } else {
            if (this.data.height < node.height) {
                // swap trees if inserted one is bigger
                var tmpNode = this.data;
                this.data = node;
                node = tmpNode;
            }

            // insert the small tree into the large tree at appropriate level
            this._insert(node, this.data.height - node.height - 1, true);
        }

        return this;
    },

    insert: function (item) {
        if (item) this._insert(item, this.data.height - 1);
        return this;
    },

    clear: function () {
        this.data = {
            children: [],
            height: 1,
            bbox: empty(),
            leaf: true
        };
        return this;
    },

    remove: function (item) {
        if (!item) return this;

        var node = this.data,
            bbox = this.toBBox(item),
            path = [],
            indexes = [],
            i, parent, index, goingUp;

        // depth-first iterative tree traversal
        while (node || path.length) {

            if (!node) { // go up
                node = path.pop();
                parent = path[path.length - 1];
                i = indexes.pop();
                goingUp = true;
            }

            if (node.leaf) { // check current node
                index = node.children.indexOf(item);

                if (index !== -1) {
                    // item found, remove the item and condense tree upwards
                    node.children.splice(index, 1);
                    path.push(node);
                    this._condense(path);
                    return this;
                }
            }

            if (!goingUp && !node.leaf && contains(node.bbox, bbox)) { // go down
                path.push(node);
                indexes.push(i);
                i = 0;
                parent = node;
                node = node.children[0];

            } else if (parent) { // go right
                i++;
                node = parent.children[i];
                goingUp = false;

            } else node = null; // nothing found
        }

        return this;
    },

    toBBox: function (item) { return item; },

    compareMinX: function (a, b) { return a[0] - b[0]; },
    compareMinY: function (a, b) { return a[1] - b[1]; },

    toJSON: function () { return this.data; },

    fromJSON: function (data) {
        this.data = data;
        return this;
    },

    _all: function (node, result) {
        var nodesToSearch = [];
        while (node) {
            if (node.leaf) result.push.apply(result, node.children);
            else nodesToSearch.push.apply(nodesToSearch, node.children);

            node = nodesToSearch.pop();
        }
        return result;
    },

    _build: function (items, left, right, height) {

        var N = right - left + 1,
            M = this._maxEntries,
            node;

        if (N <= M) {
            // reached leaf level; return leaf
            node = {
                children: items.slice(left, right + 1),
                height: 1,
                bbox: null,
                leaf: true
            };
            calcBBox(node, this.toBBox);
            return node;
        }

        if (!height) {
            // target height of the bulk-loaded tree
            height = Math.ceil(Math.log(N) / Math.log(M));

            // target number of root entries to maximize storage utilization
            M = Math.ceil(N / Math.pow(M, height - 1));
        }

        // TODO eliminate recursion?

        node = {
            children: [],
            height: height,
            bbox: null
        };

        // split the items into M mostly square tiles

        var N2 = Math.ceil(N / M),
            N1 = N2 * Math.ceil(Math.sqrt(M)),
            i, j, right2, right3;

        multiSelect(items, left, right, N1, this.compareMinX);

        for (i = left; i <= right; i += N1) {

            right2 = Math.min(i + N1 - 1, right);

            multiSelect(items, i, right2, N2, this.compareMinY);

            for (j = i; j <= right2; j += N2) {

                right3 = Math.min(j + N2 - 1, right2);

                // pack each entry recursively
                node.children.push(this._build(items, j, right3, height - 1));
            }
        }

        calcBBox(node, this.toBBox);

        return node;
    },

    _chooseSubtree: function (bbox, node, level, path) {

        var i, len, child, targetNode, area, enlargement, minArea, minEnlargement;

        while (true) {
            path.push(node);

            if (node.leaf || path.length - 1 === level) break;

            minArea = minEnlargement = Infinity;

            for (i = 0, len = node.children.length; i < len; i++) {
                child = node.children[i];
                area = bboxArea(child.bbox);
                enlargement = enlargedArea(bbox, child.bbox) - area;

                // choose entry with the least area enlargement
                if (enlargement < minEnlargement) {
                    minEnlargement = enlargement;
                    minArea = area < minArea ? area : minArea;
                    targetNode = child;

                } else if (enlargement === minEnlargement) {
                    // otherwise choose one with the smallest area
                    if (area < minArea) {
                        minArea = area;
                        targetNode = child;
                    }
                }
            }

            node = targetNode;
        }

        return node;
    },

    _insert: function (item, level, isNode) {

        var toBBox = this.toBBox,
            bbox = isNode ? item.bbox : toBBox(item),
            insertPath = [];

        // find the best node for accommodating the item, saving all nodes along the path too
        var node = this._chooseSubtree(bbox, this.data, level, insertPath);

        // put the item into the node
        node.children.push(item);
        extend(node.bbox, bbox);

        // split on node overflow; propagate upwards if necessary
        while (level >= 0) {
            if (insertPath[level].children.length > this._maxEntries) {
                this._split(insertPath, level);
                level--;
            } else break;
        }

        // adjust bboxes along the insertion path
        this._adjustParentBBoxes(bbox, insertPath, level);
    },

    // split overflowed node into two
    _split: function (insertPath, level) {

        var node = insertPath[level],
            M = node.children.length,
            m = this._minEntries;

        this._chooseSplitAxis(node, m, M);

        var newNode = {
            children: node.children.splice(this._chooseSplitIndex(node, m, M)),
            height: node.height
        };

        if (node.leaf) newNode.leaf = true;

        calcBBox(node, this.toBBox);
        calcBBox(newNode, this.toBBox);

        if (level) insertPath[level - 1].children.push(newNode);
        else this._splitRoot(node, newNode);
    },

    _splitRoot: function (node, newNode) {
        // split root node
        this.data = {
            children: [node, newNode],
            height: node.height + 1
        };
        calcBBox(this.data, this.toBBox);
    },

    _chooseSplitIndex: function (node, m, M) {

        var i, bbox1, bbox2, overlap, area, minOverlap, minArea, index;

        minOverlap = minArea = Infinity;

        for (i = m; i <= M - m; i++) {
            bbox1 = distBBox(node, 0, i, this.toBBox);
            bbox2 = distBBox(node, i, M, this.toBBox);

            overlap = intersectionArea(bbox1, bbox2);
            area = bboxArea(bbox1) + bboxArea(bbox2);

            // choose distribution with minimum overlap
            if (overlap < minOverlap) {
                minOverlap = overlap;
                index = i;

                minArea = area < minArea ? area : minArea;

            } else if (overlap === minOverlap) {
                // otherwise choose distribution with minimum area
                if (area < minArea) {
                    minArea = area;
                    index = i;
                }
            }
        }

        return index;
    },

    // sorts node children by the best axis for split
    _chooseSplitAxis: function (node, m, M) {

        var compareMinX = node.leaf ? this.compareMinX : compareNodeMinX,
            compareMinY = node.leaf ? this.compareMinY : compareNodeMinY,
            xMargin = this._allDistMargin(node, m, M, compareMinX),
            yMargin = this._allDistMargin(node, m, M, compareMinY);

        // if total distributions margin value is minimal for x, sort by minX,
        // otherwise it's already sorted by minY
        if (xMargin < yMargin) node.children.sort(compareMinX);
    },

    // total margin of all possible split distributions where each node is at least m full
    _allDistMargin: function (node, m, M, compare) {

        node.children.sort(compare);

        var toBBox = this.toBBox,
            leftBBox = distBBox(node, 0, m, toBBox),
            rightBBox = distBBox(node, M - m, M, toBBox),
            margin = bboxMargin(leftBBox) + bboxMargin(rightBBox),
            i, child;

        for (i = m; i < M - m; i++) {
            child = node.children[i];
            extend(leftBBox, node.leaf ? toBBox(child) : child.bbox);
            margin += bboxMargin(leftBBox);
        }

        for (i = M - m - 1; i >= m; i--) {
            child = node.children[i];
            extend(rightBBox, node.leaf ? toBBox(child) : child.bbox);
            margin += bboxMargin(rightBBox);
        }

        return margin;
    },

    _adjustParentBBoxes: function (bbox, path, level) {
        // adjust bboxes along the given tree path
        for (var i = level; i >= 0; i--) {
            extend(path[i].bbox, bbox);
        }
    },

    _condense: function (path) {
        // go through the path, removing empty nodes and updating bboxes
        for (var i = path.length - 1, siblings; i >= 0; i--) {
            if (path[i].children.length === 0) {
                if (i > 0) {
                    siblings = path[i - 1].children;
                    siblings.splice(siblings.indexOf(path[i]), 1);

                } else this.clear();

            } else calcBBox(path[i], this.toBBox);
        }
    },

    _initFormat: function (format) {
        // data format (minX, minY, maxX, maxY accessors)

        // uses eval-type function compilation instead of just accepting a toBBox function
        // because the algorithms are very sensitive to sorting functions performance,
        // so they should be dead simple and without inner calls

        // jshint evil: true

        var compareArr = ['return a', ' - b', ';'];

        this.compareMinX = new Function('a', 'b', compareArr.join(format[0]));
        this.compareMinY = new Function('a', 'b', compareArr.join(format[1]));

        this.toBBox = new Function('a', 'return [a' + format.join(', a') + '];');
    }
};


// calculate node's bbox from bboxes of its children
function calcBBox(node, toBBox) {
    node.bbox = distBBox(node, 0, node.children.length, toBBox);
}

// min bounding rectangle of node children from k to p-1
function distBBox(node, k, p, toBBox) {
    var bbox = empty();

    for (var i = k, child; i < p; i++) {
        child = node.children[i];
        extend(bbox, node.leaf ? toBBox(child) : child.bbox);
    }

    return bbox;
}

function empty() { return [Infinity, Infinity, -Infinity, -Infinity]; }

function extend(a, b) {
    a[0] = Math.min(a[0], b[0]);
    a[1] = Math.min(a[1], b[1]);
    a[2] = Math.max(a[2], b[2]);
    a[3] = Math.max(a[3], b[3]);
    return a;
}

function compareNodeMinX(a, b) { return a.bbox[0] - b.bbox[0]; }
function compareNodeMinY(a, b) { return a.bbox[1] - b.bbox[1]; }

function bboxArea(a)   { return (a[2] - a[0]) * (a[3] - a[1]); }
function bboxMargin(a) { return (a[2] - a[0]) + (a[3] - a[1]); }

function enlargedArea(a, b) {
    return (Math.max(b[2], a[2]) - Math.min(b[0], a[0])) *
           (Math.max(b[3], a[3]) - Math.min(b[1], a[1]));
}

function intersectionArea(a, b) {
    var minX = Math.max(a[0], b[0]),
        minY = Math.max(a[1], b[1]),
        maxX = Math.min(a[2], b[2]),
        maxY = Math.min(a[3], b[3]);

    return Math.max(0, maxX - minX) *
           Math.max(0, maxY - minY);
}

function contains(a, b) {
    return a[0] <= b[0] &&
           a[1] <= b[1] &&
           b[2] <= a[2] &&
           b[3] <= a[3];
}

function intersects(a, b) {
    return b[0] <= a[2] &&
           b[1] <= a[3] &&
           b[2] >= a[0] &&
           b[3] >= a[1];
}

// sort an array so that items come in groups of n unsorted items, with groups sorted between each other;
// combines selection algorithm with binary divide & conquer approach

function multiSelect(arr, left, right, n, compare) {
    var stack = [left, right],
        mid;

    while (stack.length) {
        right = stack.pop();
        left = stack.pop();

        if (right - left <= n) continue;

        mid = left + Math.ceil((right - left) / n / 2) * n;
        select(arr, left, right, mid, compare);

        stack.push(left, mid, mid, right);
    }
}

// Floyd-Rivest selection algorithm:
// sort an array between left and right (inclusive) so that the smallest k elements come first (unordered)
function select(arr, left, right, k, compare) {
    var n, i, z, s, sd, newLeft, newRight, t, j;

    while (right > left) {
        if (right - left > 600) {
            n = right - left + 1;
            i = k - left + 1;
            z = Math.log(n);
            s = 0.5 * Math.exp(2 * z / 3);
            sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (i - n / 2 < 0 ? -1 : 1);
            newLeft = Math.max(left, Math.floor(k - i * s / n + sd));
            newRight = Math.min(right, Math.floor(k + (n - i) * s / n + sd));
            select(arr, newLeft, newRight, k, compare);
        }

        t = arr[k];
        i = left;
        j = right;

        swap(arr, left, k);
        if (compare(arr[right], t) > 0) swap(arr, left, right);

        while (i < j) {
            swap(arr, i, j);
            i++;
            j--;
            while (compare(arr[i], t) < 0) i++;
            while (compare(arr[j], t) > 0) j--;
        }

        if (compare(arr[left], t) === 0) swap(arr, left, j);
        else {
            j++;
            swap(arr, j, right);
        }

        if (j <= k) left = j + 1;
        if (k <= j) right = j - 1;
    }
}

function swap(arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}


// export as AMD/CommonJS module or global variable
if (typeof define === 'function' && define.amd) define('rbush', function() { return rbush; });
else if (typeof module !== 'undefined') module.exports = rbush;
else if (typeof self !== 'undefined') self.rbush = rbush;
else window.rbush = rbush;

})();

},{}],16:[function(require,module,exports){
// Version 0.5.0 - Copyright 2012 - 2015 -  Jim Riecken <jimr@jimr.ca>
//
// Released under the MIT License - https://github.com/jriecken/sat-js
//
// A simple library for determining intersections of circles and
// polygons using the Separating Axis Theorem.
/** @preserve SAT.js - Version 0.5.0 - Copyright 2012 - 2015 - Jim Riecken <jimr@jimr.ca> - released under the MIT License. https://github.com/jriecken/sat-js */

/*global define: false, module: false*/
/*jshint shadow:true, sub:true, forin:true, noarg:true, noempty:true, 
  eqeqeq:true, bitwise:true, strict:true, undef:true, 
  curly:true, browser:true */

// Create a UMD wrapper for SAT. Works in:
//
//  - Plain browser via global SAT variable
//  - AMD loader (like require.js)
//  - Node.js
//
// The quoted properties all over the place are used so that the Closure Compiler
// does not mangle the exposed API in advanced mode.
/**
 * @param {*} root - The global scope
 * @param {Function} factory - Factory that creates SAT module
 */
(function (root, factory) {
  "use strict";
  if (typeof define === 'function' && define['amd']) {
    define(factory);
  } else if (typeof exports === 'object') {
    module['exports'] = factory();
  } else {
    root['SAT'] = factory();
  }
}(this, function () {
  "use strict";

  var SAT = {};

  //
  // ## Vector
  //
  // Represents a vector in two dimensions with `x` and `y` properties.


  // Create a new Vector, optionally passing in the `x` and `y` coordinates. If
  // a coordinate is not specified, it will be set to `0`
  /** 
   * @param {?number=} x The x position.
   * @param {?number=} y The y position.
   * @constructor
   */
  function Vector(x, y) {
    this['x'] = x || 0;
    this['y'] = y || 0;
  }
  SAT['Vector'] = Vector;
  // Alias `Vector` as `V`
  SAT['V'] = Vector;


  // Copy the values of another Vector into this one.
  /**
   * @param {Vector} other The other Vector.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['copy'] = Vector.prototype.copy = function(other) {
    this['x'] = other['x'];
    this['y'] = other['y'];
    return this;
  };

  // Create a new vector with the same coordinates as this on.
  /**
   * @return {Vector} The new cloned vector
   */
  Vector.prototype['clone'] = Vector.prototype.clone = function() {
    return new Vector(this['x'], this['y']);
  };

  // Change this vector to be perpendicular to what it was before. (Effectively
  // roatates it 90 degrees in a clockwise direction)
  /**
   * @return {Vector} This for chaining.
   */
  Vector.prototype['perp'] = Vector.prototype.perp = function() {
    var x = this['x'];
    this['x'] = this['y'];
    this['y'] = -x;
    return this;
  };

  // Rotate this vector (counter-clockwise) by the specified angle (in radians).
  /**
   * @param {number} angle The angle to rotate (in radians)
   * @return {Vector} This for chaining.
   */
  Vector.prototype['rotate'] = Vector.prototype.rotate = function (angle) {
    var x = this['x'];
    var y = this['y'];
    this['x'] = x * Math.cos(angle) - y * Math.sin(angle);
    this['y'] = x * Math.sin(angle) + y * Math.cos(angle);
    return this;
  };

  // Reverse this vector.
  /**
   * @return {Vector} This for chaining.
   */
  Vector.prototype['reverse'] = Vector.prototype.reverse = function() {
    this['x'] = -this['x'];
    this['y'] = -this['y'];
    return this;
  };
  

  // Normalize this vector.  (make it have length of `1`)
  /**
   * @return {Vector} This for chaining.
   */
  Vector.prototype['normalize'] = Vector.prototype.normalize = function() {
    var d = this.len();
    if(d > 0) {
      this['x'] = this['x'] / d;
      this['y'] = this['y'] / d;
    }
    return this;
  };
  
  // Add another vector to this one.
  /**
   * @param {Vector} other The other Vector.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['add'] = Vector.prototype.add = function(other) {
    this['x'] += other['x'];
    this['y'] += other['y'];
    return this;
  };
  
  // Subtract another vector from this one.
  /**
   * @param {Vector} other The other Vector.
   * @return {Vector} This for chaiing.
   */
  Vector.prototype['sub'] = Vector.prototype.sub = function(other) {
    this['x'] -= other['x'];
    this['y'] -= other['y'];
    return this;
  };
  
  // Scale this vector. An independant scaling factor can be provided
  // for each axis, or a single scaling factor that will scale both `x` and `y`.
  /**
   * @param {number} x The scaling factor in the x direction.
   * @param {?number=} y The scaling factor in the y direction.  If this
   *   is not specified, the x scaling factor will be used.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['scale'] = Vector.prototype.scale = function(x,y) {
    this['x'] *= x;
    this['y'] *= y || x;
    return this; 
  };
  
  // Project this vector on to another vector.
  /**
   * @param {Vector} other The vector to project onto.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['project'] = Vector.prototype.project = function(other) {
    var amt = this.dot(other) / other.len2();
    this['x'] = amt * other['x'];
    this['y'] = amt * other['y'];
    return this;
  };
  
  // Project this vector onto a vector of unit length. This is slightly more efficient
  // than `project` when dealing with unit vectors.
  /**
   * @param {Vector} other The unit vector to project onto.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['projectN'] = Vector.prototype.projectN = function(other) {
    var amt = this.dot(other);
    this['x'] = amt * other['x'];
    this['y'] = amt * other['y'];
    return this;
  };
  
  // Reflect this vector on an arbitrary axis.
  /**
   * @param {Vector} axis The vector representing the axis.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['reflect'] = Vector.prototype.reflect = function(axis) {
    var x = this['x'];
    var y = this['y'];
    this.project(axis).scale(2);
    this['x'] -= x;
    this['y'] -= y;
    return this;
  };
  
  // Reflect this vector on an arbitrary axis (represented by a unit vector). This is
  // slightly more efficient than `reflect` when dealing with an axis that is a unit vector.
  /**
   * @param {Vector} axis The unit vector representing the axis.
   * @return {Vector} This for chaining.
   */
  Vector.prototype['reflectN'] = Vector.prototype.reflectN = function(axis) {
    var x = this['x'];
    var y = this['y'];
    this.projectN(axis).scale(2);
    this['x'] -= x;
    this['y'] -= y;
    return this;
  };
  
  // Get the dot product of this vector and another.
  /**
   * @param {Vector}  other The vector to dot this one against.
   * @return {number} The dot product.
   */
  Vector.prototype['dot'] = Vector.prototype.dot = function(other) {
    return this['x'] * other['x'] + this['y'] * other['y'];
  };
  
  // Get the squared length of this vector.
  /**
   * @return {number} The length^2 of this vector.
   */
  Vector.prototype['len2'] = Vector.prototype.len2 = function() {
    return this.dot(this);
  };
  
  // Get the length of this vector.
  /**
   * @return {number} The length of this vector.
   */
  Vector.prototype['len'] = Vector.prototype.len = function() {
    return Math.sqrt(this.len2());
  };
  
  // ## Circle
  //
  // Represents a circle with a position and a radius.

  // Create a new circle, optionally passing in a position and/or radius. If no position
  // is given, the circle will be at `(0,0)`. If no radius is provided, the circle will
  // have a radius of `0`.
  /**
   * @param {Vector=} pos A vector representing the position of the center of the circle
   * @param {?number=} r The radius of the circle
   * @constructor
   */
  function Circle(pos, r) {
    this['pos'] = pos || new Vector();
    this['r'] = r || 0;
  }
  SAT['Circle'] = Circle;
  
  // Compute the axis-aligned bounding box (AABB) of this Circle.
  //
  // Note: Returns a _new_ `Polygon` each time you call this.
  /**
   * @return {Polygon} The AABB
   */
  Circle.prototype['getAABB'] = Circle.prototype.getAABB = function() {
    var r = this['r'];
    var corner = this["pos"].clone().sub(new Vector(r, r));
    return new Box(corner, r*2, r*2).toPolygon();
  };

  // ## Polygon
  //
  // Represents a *convex* polygon with any number of points (specified in counter-clockwise order)
  //
  // Note: Do _not_ manually change the `points`, `angle`, or `offset` properties. Use the
  // provided setters. Otherwise the calculated properties will not be updated correctly.
  //
  // `pos` can be changed directly.

  // Create a new polygon, passing in a position vector, and an array of points (represented
  // by vectors relative to the position vector). If no position is passed in, the position
  // of the polygon will be `(0,0)`.
  /**
   * @param {Vector=} pos A vector representing the origin of the polygon. (all other
   *   points are relative to this one)
   * @param {Array.<Vector>=} points An array of vectors representing the points in the polygon,
   *   in counter-clockwise order.
   * @constructor
   */
  function Polygon(pos, points) {
    this['pos'] = pos || new Vector();
    this['angle'] = 0;
    this['offset'] = new Vector();
    this.setPoints(points || []);
  }
  SAT['Polygon'] = Polygon;
  
  // Set the points of the polygon.
  /**
   * @param {Array.<Vector>=} points An array of vectors representing the points in the polygon,
   *   in counter-clockwise order.
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['setPoints'] = Polygon.prototype.setPoints = function(points) {
    // Only re-allocate if this is a new polygon or the number of points has changed.
    var lengthChanged = !this['points'] || this['points'].length !== points.length;
    if (lengthChanged) {
      var i;
      var calcPoints = this['calcPoints'] = [];
      var edges = this['edges'] = [];
      var normals = this['normals'] = [];
      // Allocate the vector arrays for the calculated properties
      for (i = 0; i < points.length; i++) {
        calcPoints.push(new Vector());
        edges.push(new Vector());
        normals.push(new Vector());
      }
    }
    this['points'] = points;
    this._recalc();
    return this;
  };

  // Set the current rotation angle of the polygon.
  /**
   * @param {number} angle The current rotation angle (in radians).
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['setAngle'] = Polygon.prototype.setAngle = function(angle) {
    this['angle'] = angle;
    this._recalc();
    return this;
  };

  // Set the current offset to apply to the `points` before applying the `angle` rotation.
  /**
   * @param {Vector} offset The new offset vector.
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['setOffset'] = Polygon.prototype.setOffset = function(offset) {
    this['offset'] = offset;
    this._recalc();
    return this;
  };

  // Rotates this polygon counter-clockwise around the origin of *its local coordinate system* (i.e. `pos`).
  //
  // Note: This changes the **original** points (so any `angle` will be applied on top of this rotation).
  /**
   * @param {number} angle The angle to rotate (in radians)
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['rotate'] = Polygon.prototype.rotate = function(angle) {
    var points = this['points'];
    var len = points.length;
    for (var i = 0; i < len; i++) {
      points[i].rotate(angle);
    }
    this._recalc();
    return this;
  };

  // Translates the points of this polygon by a specified amount relative to the origin of *its own coordinate
  // system* (i.e. `pos`).
  //
  // This is most useful to change the "center point" of a polygon. If you just want to move the whole polygon, change
  // the coordinates of `pos`.
  //
  // Note: This changes the **original** points (so any `offset` will be applied on top of this translation)
  /**
   * @param {number} x The horizontal amount to translate.
   * @param {number} y The vertical amount to translate.
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype['translate'] = Polygon.prototype.translate = function (x, y) {
    var points = this['points'];
    var len = points.length;
    for (var i = 0; i < len; i++) {
      points[i].x += x;
      points[i].y += y;
    }
    this._recalc();
    return this;
  };


  // Computes the calculated collision polygon. Applies the `angle` and `offset` to the original points then recalculates the
  // edges and normals of the collision polygon.
  /**
   * @return {Polygon} This for chaining.
   */
  Polygon.prototype._recalc = function() {
    // Calculated points - this is what is used for underlying collisions and takes into account
    // the angle/offset set on the polygon.
    var calcPoints = this['calcPoints'];
    // The edges here are the direction of the `n`th edge of the polygon, relative to
    // the `n`th point. If you want to draw a given edge from the edge value, you must
    // first translate to the position of the starting point.
    var edges = this['edges'];
    // The normals here are the direction of the normal for the `n`th edge of the polygon, relative
    // to the position of the `n`th point. If you want to draw an edge normal, you must first
    // translate to the position of the starting point.
    var normals = this['normals'];
    // Copy the original points array and apply the offset/angle
    var points = this['points'];
    var offset = this['offset'];
    var angle = this['angle'];
    var len = points.length;
    var i;
    for (i = 0; i < len; i++) {
      var calcPoint = calcPoints[i].copy(points[i]);
      calcPoint.x += offset.x;
      calcPoint.y += offset.y;
      if (angle !== 0) {
        calcPoint.rotate(angle);
      }
    }
    // Calculate the edges/normals
    for (i = 0; i < len; i++) {
      var p1 = calcPoints[i];
      var p2 = i < len - 1 ? calcPoints[i + 1] : calcPoints[0];
      var e = edges[i].copy(p2).sub(p1);
      normals[i].copy(e).perp().normalize();
    }
    return this;
  };
  
  
  // Compute the axis-aligned bounding box. Any current state
  // (translations/rotations) will be applied before constructing the AABB.
  //
  // Note: Returns a _new_ `Polygon` each time you call this.
  /**
   * @return {Polygon} The AABB
   */
  Polygon.prototype["getAABB"] = Polygon.prototype.getAABB = function() {
    var points = this["calcPoints"];
    var len = points.length;
    var xMin = points[0]["x"];
    var yMin = points[0]["y"];
    var xMax = points[0]["x"];
    var yMax = points[0]["y"];
    for (var i = 1; i < len; i++) {
      var point = points[i];
      if (point["x"] < xMin) {
        xMin = point["x"];
      }
      else if (point["x"] > xMax) {
        xMax = point["x"];
      }
      if (point["y"] < yMin) {
        yMin = point["y"];
      }
      else if (point["y"] > yMax) {
        yMax = point["y"];
      }
    }
    return new Box(this["pos"].clone().add(new Vector(xMin, yMin)), xMax - xMin, yMax - yMin).toPolygon();
  };
  

  // ## Box
  //
  // Represents an axis-aligned box, with a width and height.


  // Create a new box, with the specified position, width, and height. If no position
  // is given, the position will be `(0,0)`. If no width or height are given, they will
  // be set to `0`.
  /**
   * @param {Vector=} pos A vector representing the top-left of the box.
   * @param {?number=} w The width of the box.
   * @param {?number=} h The height of the box.
   * @constructor
   */
  function Box(pos, w, h) {
    this['pos'] = pos || new Vector();
    this['w'] = w || 0;
    this['h'] = h || 0;
  }
  SAT['Box'] = Box;

  // Returns a polygon whose edges are the same as this box.
  /**
   * @return {Polygon} A new Polygon that represents this box.
   */
  Box.prototype['toPolygon'] = Box.prototype.toPolygon = function() {
    var pos = this['pos'];
    var w = this['w'];
    var h = this['h'];
    return new Polygon(new Vector(pos['x'], pos['y']), [
     new Vector(), new Vector(w, 0), 
     new Vector(w,h), new Vector(0,h)
    ]);
  };
  
  // ## Response
  //
  // An object representing the result of an intersection. Contains:
  //  - The two objects participating in the intersection
  //  - The vector representing the minimum change necessary to extract the first object
  //    from the second one (as well as a unit vector in that direction and the magnitude
  //    of the overlap)
  //  - Whether the first object is entirely inside the second, and vice versa.
  /**
   * @constructor
   */  
  function Response() {
    this['a'] = null;
    this['b'] = null;
    this['overlapN'] = new Vector();
    this['overlapV'] = new Vector();
    this.clear();
  }
  SAT['Response'] = Response;

  // Set some values of the response back to their defaults.  Call this between tests if
  // you are going to reuse a single Response object for multiple intersection tests (recommented
  // as it will avoid allcating extra memory)
  /**
   * @return {Response} This for chaining
   */
  Response.prototype['clear'] = Response.prototype.clear = function() {
    this['aInB'] = true;
    this['bInA'] = true;
    this['overlap'] = Number.MAX_VALUE;
    return this;
  };

  // ## Object Pools

  // A pool of `Vector` objects that are used in calculations to avoid
  // allocating memory.
  /**
   * @type {Array.<Vector>}
   */
  var T_VECTORS = [];
  for (var i = 0; i < 10; i++) { T_VECTORS.push(new Vector()); }
  
  // A pool of arrays of numbers used in calculations to avoid allocating
  // memory.
  /**
   * @type {Array.<Array.<number>>}
   */
  var T_ARRAYS = [];
  for (var i = 0; i < 5; i++) { T_ARRAYS.push([]); }

  // Temporary response used for polygon hit detection.
  /**
   * @type {Response}
   */
  var T_RESPONSE = new Response();

  // Unit square polygon used for polygon hit detection.
  /**
   * @type {Polygon}
   */
  var UNIT_SQUARE = new Box(new Vector(), 1, 1).toPolygon();

  // ## Helper Functions

  // Flattens the specified array of points onto a unit vector axis,
  // resulting in a one dimensional range of the minimum and
  // maximum value on that axis.
  /**
   * @param {Array.<Vector>} points The points to flatten.
   * @param {Vector} normal The unit vector axis to flatten on.
   * @param {Array.<number>} result An array.  After calling this function,
   *   result[0] will be the minimum value,
   *   result[1] will be the maximum value.
   */
  function flattenPointsOn(points, normal, result) {
    var min = Number.MAX_VALUE;
    var max = -Number.MAX_VALUE;
    var len = points.length;
    for (var i = 0; i < len; i++ ) {
      // The magnitude of the projection of the point onto the normal
      var dot = points[i].dot(normal);
      if (dot < min) { min = dot; }
      if (dot > max) { max = dot; }
    }
    result[0] = min; result[1] = max;
  }
  
  // Check whether two convex polygons are separated by the specified
  // axis (must be a unit vector).
  /**
   * @param {Vector} aPos The position of the first polygon.
   * @param {Vector} bPos The position of the second polygon.
   * @param {Array.<Vector>} aPoints The points in the first polygon.
   * @param {Array.<Vector>} bPoints The points in the second polygon.
   * @param {Vector} axis The axis (unit sized) to test against.  The points of both polygons
   *   will be projected onto this axis.
   * @param {Response=} response A Response object (optional) which will be populated
   *   if the axis is not a separating axis.
   * @return {boolean} true if it is a separating axis, false otherwise.  If false,
   *   and a response is passed in, information about how much overlap and
   *   the direction of the overlap will be populated.
   */
  function isSeparatingAxis(aPos, bPos, aPoints, bPoints, axis, response) {
    var rangeA = T_ARRAYS.pop();
    var rangeB = T_ARRAYS.pop();
    // The magnitude of the offset between the two polygons
    var offsetV = T_VECTORS.pop().copy(bPos).sub(aPos);
    var projectedOffset = offsetV.dot(axis);
    // Project the polygons onto the axis.
    flattenPointsOn(aPoints, axis, rangeA);
    flattenPointsOn(bPoints, axis, rangeB);
    // Move B's range to its position relative to A.
    rangeB[0] += projectedOffset;
    rangeB[1] += projectedOffset;
    // Check if there is a gap. If there is, this is a separating axis and we can stop
    if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {
      T_VECTORS.push(offsetV); 
      T_ARRAYS.push(rangeA); 
      T_ARRAYS.push(rangeB);
      return true;
    }
    // This is not a separating axis. If we're calculating a response, calculate the overlap.
    if (response) {
      var overlap = 0;
      // A starts further left than B
      if (rangeA[0] < rangeB[0]) {
        response['aInB'] = false;
        // A ends before B does. We have to pull A out of B
        if (rangeA[1] < rangeB[1]) { 
          overlap = rangeA[1] - rangeB[0];
          response['bInA'] = false;
        // B is fully inside A.  Pick the shortest way out.
        } else {
          var option1 = rangeA[1] - rangeB[0];
          var option2 = rangeB[1] - rangeA[0];
          overlap = option1 < option2 ? option1 : -option2;
        }
      // B starts further left than A
      } else {
        response['bInA'] = false;
        // B ends before A ends. We have to push A out of B
        if (rangeA[1] > rangeB[1]) { 
          overlap = rangeA[0] - rangeB[1];
          response['aInB'] = false;
        // A is fully inside B.  Pick the shortest way out.
        } else {
          var option1 = rangeA[1] - rangeB[0];
          var option2 = rangeB[1] - rangeA[0];
          overlap = option1 < option2 ? option1 : -option2;
        }
      }
      // If this is the smallest amount of overlap we've seen so far, set it as the minimum overlap.
      var absOverlap = Math.abs(overlap);
      if (absOverlap < response['overlap']) {
        response['overlap'] = absOverlap;
        response['overlapN'].copy(axis);
        if (overlap < 0) {
          response['overlapN'].reverse();
        }
      }      
    }
    T_VECTORS.push(offsetV); 
    T_ARRAYS.push(rangeA); 
    T_ARRAYS.push(rangeB);
    return false;
  }
  
  // Calculates which Vornoi region a point is on a line segment.
  // It is assumed that both the line and the point are relative to `(0,0)`
  //
  //            |       (0)      |
  //     (-1)  [S]--------------[E]  (1)
  //            |       (0)      |
  /**
   * @param {Vector} line The line segment.
   * @param {Vector} point The point.
   * @return  {number} LEFT_VORNOI_REGION (-1) if it is the left region, 
   *          MIDDLE_VORNOI_REGION (0) if it is the middle region, 
   *          RIGHT_VORNOI_REGION (1) if it is the right region.
   */
  function vornoiRegion(line, point) {
    var len2 = line.len2();
    var dp = point.dot(line);
    // If the point is beyond the start of the line, it is in the
    // left vornoi region.
    if (dp < 0) { return LEFT_VORNOI_REGION; }
    // If the point is beyond the end of the line, it is in the
    // right vornoi region.
    else if (dp > len2) { return RIGHT_VORNOI_REGION; }
    // Otherwise, it's in the middle one.
    else { return MIDDLE_VORNOI_REGION; }
  }
  // Constants for Vornoi regions
  /**
   * @const
   */
  var LEFT_VORNOI_REGION = -1;
  /**
   * @const
   */
  var MIDDLE_VORNOI_REGION = 0;
  /**
   * @const
   */
  var RIGHT_VORNOI_REGION = 1;
  
  // ## Collision Tests

  // Check if a point is inside a circle.
  /**
   * @param {Vector} p The point to test.
   * @param {Circle} c The circle to test.
   * @return {boolean} true if the point is inside the circle, false if it is not.
   */
  function pointInCircle(p, c) {
    var differenceV = T_VECTORS.pop().copy(p).sub(c['pos']);
    var radiusSq = c['r'] * c['r'];
    var distanceSq = differenceV.len2();
    T_VECTORS.push(differenceV);
    // If the distance between is smaller than the radius then the point is inside the circle.
    return distanceSq <= radiusSq;
  }
  SAT['pointInCircle'] = pointInCircle;

  // Check if a point is inside a convex polygon.
  /**
   * @param {Vector} p The point to test.
   * @param {Polygon} poly The polygon to test.
   * @return {boolean} true if the point is inside the polygon, false if it is not.
   */
  function pointInPolygon(p, poly) {
    UNIT_SQUARE['pos'].copy(p);
    T_RESPONSE.clear();
    var result = testPolygonPolygon(UNIT_SQUARE, poly, T_RESPONSE);
    if (result) {
      result = T_RESPONSE['aInB'];
    }
    return result;
  }
  SAT['pointInPolygon'] = pointInPolygon;

  // Check if two circles collide.
  /**
   * @param {Circle} a The first circle.
   * @param {Circle} b The second circle.
   * @param {Response=} response Response object (optional) that will be populated if
   *   the circles intersect.
   * @return {boolean} true if the circles intersect, false if they don't. 
   */
  function testCircleCircle(a, b, response) {
    // Check if the distance between the centers of the two
    // circles is greater than their combined radius.
    var differenceV = T_VECTORS.pop().copy(b['pos']).sub(a['pos']);
    var totalRadius = a['r'] + b['r'];
    var totalRadiusSq = totalRadius * totalRadius;
    var distanceSq = differenceV.len2();
    // If the distance is bigger than the combined radius, they don't intersect.
    if (distanceSq > totalRadiusSq) {
      T_VECTORS.push(differenceV);
      return false;
    }
    // They intersect.  If we're calculating a response, calculate the overlap.
    if (response) { 
      var dist = Math.sqrt(distanceSq);
      response['a'] = a;
      response['b'] = b;
      response['overlap'] = totalRadius - dist;
      response['overlapN'].copy(differenceV.normalize());
      response['overlapV'].copy(differenceV).scale(response['overlap']);
      response['aInB']= a['r'] <= b['r'] && dist <= b['r'] - a['r'];
      response['bInA'] = b['r'] <= a['r'] && dist <= a['r'] - b['r'];
    }
    T_VECTORS.push(differenceV);
    return true;
  }
  SAT['testCircleCircle'] = testCircleCircle;
  
  // Check if a polygon and a circle collide.
  /**
   * @param {Polygon} polygon The polygon.
   * @param {Circle} circle The circle.
   * @param {Response=} response Response object (optional) that will be populated if
   *   they interset.
   * @return {boolean} true if they intersect, false if they don't.
   */
  function testPolygonCircle(polygon, circle, response) {
    // Get the position of the circle relative to the polygon.
    var circlePos = T_VECTORS.pop().copy(circle['pos']).sub(polygon['pos']);
    var radius = circle['r'];
    var radius2 = radius * radius;
    var points = polygon['calcPoints'];
    var len = points.length;
    var edge = T_VECTORS.pop();
    var point = T_VECTORS.pop();
    
    // For each edge in the polygon:
    for (var i = 0; i < len; i++) {
      var next = i === len - 1 ? 0 : i + 1;
      var prev = i === 0 ? len - 1 : i - 1;
      var overlap = 0;
      var overlapN = null;
      
      // Get the edge.
      edge.copy(polygon['edges'][i]);
      // Calculate the center of the circle relative to the starting point of the edge.
      point.copy(circlePos).sub(points[i]);
      
      // If the distance between the center of the circle and the point
      // is bigger than the radius, the polygon is definitely not fully in
      // the circle.
      if (response && point.len2() > radius2) {
        response['aInB'] = false;
      }
      
      // Calculate which Vornoi region the center of the circle is in.
      var region = vornoiRegion(edge, point);
      // If it's the left region:
      if (region === LEFT_VORNOI_REGION) { 
        // We need to make sure we're in the RIGHT_VORNOI_REGION of the previous edge.
        edge.copy(polygon['edges'][prev]);
        // Calculate the center of the circle relative the starting point of the previous edge
        var point2 = T_VECTORS.pop().copy(circlePos).sub(points[prev]);
        region = vornoiRegion(edge, point2);
        if (region === RIGHT_VORNOI_REGION) {
          // It's in the region we want.  Check if the circle intersects the point.
          var dist = point.len();
          if (dist > radius) {
            // No intersection
            T_VECTORS.push(circlePos); 
            T_VECTORS.push(edge);
            T_VECTORS.push(point); 
            T_VECTORS.push(point2);
            return false;
          } else if (response) {
            // It intersects, calculate the overlap.
            response['bInA'] = false;
            overlapN = point.normalize();
            overlap = radius - dist;
          }
        }
        T_VECTORS.push(point2);
      // If it's the right region:
      } else if (region === RIGHT_VORNOI_REGION) {
        // We need to make sure we're in the left region on the next edge
        edge.copy(polygon['edges'][next]);
        // Calculate the center of the circle relative to the starting point of the next edge.
        point.copy(circlePos).sub(points[next]);
        region = vornoiRegion(edge, point);
        if (region === LEFT_VORNOI_REGION) {
          // It's in the region we want.  Check if the circle intersects the point.
          var dist = point.len();
          if (dist > radius) {
            // No intersection
            T_VECTORS.push(circlePos); 
            T_VECTORS.push(edge); 
            T_VECTORS.push(point);
            return false;              
          } else if (response) {
            // It intersects, calculate the overlap.
            response['bInA'] = false;
            overlapN = point.normalize();
            overlap = radius - dist;
          }
        }
      // Otherwise, it's the middle region:
      } else {
        // Need to check if the circle is intersecting the edge,
        // Change the edge into its "edge normal".
        var normal = edge.perp().normalize();
        // Find the perpendicular distance between the center of the 
        // circle and the edge.
        var dist = point.dot(normal);
        var distAbs = Math.abs(dist);
        // If the circle is on the outside of the edge, there is no intersection.
        if (dist > 0 && distAbs > radius) {
          // No intersection
          T_VECTORS.push(circlePos); 
          T_VECTORS.push(normal); 
          T_VECTORS.push(point);
          return false;
        } else if (response) {
          // It intersects, calculate the overlap.
          overlapN = normal;
          overlap = radius - dist;
          // If the center of the circle is on the outside of the edge, or part of the
          // circle is on the outside, the circle is not fully inside the polygon.
          if (dist >= 0 || overlap < 2 * radius) {
            response['bInA'] = false;
          }
        }
      }
      
      // If this is the smallest overlap we've seen, keep it. 
      // (overlapN may be null if the circle was in the wrong Vornoi region).
      if (overlapN && response && Math.abs(overlap) < Math.abs(response['overlap'])) {
        response['overlap'] = overlap;
        response['overlapN'].copy(overlapN);
      }
    }
    
    // Calculate the final overlap vector - based on the smallest overlap.
    if (response) {
      response['a'] = polygon;
      response['b'] = circle;
      response['overlapV'].copy(response['overlapN']).scale(response['overlap']);
    }
    T_VECTORS.push(circlePos); 
    T_VECTORS.push(edge); 
    T_VECTORS.push(point);
    return true;
  }
  SAT['testPolygonCircle'] = testPolygonCircle;
  
  // Check if a circle and a polygon collide.
  //
  // **NOTE:** This is slightly less efficient than polygonCircle as it just
  // runs polygonCircle and reverses everything at the end.
  /**
   * @param {Circle} circle The circle.
   * @param {Polygon} polygon The polygon.
   * @param {Response=} response Response object (optional) that will be populated if
   *   they interset.
   * @return {boolean} true if they intersect, false if they don't.
   */
  function testCirclePolygon(circle, polygon, response) {
    // Test the polygon against the circle.
    var result = testPolygonCircle(polygon, circle, response);
    if (result && response) {
      // Swap A and B in the response.
      var a = response['a'];
      var aInB = response['aInB'];
      response['overlapN'].reverse();
      response['overlapV'].reverse();
      response['a'] = response['b'];
      response['b'] = a;
      response['aInB'] = response['bInA'];
      response['bInA'] = aInB;
    }
    return result;
  }
  SAT['testCirclePolygon'] = testCirclePolygon;
  
  // Checks whether polygons collide.
  /**
   * @param {Polygon} a The first polygon.
   * @param {Polygon} b The second polygon.
   * @param {Response=} response Response object (optional) that will be populated if
   *   they interset.
   * @return {boolean} true if they intersect, false if they don't.
   */
  function testPolygonPolygon(a, b, response) {
    var aPoints = a['calcPoints'];
    var aLen = aPoints.length;
    var bPoints = b['calcPoints'];
    var bLen = bPoints.length;
    // If any of the edge normals of A is a separating axis, no intersection.
    for (var i = 0; i < aLen; i++) {
      if (isSeparatingAxis(a['pos'], b['pos'], aPoints, bPoints, a['normals'][i], response)) {
        return false;
      }
    }
    // If any of the edge normals of B is a separating axis, no intersection.
    for (var i = 0;i < bLen; i++) {
      if (isSeparatingAxis(a['pos'], b['pos'], aPoints, bPoints, b['normals'][i], response)) {
        return false;
      }
    }
    // Since none of the edge normals of A or B are a separating axis, there is an intersection
    // and we've already calculated the smallest overlap (in isSeparatingAxis).  Calculate the
    // final overlap vector.
    if (response) {
      response['a'] = a;
      response['b'] = b;
      response['overlapV'].copy(response['overlapN']).scale(response['overlap']);
    }
    return true;
  }
  SAT['testPolygonPolygon'] = testPolygonPolygon;

  return SAT;
}));

},{}],17:[function(require,module,exports){
var toLoad = "draw-canvas";
//var renderEngine = require(("../"+toLoad));
var renderEngine = require("../draw-canvas");



module.exports = renderEngine;
},{"../draw-canvas":8}],18:[function(require,module,exports){
var events = require("../events");


var Scene = function(name, sequence) {
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
  for (i = 0, len = this.cameras.length; i < len; i++) {
    for (e = 0, len = this.sequence.length; e < len; e++) {
      this.sequence[e].draw(this.cameras[i]);
    }
  }
}

Scene.prototype.addObject = function(obj) {
  this.sequence.push(obj);
}

Scene.prototype.addCamera = function(camera) {
  this.cameras.push(camera);
}



module.exports = Scene;
},{"../events":10}],19:[function(require,module,exports){
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
},{"../events":10}],20:[function(require,module,exports){
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

document.body.appendChild(renderer.DOMElement);
},{"../AI":1,"../AIComponent":2,"../camera":4,"../events":10,"../gameObject":11,"../loop":14,"../renderer":17,"../scene":18,"../scenes":19,"../vector":21}],21:[function(require,module,exports){
var Vector = require("../colliders").Vector;


Vector.prototype.reset = function() {
  this.x = 0;
  this.y = 0;

  return this;
}

Vector.prototype.distance2 = function(V) {
  return ((this.x - V.x) * (this.x - V.x) + (this.y - V.y) * (this.y - V.y));
}

Vector.prototype.distance = function(V) {    
  return Math.sqrt(this.distance2(V));
}



module.exports = Vector;
},{"../colliders":7}]},{},[20]);
