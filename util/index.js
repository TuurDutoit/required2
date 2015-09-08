var util = {
  inherits: function(child, parent) {
    child._super = parent;
    child.prototype = Object.create(parent.prototype, {
      constructor: {
        value: child,
        enumerable: true,
        writable: true,
        configurable: true
      }
    });
  },
  merge: function(obj1, obj2) {
    for(var key in obj2) {
      var val = obj2[key];
      if(typeof val === "object" && typeof obj1[key] === "object") {
        util.merge(obj1[key], val);
      }
      else {
        obj1[key] = val;
      }
    }
    
    return obj1;
  }
}




if(typeof Object.create !== "function") {
  Object.create = function(o) {
    function F(){};
    f.prototype = o;
    return new F();
  }
}