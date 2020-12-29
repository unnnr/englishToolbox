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
    
    let top = Bodies.rectangle( width / 2, size / -2, width, size, { isStatic: true }),
        left = Bodies.rectangle(size / -2, height / 2, size, height, { isStatic: true }),
        right = Bodies.rectangle(width + size / 2, height / 2, size, height, { isStatic: true }),
        bottom = Bodies.rectangle(width / 2, height + size / 2, width, size, { isStatic: true });

    World.add(this.engine.world, [top, bottom, right, left]);
  }

  initMouse() {
    var mouse = Mouse.create(this.render.canvas);

    let mouseConstraint = MouseConstraint.create(this.engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.005,
            render: {
                visible: true
            }
        }
    });
      
    this.render.mouse = mouse;
    World.add(this.engine.world, mouseConstraint);
  }

  start() {
    Engine.clear(this.engine)

    this.createWalls();
    this.initMouse();
    

    this.engine.world.gravity.y = 0;
    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);

    World.add(this.engine.world, [boxA, boxB]);



    Engine.run(this.engine);
    Render.run(this.render);
  }
}