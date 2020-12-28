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

  collide(firstBrick, secondBrick) {
    let first = {
      top: firstBrick.position.y,
      left: firstBrick.position.x,
      right: firstBrick.position.x + firstBrick.size.width,
      bottom: firstBrick.position.y + firstBrick.size.height
    };

    let second = {
      top: secondBrick.position.y,
      left: secondBrick.position.x,
      right: secondBrick.position.x + secondBrick.size.width,
      bottom: secondBrick.position.y + secondBrick.size.height
    };

    if (first.left >= second.left
      && first.left <= second.right
      && first.top >= second.top
      && first.top <= second.bottom)
      return console.log('left top') || true;

    if (first.left >= second.left
      && first.left <= second.right
      && first.bottom >= second.top
      && first.bottom <= second.bottom)
      return console.log('left bottom') || true;

    
    if (first.right >= second.left
      && first.right <= second.right
      && first.top >= second.top
      && first.top <= second.bottom)
      return console.log('right top') || true;

    if (first.right >= second.left
      && first.right <= second.right
      && first.bottom >= second.top
      && first.bottom <= second.bottom)
      return console.log('right bottom') ||  true;

    return false;
    if (first.left >= second.left         // ╔════════════╗
      && first.position.x <= secondRight        //      s ┌────────────┐
      && first.position.y >= second.position.y  //              f
      && first.position.y <= secondBottom)      // ╚════════════╝
      return true;                              //        └────────────┘
    
    if (first.position.x >= second.position.x             //        ┌────────────┐
      && first.position.x <= secondRight         // ╔════════════╗
      && firstBottom >= second.position.y        //              f
      && firstBottom <= secondBottom)   //      s └────────────┘
      return true;                      // ╚════════════╝

    if (firstRight >= second.position.x          //        ╔════════════╗
      && firstRight <= secondRight      // ┌────────────┐
      && first.position.y <= second.position.y            //              s
      && first.position.y >= secondBottom)       //      f ╚════════════╝
      return true;                      // └────────────┘

    if (firstRight >= second.position.x          // ┌────────────┐
      && firstRight <= secondRight      //      f ╔════════════╗
      && firstBottom >= second.position.y        //              s
      && firstBottom <= secondBottom)   // └────────────┘
      return true;                      //        ╚════════════╝

    return false;
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
      continue;
      for (let j = 0; j < i; j++) {
        let preivous = this.bricks[j];
        
        preivous.color = 
          this.collide(current, preivous) ? 'red' : 'black';
      }
    }

    for (let i = 0; i < bricks.length; i++) {
      for (let j = 0; j < bricks.length; j++) {
        if (i === j || !!!this.collide(bricks[i], bricks[j]))
          continue;
        
        console.log(bricks[i], bricks[j]);
        bricks[i].color = 'red';
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