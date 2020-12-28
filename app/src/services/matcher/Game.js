import IrregularVerbs from '@services/matcher/IrregularVerbs'
import Config from '@services/matcher/Config'


export default class Game {

  world = null;

  bricks = null;

  constructor(world) {
    this.world = world;
  }

  createBricks(words) {
    let bricks = [];
    
    // Same for all bricks
    let height = 
      Config.brick.fontSize * Config.brick.heightScale;

    for (let word of words) {
      let width = 
        word.verb.length * Config.brick.fontSize * Config.brick.widthScale;

      let brick = {
        height, width, word
      };

      bricks.push(brick);
    }

    return bricks;
  }

  start() {
    let words = 
      IrregularVerbs.slice(Config.deckLength);

    this.bricks = 
      this.createBricks(words);

    this.world.entities = this.bricks;

    this.world.height = 
      Config.world.height;

    this.world.width = 
      Config.world.width;

    console.log(this);
  }

  update() {
    
  }
}