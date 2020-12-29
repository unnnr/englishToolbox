import {Bodies, Events} from 'matter-js'
import Config from '@services/matcher/Config'

class Bricks {
  bind(engine) {
    Events.on(engine, 'collisionStart', function(event) {
      for (let pair of event.pairs)
        console.log(pair.bodyA, pair.bodyB)
    });
  }

  create(word) {
    let x = Math.floor(Math.random() * Config.world.width);
    let y = Math.floor(Math.random() * Config.world.height);

    let radius = Config.brick.borderRadius;

    let el = Bodies.rectangle(x, y, 80, 50, {chamfer: { radius }});

    return el;
  }
}

export default new Bricks();