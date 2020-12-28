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

  collide(first, second) {
    let secondRight= second.position.x + second.size.width;
    let secondBottom = second.position.y + second.size.height;
    
    let firstRight = first.position.x + first.size.width;
    let firstBottom = first.position.y + first.size.height;

    if (first.position.x >= second.position.x            // ╔════════════╗
      && first.position.x <= secondRight        //      s ┌────────────┐
      && first.position.y >= second.position.y           //              f
      && first.position.y <= secondBottom)      // ╚════════════╝
      return true;                     //        └────────────┘
    
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
      let current = bricks[i]; 
      
      current.position.x = 
        Math.floor(Math.random() * (this.world.width - current.size.width)); 

      current.position.y = 
        Math.floor(Math.random() * (this.world.height - current.size.height)); 

      // Checking collision
      for (let j = 0; j < i; j++) {
        let preivous = this.bricks[j];
        
        if (this.collide(current, preivous))
          preivous.color = 'red';
        else 
          preivous.color = 'black'

        console.log(this.collide(current, preivous));
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