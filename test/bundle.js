(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var EventEmitter = function() {
  this._eventemitter = {
    events: {},
    proxies: {}
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
}


EventEmitter.prototype.listeners = function(event) {
  return this._eventemitter.events[event] || [];
}


EventEmitter.prototype.count = function(event) {
  return this.listeners(event).length;
}






module.exports = EventEmitter;
},{}],2:[function(require,module,exports){
var EventEmitter = require("../event-emitter");

module.exports = new EventEmitter();
},{"../event-emitter":1}],3:[function(require,module,exports){
events = require("../events");
},{"../events":2}]},{},[3]);
