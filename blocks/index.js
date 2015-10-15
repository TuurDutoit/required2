var Block = require("../block");
var Image = require("../image");
var Sprite = require("../sprite");
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
blocks.addBlock(new Block("ground", 1, new Sprite("tileset2", new Vector(), new Vector(16,16)), new Vector(), new Vector(36,36), 0, true));
blocks.addBlock(new Block("bricks", 2, new Sprite("tileset2", new Vector(16*1, 16*0), new Vector(16,16)), new Vector(), new Vector(36,36), 0, true));
blocks.addBlock(new Block("questionBlock", 3, new Sprite("tileset1", new Vector(16*0, 16*5), new Vector(16,16)), new Vector(), new Vector(36,36), 0, true));
blocks.addBlock(new Block("pipeBody", 4, new Sprite("tileset2", new Vector(16*0, 16*9), new Vector(16 * 2,16)), new Vector(), new Vector(36 * 2,36), 0, true));
blocks.addBlock(new Block("pipeTop", 5, new Sprite("tileset2", new Vector(16*0, 16*8), new Vector(16 * 2,16)), new Vector(), new Vector(36 * 2,36), 0, true));
blocks.addBlock(new Block("solidBlock", 6, new Sprite("tileset2", new Vector(16*0, 16*1), new Vector(16,16)), new Vector(), new Vector(36,36), 0, true));
blocks.addBlock(new Block("leftBush", 7, new Sprite("tileset2", new Vector(16*11, 16*9), new Vector(16,16)), new Vector(), new Vector(36,36), 0), 0, false);
blocks.addBlock(new Block("middleBush", 8, new Sprite("tileset2", new Vector(16*12, 16*9), new Vector(16,16)), new Vector(), new Vector(36,36), 0), 0, false);
blocks.addBlock(new Block("rightBush", 9, new Sprite("tileset2", new Vector(16*13, 16*9), new Vector(16,16)), new Vector(), new Vector(36,36), 0), 0, false);
//blocks.addBlock(new Block("standard", 4, new Image("bricks"), new Vector(), new Vector(36,36), 0));

module.exports = blocks;