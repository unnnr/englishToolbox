import {Bodies, Body} from 'matter-js'
import Config from '@services/matcher/Config'

function randomColor() {
  return'#' + Math.floor(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0'); 
}

class Groups {
  colorMap = {};
  
  groups = [];

  reshape(group) {
    Body.setVertices(group, [
      { x: -100, y: -100 },
      { x: 120, y: -100 },
      { x: 100, y: 100 },
      { x: -100, y: 100 }
    ]);
  }

  update() {
    for (let group of this.groups)
      this.reshape(group);
  } 

  canGroup(first, second) {
    return first.group.key === second.group.key;
  }

  createColor(key) {
    if (!!!this.colorMap[key])
      this.colorMap[key] = randomColor();
    
    return this.colorMap[key];
  }

  create(bricks) {
    let height = 300;
    let width = 300;

    let x = bricks[0].position.x;
    let y = bricks[0].position.y;

    let render = {
      fillStyle: 'white'
    }

    let el = Bodies.rectangle(x, y, width, height, {
      isSensor: true,
      isStatic: true,

      label: 'group', 
      key : bricks[0].group.key,

      bricks,
      render, 
    });

    this.reshape(el);
    this.groups.push(el);

    return el;
  }
  
  merge(first, second, world) {
    if (!!!this.canGroup(first, second))
      return false;

    let group = this.create([first, second]);
    world.bodies.unshift(group);

    return true;
  }

  append(group, brick) {
    if (group.key !== brick.group.key)
      return false;

    return true;
  }
}

export default new Groups();