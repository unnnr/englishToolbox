import {Engine, Render, World, Bodies} from 'matter-js'

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
    });

    Render.lookAt(this.render, {
      min: { x: 0, y: 0 },
      max: { x: 1400, y: 600 }
    });
  } 

  start() {
    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // add all of the bodies to the world
    World.add(this.engine.world, [boxA, boxB, ground]);

    Engine.run(this.engine);
    Render.run(this.render);
  }
}