import {Bodies, Events} from 'matter-js'
import Config from '@services/matcher/Config'

function randomColor() {
  return'#' + Math.floor(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0'); 
}

class Bricks {
  bind(engine) {
    Events.on(engine, 'collisionStart', function(event) {
      for (let pair of event.pairs) {
        let second = pair.bodyA;
        let first = pair.bodyB;

        if (first.label !==  'brick' || second.label !== 'brick')
          break;

        first.render.fillStyle = randomColor();
        second.render.fillStyle = randomColor();
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

    return el;
  }
}

export default new Bricks();