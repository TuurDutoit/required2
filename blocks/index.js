var Block = require("../block");
var EmptyBlock = require("../empty-block");
var Vector = require("../vector");

var blocks = {
  addBlock: function(block) {
    blocks[block.name] = block;
    blocks.ids[block.id.toString()] = block;
    
    return blocks;
  },
  getBlockById: function(id){
    return blocks.ids[id.toString()];
  },
  ids: {}
};

blocks.addBlock(new EmptyBlock());
blocks.addBlock(new Block("standard", 1, document.getElementById("bricks"), new Vector(), new Vector(36,36), 0));

module.exports = blocks;