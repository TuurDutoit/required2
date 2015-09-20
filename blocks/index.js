var Block = require("../block");
var Image = require("../image");
var EmptyBlock = require("../empty-block");
var Vector = require("../vector");

var blocks = {
  addBlock: function(block) {
    blocks[block.name] = block;
    blocks.ids[block.id.toString()] = block;
    
    return blocks;
  },
  
  addBlocks: function(list) {
    for(i = 0, len = list.length; i < len; i++) {
      blocks.addBlock(list[i]);
    }
    
    return blocks;
  },
  
  getBlockById: function(id){
    if(typeof id === "number"){
      return blocks.ids[id.toString()];
    }
    else if(typeof id === "string"){
      return blocks.ids[id];
    }
    else if(typeof id === "undefined"){
      return blocks.ids[0];
    }
    else{
      return id;
    }
  },
  ids: {}
};

blocks.addBlock(new EmptyBlock());
blocks.addBlock(new Block("standard", 1, new Image(document.getElementById("bricks")), new Vector(), new Vector(36,36), 0));

module.exports = blocks;