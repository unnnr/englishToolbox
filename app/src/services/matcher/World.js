import {Bodies, Body, World, Vertices} from 'matter-js'
import Collisions from '@services/matcher/Collisions'
import Animations from '@services/matcher/Animations'
import Groups from '@services/matcher/Groups'
import Bricks from '@services/matcher/Bricks'
import Config from '@services/matcher/Config'
import Mouse from '@services/matcher/Mouse'


class MatcherWorld {
  world = null;

  mouse = null;

  matches = 0;

  finshed = false;

  words  = [];

  constructor(world, mouse, words) {
    this.mouse = mouse
    this.world = world
    this.world.gravity.y = 0;

    this.createWalls();
    this.createBricks(words);
  }

  increaseMatched() {
    this.matches++;

    if (this.matches === Config.deckLength)
      this.finished = true;
  }

  locateBricks(bricks) {
    let margin = Config.world.spawnMargin;
    let uiCutout =  Config.world.uiCutout;

    for (let i = 0; i < bricks.length; i++) {
      let brick = bricks[i];
      let position = {
        x: Math.floor(Math.random() * (Config.world.width - brick.width - 2 * margin) + margin),
        y: Math.floor(Math.random() * (Config.world.height - brick.height - 2 * margin)  + margin),
      }

      
      if (position.x > uiCutout.x - margin 
          && position.y > uiCutout.y - margin 
          && position.x < uiCutout.x + uiCutout.width + margin
          && position.y < uiCutout.y + uiCutout.height + margin) {
          i--;
          
        continue;
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

  uiOptions() {
    let config = Config.world.uiCutout;

    let ui = {
      x: config.width / 2 + config.x, 
      y: config.height / 2 - config.y, 
      width: config.width, 
      height: config.height
    };

    return ui;
  }
  
  createWalls() {
    let width = Config.world.width,
        height = Config.world.height,
        size = 1000;

    let options = {
      label: 'edge',
      isStatic: true,
      render: {visible: false}  
    }
    
    let top = Bodies.rectangle( width / 2, size / -2, width, size, options),
        left = Bodies.rectangle(size / -2, height / 2, size, height, options),
        right = Bodies.rectangle(width + size / 2, height / 2, size, height, options),
        bottom = Bodies.rectangle(width / 2, height + size / 2, width, size, options);


    let uiOptions = {
      x: Config.world.uiCutout.width / 2 + Config.world.uiCutout.x, 
      y: Config.world.uiCutout.height / 2 - Config.world.uiCutout.y, 
      width: Config.world.uiCutout.width, 
      height: Config.world.uiCutout.height
    };

    let ui = Bodies.rectangle(
      uiOptions.x,
      uiOptions.y,
      uiOptions.width,
      uiOptions.height,
      options);

    this.walls = [top, bottom, right, left, ui];

    World.add(this.world, this.walls);
  }

  createBricks(words) {
    let bricks = Bricks.collection(words);

    this.locateBricks(bricks);
    this.words = words;

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

  getEdgeFromPair({bodyA, bodyB}) {
    if (bodyA.label === 'edge' && bodyB.label !== 'edge')
      return [bodyA, bodyB];

    if (bodyB.label === 'edge' && bodyA.label !== 'edge')
      return [bodyB, bodyA];

    return [null, null];
  }

  tryCollideEdge(pair) {
    let [edge, brick] = this.getEdgeFromPair(pair);

    if (edge && brick)
      Mouse.drop(this.mouse, brick);
  }

  tryCollideBricks(pair) {
    let [first, second] = this.getBricksFromPair(pair);
    if (!!!first || !!!second)
      return false;

    let captured = Mouse.captured(this.mouse, first)
      || Mouse.captured(this.mouse, second);

    if (!!!captured)
      return;

    if (Groups.merge(first, second, this.world))
      return true

    Collisions.collideBricks(first, second, captured);

    if (!!!first.group.merged)
      Animations.blink(first);

    if (!!!second.group.merged)
      Animations.blink(second);

    return false;  
  }

  tryCollideGroup(pair) {
    let [group, brick] = this.getGroupBrickFromPair(pair);
    let captured = Mouse.captured(this.mouse, brick);

    if (!!!brick || !!!group)
      return false;

    if (!!!Groups.append(group, brick)) { 
      Collisions.collideGroup(group, brick, captured);
      Mouse.drop(this.mouse, brick);
      Animations.blink(brick);
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
  
  resize() {
    for (let wall of this.walls)
      World.remove(this.world, wall);

    this.createWalls();
  }
}

export default MatcherWorld;