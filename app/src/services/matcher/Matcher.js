import {Engine, Render, World, Bodies, Events} from 'matter-js'
import IrregularVerbs from '@services/matcher/IrregularVerbs'
import Collisions from '@services/matcher/Collisions'
import Animations from '@services/matcher/Animations'
import Config from '@services/matcher/Config'
import Bricks from '@services/matcher/Bricks'
import Groups from '@services/matcher/Groups'
import Mouse from '@services/matcher/Mouse'


export default class Matcher {
  engine = null;

  render = null;

  world = null;

  mouse = null;

  running = false;

  constructor(canvas) {
    this.engine = Engine.create();

    this.render = Render.create({
        element: canvas,
        engine: this.engine,
        options: {
          width: 1400,
          height: 600,
          wireframes: false,
          showVelocity: true,
          background: Config.world.background,
      }
    });

    this.render.context.setLineDash([2, 4]);
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

  increaseMatched() {
    this.matched++;

    if (this.matched === Config.deckLength)
      console.log(123);
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
      Mouse.stopDrag(this.mouse)
      return false;
    }

    if (group.bricks.length === 3) {
      Groups.release(group, this.world);
      this.increaseMatched();      
    }

    return true
  }

  collisionStart(event) {
    for (let pair of event.pairs) {
      if (this.tryCollideBricks(pair))
        continue;
      
      if (this.tryCollideGroup(pair))
        continue
    }
  }

  beforeUpdate(event) {
    Groups.update(event);
    Bricks.update(event);
    Animations.update(event);
  }

  afterRender(event) {
    Bricks.drawText(this.render)
  }

  bind() {
    Events.on(this.engine, 'beforeUpdate', 
      (event) => this.beforeUpdate(event));

    Events.on(this.engine, 'collisionStart', 
      (event) => this.collisionStart(event));
      
    Events.on(this.render, 'afterRender',
      (event) => this.afterRender(event));
  }

  start() {
    Engine.clear(this.engine);
    Animations.clear();
    Bricks.clear();
    Groups.clear();
    
    this.mouse = Mouse.create(this.render, this.engine);
    this.world = this.engine.world;
    this.world.gravity.y = 0;
    this.running = true;
    
    this.createWalls();
    this.createBricks();
    this.bind()
  
    Engine.run(this.engine);
    Render.run(this.render);
  }
}