import {Bodies, Body, World} from 'matter-js'
import IrregularVerbs from '@services/matcher/IrregularVerbs'
import Collisions from '@services/matcher/Collisions'
import Groups from '@services/matcher/Groups'
import Bricks from '@services/matcher/Bricks'
import Config from '@services/matcher/Config'
import Mouse from '@services/matcher/Mouse'


class MatcherWorld {
  world = null;

  mouse = null;

  matches = 0;

  finshed = false;

  constructor(world, mouse) {
    this.mouse = mouse
    this.world = world
    this.world.gravity.y = 0;

    this.createWalls();
    this.createBricks();
  }

  increaseMatched() {
    this.matches++;

    if (this.matches === Config.deckLength)
      this.finished = true;
  }

  locateBricks(bricks) {
    let margin = Config.world.spawnMargin;

    for (let i = 0; i < bricks.length; i++) {
      let brick = bricks[i];
      let position = {
        x: Math.floor(Math.random() * (Config.world.width - brick.width - 2 * margin) + margin),
        y: Math.floor(Math.random() * (Config.world.height - brick.height - 2 * margin)  + margin),
      }

      Body.setPosition(brick, position);

      // Looking for intersections
      for (let j = 0; j < i; j++) {
        let previous = bricks[j];
        let x = Math.max(brick.position.x, previous.position.x - margin);
        let y = Math.max(brick.position.y, previous.position.y - margin);
        let x2 = Math.min(brick.position.x + brick.width, previous.position.x + previous.width + margin);
        let y2 = Math.min(brick.position.y + brick.height, previous.position.y + previous.height + margin);

        if (x2 < x || y2 < y) 
          continue;

        i--;
        break;
      }
    } 

    return bricks;
  }
  
  createWalls() {
    let width = Config.world.width,
        height = Config.world.height,
        size = 1000;
    
    let top = Bodies.rectangle( width / 2, size / -2, width, size, { isStatic: true }),
        left = Bodies.rectangle(size / -2, height / 2, size, height, { isStatic: true }),
        right = Bodies.rectangle(width + size / 2, height / 2, size, height, { isStatic: true }),
        bottom = Bodies.rectangle(width / 2, height + size / 2, width, size, { isStatic: true });

    World.add(this.world, [top, bottom, right, left]);
  }

  createBricks() {
    let words = IrregularVerbs.slice(Config.deckLength);
    let bricks = Bricks.collection(words);

    this.locateBricks(bricks);

    World.add(this.world, bricks);
  }

  getBricksFromPair({bodyA, bodyB}) {
    if (bodyA.label === 'brick' && bodyB.label === 'brick')
      return [bodyA, bodyB];

    return [null, null];
  }

  getGroupBrickFromPair({bodyA, bodyB}) {
    let group = null,
        brick = null;

    if (bodyA.label === 'group')
      group = bodyA;
    else if (bodyB.label === 'group') 
      group = bodyB;

    if (bodyA.label === 'brick') 
      brick = bodyA;
    else if (bodyB.label === 'brick') 
      brick = bodyB;

    return [group, brick];
  }

  tryCollideBricks(pair) {
    let [first, second] = this.getBricksFromPair(pair);
    if (!!!first || !!!second)
      return false;

    if (Groups.merge(first, second, this.world))
      return true

    Collisions.collideBricks(first, second);
    return false;  
  }

  tryCollideGroup(pair) {
    let [group, brick] = this.getGroupBrickFromPair(pair);
    if (!!!brick || !!!group)
      return false;

    if (!!!Groups.append(group, brick)) { 
      Collisions.collideGroup(group, brick);
      Mouse.drop(this.mouse, brick);
      return false;
    }

    if (group.bricks.length === 3) {
      Groups.release(group, this.world);
      this.increaseMatched();      
    }

    return true
  }


  clear() {
    World.clear(this.world);
  }
}

export default MatcherWorld;