var util = {
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