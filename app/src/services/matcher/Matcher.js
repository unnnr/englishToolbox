import {Engine, Render, World, Bodies, Events} from 'matter-js'
import IrregularVerbs from '@services/matcher/IrregularVerbs'
import Collisions from '@services/matcher/Collisions'
import Config from '@services/matcher/Config'
import Bricks from '@services/matcher/Bricks'
import Groups from '@services/matcher/Groups'
import Mouse from '@services/matcher/Mouse'


export default class Matcher {
  engine = null;

  render = null;

  world = null;

  mouse = null;

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
    let words = IrregularVerbs.slice(2);
    let bricks = Bricks.collection(words);

    World.add(this.world, bricks);
  }

  collisionStart(event) {
    for (let pair of event.pairs) {
      let second = pair.bodyA;
      let first = pair.bodyB;

      if (first.label === 'brick' && second.label === 'brick') {
        if (!!!Groups.merge(first, second, this.world))
          Collisions.collideBricks(first, second);
        return;
      }

      if (first.label === 'group' && second.label === 'brick') {
        if (!!!Groups.append(first, second)) { 
          Collisions.collideGroup(first, second);
          Mouse.stopDrag(this.mouse)
        }

        return
      }

      if (second.label === 'group' && first.label === 'brick') {
        if (!!!Groups.append(second, first)){
          Collisions.collideGroup(second, first);
          Mouse.stopDrag(this.mouse)
        }
        
        return
      }
    }
  }

  beforeUpdate(event) {
    Groups.update(event);
    Bricks.update(event);
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
    this.bind()

    this.world = this.engine.world;
    this.world.gravity.y = 0;
    
    this.createWalls();
    this.createBricks();

    this.mouse = Mouse.create(this.render, this.engine);
    
    Engine.run(this.engine);
    Render.run(this.render);
  }
}