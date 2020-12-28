import IrregularVerbs from '@services/matcher/IrregularVerbs'
import Config from '@services/matcher/Config'


export default class Game {

  world = null;

  bricks = null;

  constructor(world) {
    this.world = world;
  }

  createBrick(word) {
    let brick = {
      word
    }

    brick.position = {
      x: 0, y: 0
    }

    brick.size = {
      width: word.verb.length * Config.brick.fontSize * Config.brick.widthScale,
      height: Config.brick.fontSize * Config.brick.heightScale
    }

    return brick;
  }

  getBoundingRect(brick) {
    return {
      leftUp: {
        x: brick.x,
        y: brick.y
      },

      leftDown: {
        x: brick.x,
        y: brick.y + brick.height
      },

      rightUp: {
        x: brick.x + brick.width,
        y: brick.y
      },

      rightDown: {
        x: brick.x + brick.width,
        y: brick.y + brick.height
      }
    }
  }

  collide(first, second) {
    let firstRightX = first.x + first.width;
    let secondRightY = 0;

    if (first.x > second.x
      && first.y > second.y 
      && first.width > second.width
      && first.height > second.height) 
      return true;

    if (first.x > second.x
      && first.y > second.y 
      && first.width > second.width
      && first.height > second.height) 
      return true;

    
  }

  shufflePositions(bricks) {
    for (let i = 0; i < bricks.length; i++) {
      // Generating coords
      let brick = bricks[i]; 
      
      brick.position.x = 
        Math.floor(Math.random() * (this.world.width - brick.size.width)); 

      brick.position.y = 
        Math.floor(Math.random() * (this.world.height - brick.size.height)); 

        console.log(brick.position, brick.size);
      
      continue;
      // Checking collision
      let current = this.getBoundingRect(brick);
      for (let j = 0; j < i; j++) {
     
        
      }
    }
  }

  generateBricks(words) {
    let bricks = [];

    for (let word of words) {
      let brick = this.createBrick(word);
      bricks.push(brick);
    }

    return bricks;
  }

  init  () {
    this.world.height = 
      Config.world.height;

    this.world.width = 
      Config.world.width;

    let words = 
      IrregularVerbs.slice(Config.deckLength);

    this.bricks = 
      this.generateBricks(words);

    this.shufflePositions(this.bricks);

    this.world.entities = this.bricks;

    console.log(this);
  }

  update() {
    
  }
}