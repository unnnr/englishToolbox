import {Bodies, Body, Events} from 'matter-js'
import Config from '@services/matcher/Config'

function randomColor() {
  return'#' + Math.floor(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0'); 
}
window.Body =Body;

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

  bind(engine) {
    Events.on(engine, 'collisionStart', (event) => {
      for (let pair of event.pairs) {
        let second = pair.bodyA;
        let first = pair.bodyB;

        if (first.label !==  'brick' || second.label !== 'brick')
          break;

        this.throwPair(first, second);

        // second.explosion = center
        // first.explosion = center;

        first.render.fillStyle = randomColor();
        second.render.fillStyle = randomColor();
      }
    });

    Events.on(engine, 'beforeUpdate123', (event) => {
      for (let i = 0; i < this.bricks.length; i++) {
        let brick = this.bricks[i];
        if (!!!brick.explosion)
          continue;

        Body.applyForce(brick, brick.explosion, {x: 0.2, y: 0.2,});
        console.log(brick.explosion);
        brick.explosion = null;

      }
    });
  }

  create(word) {
    let x = Math.floor(Math.random() * Config.world.width);
    let y = Math.floor(Math.random() * Config.world.height);

    let width = 80;
    let height = 50;

    let chamfer =  {
      radius: Config.brick.borderRadius
    };

    let render = {
      fillStyle: randomColor()
    }

    let el = Bodies.rectangle(x, y, width, height, {
      label: 'brick', chamfer, render,
    });

    window.el = el;
    
    this.bricks.push(el);

    return el;
  }
}

export default new Bricks();