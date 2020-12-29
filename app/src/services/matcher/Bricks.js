import {Bodies, Body, Events} from 'matter-js'
import Config from '@services/matcher/Config'
import Group from '@services/matcher/Group'

function randomColor() {
  return'#' + Math.floor(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0'); 
}

function createColor(key) {
  return '#' + ('' + key).repeat(6);
}

class Bricks {
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

        if (!!!Group.merge(first, second))
          this.throwPair(first, second);
      }
    });
  }

  collection(words) {
    return words.map(word => this.create(word))
  }

  create(word) {
    let group = word.key;

    let x = Math.floor(Math.random() * Config.world.width);
    let y = Math.floor(Math.random() * Config.world.height);

    let width = word.verb.length * Config.fontSize  * Config.brick.widthScale;
    let height = Config.fontSize * Config.brick.heightScale;

    let chamfer =  {
      radius: Config.brick.borderRadius
    };

    let render = {
      fillStyle: Group.createColor(group)
    }

    let el = Bodies.rectangle(x, y, width, height, {
      label: 'brick', chamfer, render, group
    });

    window.el = el;
    return el;
  }
}

export default new Bricks();