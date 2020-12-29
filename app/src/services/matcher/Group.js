import {World, Bodies} from 'matter-js'
import Config from '@services/matcher/Config'

function randomColor() {
  return'#' + Math.floor(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0'); 
}

class Group {
  colorMap = {};

  canGroup(first, second) {
    return first.word.key === second.word.key;
  }

  createColor(key) {
    if (!!!this.colorMap[key])
      this.colorMap[key] = randomColor();
    
    return this.colorMap[key];
  }

  merge(first, second, world) {
    if (!!!this.canGroup(first, second))
      return false;

    let group = Bodies.rectangle(first.position.x, first.position.y, 300, 200, {
        render: {
          fillStyle: 'white'
        }, 
        isSensor: true,

        isStatic: true,

        label: 'group', 
      });

    world.bodies.unshift(group);

    return true;
  }
}

export default new Group();