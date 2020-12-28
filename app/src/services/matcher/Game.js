import IrregularVerbs from '@services/matcher/IrregularVerbs'
import Config from '@services/matcher/Config'


export default class Game {

  world = null;

  constructor(world) {
    this.world = world;
  }

  createBricks(words) {
    let bricks = [];

    for (let word of words) {
      let brick = {};

      // brick.height = 
    }
  }

  start() {
    this.world.height = 
      Config.world.height;

    this.world.width = 
      Config.world.width;

    let words = 
      IrregularVerbs.slice(Config.deckLength);

    this.world.entities = 
      this.createBricks(words);
  }

  update() {
    
  }
}