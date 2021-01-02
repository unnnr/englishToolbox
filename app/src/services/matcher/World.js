import {Bodies, World} from 'matter-js'
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

    console.log(this.matches, Config.deckLength);

    if (this.matches === Config.deckLength)
      this.finished = true;
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