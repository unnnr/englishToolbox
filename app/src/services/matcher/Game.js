import Collisions from '@services/matcher/MatcherCollisions'
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

    brick.velocity = {
      x: 0, y: 0
    }

    brick.size = {
      width: word.verb.length * Config.brick.fontSize * Config.brick.widthScale,
      height: Config.brick.fontSize * Config.brick.heightScale
    }

    return brick;
  }
 
  shufflePositions(bricks) {
    for (let i = 0; i < bricks.length; i++) {
      // Generating coords
      let current = bricks[i]; current
      
      current.position.x = 
        Math.floor(Math.random() * (this.world.width - current.size.width)); 

      current.position.y = 
        Math.floor(Math.random() * (this.world.height - current.size.height)); 

      // Checking collision
      for (let j = 0; j < i; j++) {
        let previous = bricks[j];

        if (!!!Collisions.canGroup(current, previous))
          continue

        i--;
        break;
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

  init() {
    // Setting up global vars
    this.world.height = 
      Config.world.height;

    this.world.width = 
      Config.world.width;

    // Creating entities
    let words = 
      IrregularVerbs.slice(Config.deckLength);

    this.bricks = 
      this.generateBricks(words);

    this.shufflePositions(this.bricks);
    this.world.entities = this.bricks;

    window.grv = this.giveRandomVelocity.bind(this);
    // setInterval(this.giveRandomVelocity.bind(this), 500);
  }

  move(brick, time) {
    brick.position.x += time * brick.velocity.x * Config.brick.speed;
    brick.position.y += time * brick.velocity.y * Config.brick.speed;

    if (brick.velocity.x > 0) {
      brick.velocity.x = 
        Math.max(brick.velocity.x - Config.brick.friction, 0);
    }
    else if (brick.velocity.x < 0) {
      brick.velocity.x = 
        Math.min(brick.velocity.x + Config.brick.friction, 0);
    }

    if (brick.velocity.y > 0) {
      brick.velocity.y = 
        Math.max(brick.velocity.y - Config.brick.friction, 0);
    }
    else if (brick.velocity.y < 0) {
      brick.velocity.y = 
        Math.min(brick.velocity.y + Config.brick.friction, 0);
    }
  }

  update(event, delta) {
    for (let i = 0; i < this.bricks.length; i++) {
      this.move(this.bricks[i], delta);
      
      for (let j = 0; j < this.bricks.length; j++) {
        if (i !== j && Collisions.collideEntity(this.bricks[i], this.bricks[j]))
          console.log(12);
      }
    }
  }

  giveRandomVelocity() {
    let index = 
      Math.floor(Math.random() * (this.bricks.length - 1));

    this.bricks[index].velocity = {
      x: Math.random() * 60 - 30,
      y: Math.random() * 60 - 30,
    }
  }
}