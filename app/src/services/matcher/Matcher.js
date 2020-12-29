import {Engine, Render, World, Bodies, Mouse, MouseConstraint} from 'matter-js'
import Config from '@services/matcher/Config'

export default class Matcher {
  engine = null;

  render = null;

  constructor(canvas) {
    this.engine = Engine.create();

    this.render = Render.create({
        element: canvas,
        engine: this.engine,
        options: {
          width: 1400,
          height: 600,
      }
    })
  } 

  createWalls() {
    let width = Config.world.width,
        height = Config.world.height,
        size = 100;
    
    var top = Bodies.rectangle( width / 2, size / -2, width, size, { isStatic: true }),
        left = Bodies.rectangle(size / -2, height / 2, size, height, { isStatic: true }),
        right = Bodies.rectangle(width + size / 2, height / 2, size, height, { isStatic: true }),
        bottom = Bodies.rectangle(width / 2, height + size / 2, width, size, { isStatic: true });

    return  [top, bottom, right, left];
  }

  start() {
    Engine.clear(this.engine)

    var mouse = Mouse.create(this.render.canvas),
    mouseConstraint = MouseConstraint.create(this.engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.005,
            render: {
                visible: false
            }
        }
    });

    World.add(this.engine.world, mouseConstraint);

    this.render.mouse = mouse;
    
    this.createWalls();

    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);

    World.add(this.engine.world, this.createWalls());
    World.add(this.engine.world, [boxA, boxB]);



    Engine.run(this.engine);
    Render.run(this.render);
  }
}