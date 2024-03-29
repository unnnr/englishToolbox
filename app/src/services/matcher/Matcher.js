import {Engine, Render, Events, Runner} from 'matter-js'
import Animations from '@services/matcher/Animations'
import Config from '@services/matcher/Config'
import Groups from '@services/matcher/Groups'
import Bricks from '@services/matcher/Bricks'
import World from '@services/matcher/World'
import Mouse from '@services/matcher/Mouse'


export default class Matcher {
  engine = null;

  render = null;

  world = null;

  mouse = null;

  runner = null;

  running = false;

  constructor(canvas) {
    this.engine = Engine.create();

    this.render = Render.create({
        element: canvas,
        engine: this.engine,
        options: {
          width: Config.world.width,
          height: Config.world.height,
          wireframes: false,
          background: Config.world.background,
      }
    });

    this.runner = Runner.create();
  } 

  bind() {
    Events.on(this.engine, 'beforeUpdate', 
      (event) => this.beforeUpdate(event));

    Events.on(this.engine, 'collisionStart', 
      (event) => this.collisionStart(event));
      
    Events.on(this.render, 'afterRender',
      (event) => this.afterRender(event));
  }

  collisionStart(event) {
    for (let pair of event.pairs) {
      if (this.world.tryCollideBricks(pair))
        continue;
      
      if (this.world.tryCollideGroup(pair))
        continue

      if (this.world.tryCollideEdge(pair))
        continue
    }

    if (this.world.finished)
      this.stop();
  }

  beforeUpdate(event) {
    Groups.update(event);
    Bricks.update(event);
    Animations.update(event);
  }

  afterRender(event) {
    Bricks.drawText(this.render)
  }

  start(words) {
    Engine.clear(this.engine);
    Animations.clear();
    Bricks.clear();
    Groups.clear();
    
    this.mouse = Mouse.create(this.render, this.engine);
    this.world = new World(this.engine.world, this.mouse, words);
    this.running = true;
    this.bind()
  
    Render.run(this.render);
    Runner.run(this.runner, this.engine);
  }

  stop() {
    this.world.clear();
  }

  clear() {
    this.world.clear();

    Mouse.clear(this.render);
    Engine.clear(this.engine);
    Render.stop(this.render);
    Runner.stop(this.runner)

    this.render.canvas.remove();
    this.render.canvas = null;
    this.render.context = null;
  }

  resize() {
    this.world.resize();
  }
}