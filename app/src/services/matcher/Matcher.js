import {Engine, Render, World, Bodies, Mouse, MouseConstraint, Events} from 'matter-js'
import IrregularVerbs from '@services/matcher/IrregularVerbs'
import Config from '@services/matcher/Config'
import Bricks from '@services/matcher/Bricks'

export default class Matcher {
  engine = null;

  render = null;

  world = null;

  constructor(canvas) {
    this.engine = Engine.create();

    this.render = Render.create({
        element: canvas,
        engine: this.engine,
        options: {
          width: 1400,
          height: 600,
          wireframes: false
      }
    });
  } 

  createWalls() {
    let width = Config.world.width,
        height = Config.world.height,
        size = 100;
    
    let top = Bodies.rectangle( width / 2, size / -2, width, size, { isStatic: true }),
        left = Bodies.rectangle(size / -2, height / 2, size, height, { isStatic: true }),
        right = Bodies.rectangle(width + size / 2, height / 2, size, height, { isStatic: true }),
        bottom = Bodies.rectangle(width / 2, height + size / 2, width, size, { isStatic: true });

    World.add(this.world, [top, bottom, right, left]);
  }

  createBricks() {
    let words = IrregularVerbs.slice(10);
    let bricks = Bricks.collection(words);

    World.add(this.world, bricks);
  }

  initMouse() {
    var mouse = Mouse.create(this.render.canvas);

    let mouseConstraint = MouseConstraint.create(this.engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.1,
            render: {
                visible: true
            }
        }
    });
      
    this.render.mouse = mouse;
    World.add(this.world, mouseConstraint);
  }

  start() {
    Engine.clear(this.engine);
    Bricks.bind(this.engine, this.render);

    this.world = this.engine.world;
    this.world.gravity.y = 0;
    
    this.createWalls();
    this.createBricks();
    this.initMouse();
    
    Engine.run(this.engine);
    Render.run(this.render);
  }
}