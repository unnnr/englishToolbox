import {World, Bodies} from 'matter-js'
import Config from '@services/matcher/Config'

function randomColor() {
  return'#' + Math.floor(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0'); 
}

class Groups {
  colorMap = {};

  throwPair(brick, group) {
    // Computing center between pair
    let center = {
      x: brick.position.x + (group.position.x - brick.position.x) / 2,
      y: brick.position.y + (group.position.y - brick.position.y) / 2,
    };

    let direction = {
      x: brick.position.x < center.x ? -1 : 1,
      y: brick.position.y < center.y ? -1 : 1,
    };

    Body.setVelocity(brick, {
      x: Config.brick.exposionVelocity * direction.x + brick.velocity.x,
      y: Config.brick.exposionVelocity * direction.y + brick.velocity.y,
    });
  }

  canGroup(first, second) {
    return first.word.key === second.word.key;
  }

  createColor(key) {
    if (!!!this.colorMap[key])
      this.colorMap[key] = randomColor();
    
    return this.colorMap[key];
  }
  
  merge(brick, group) {

  }

  create(first, second, world) {
    if (!!!this.canGroup(first, second))
      return false;

    let group = Bodies.rectangle(first.position.x, first.position.y, 300, 200, {
        render: {
          fillStyle: 'white'
        }, 

        isSensor: true,
        isStatic: true,

        words: [
          second, first
        ],

        label: 'group', 
      });

    world.bodies.unshift(group);

    return true;
  }
}

export default new Groups();