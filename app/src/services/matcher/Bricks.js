import {Bodies, Body, Events} from 'matter-js'
import Config from '@services/matcher/Config'
import Group from '@services/matcher/Group'

class Bricks {
  bricks = [];

  throwPair(first, second) {
    // Computing center between pair
    let center = {
      x: first.position.x + (second.position.x - first.position.x) / 2,
      y: first.position.y + (second.position.y - first.position.y) / 2,
    };

    let direction = null;

    // Throwing first away from center
    direction = {
      x: first.position.x < center.x ? -1 : 1,
      y: first.position.y < center.y ? -1 : 1,
    };

    Body.setVelocity(first, {
      x: Config.brick.exposionVelocity * direction.x + first.velocity.x,
      y: Config.brick.exposionVelocity * direction.y + first.velocity.y,
    });

    // Throwing second away from center
    direction = {
      x: second.position.x < center.x ? -1 : 1,
      y: second.position.y < center.y ? -1 : 1,
    };

    Body.setVelocity(second, {
      x: Config.brick.exposionVelocity * direction.x + second.velocity.x,
      y: Config.brick.exposionVelocity * direction.y + second.velocity.y,
    });
  }

  bind(engine, render) {
    Events.on(engine, 'collisionStart', (event) => {
      for (let pair of event.pairs) {
        let second = pair.bodyA;
        let first = pair.bodyB;

        if (first.label !==  'brick' || second.label !== 'brick')
          break;

        if (!!!Group.merge(first, second))
          this.throwPair(first, second);
      }
    });

    Events.on(render, 'afterRender', (event) => {
      let context =  render.context;
      context.textBaseline = 'middle';
      context.textAlign = 'center';

      context.font = 
        Config.font.size + 'px Arial';

      context.fillStyle = 
        Config.font.color;

      for (let brick of this.bricks) {
        context.fillText(brick.word.verb,
                         brick.position.x,
                         brick.position.y);
      }
   });
  }

  collection(words) {
    return words.map(word => this.create(word))
  }

  create(word) {
    let x = Math.floor(Math.random() * Config.world.width);
    let y = Math.floor(Math.random() * Config.world.height);

    let width = word.verb.length * Config.font.size * Config.brick.widthScale;
    let height = Config.font.size * Config.brick.heightScale;

    let chamfer =  {
      radius: Config.brick.borderRadius
    };

    let render = {
      fillStyle: Group.createColor(word.key)
    }

    let el = Bodies.rectangle(x, y, width, height, {
      chamfer, render, word, 
      inertia: Infinity,
      label: 'brick', 
    });

    window.el = el;

    this.bricks.push(el);

    return el;
  }
}

export default new Bricks();