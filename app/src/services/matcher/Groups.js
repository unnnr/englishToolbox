import {Bodies, Body} from 'matter-js'
import Config from '@services/matcher/Config'

function randomColor() {
  return'#' + Math.floor(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0'); 
}

class Groups {
  colorMap = {};
  
  groups = [];

  reshape(group) {
    let padding = Config.group.padding
    let max = {x: null, y: null};
    let min = {x: null, y: null};

    for (let i = 0; i < group.bricks.length; i++) {
      let brick = group.bricks[i];

      let top =  brick.position.y - brick.height / 2,
          left =  brick.position.x - brick.width / 2,
          right = brick.position.x + brick.width / 2,
          bottom = brick.position.y + brick.height / 2

      if (top < min.y || min.y === null)
        min.y = top - padding; 
      if (left < min.x || min.x === null)
        min.x = left - padding; 

      if (bottom > max.y || max.y === null)
        max.y = bottom + padding; 
      if (right > max.x || max.x === null)
        max.x = right + padding; 
    }

    let centr = {
      x: min.x + (max.x - min.x) / 2,
      y: min.y + (max.y - min.y) / 2,
    };

    group.render.fillStyle = randomColor();

    Body.setCentre(group, centr);;
    Body.setVertices(group, [
      {x: centr.x - min.x, y: centr.y - min.y },
      {x: centr.x - max.x, y: centr.y - min.y },
      {x: centr.x - max.x, y: centr.y - max.y },
      {x: centr.x - min.x, y: centr.y - max.y },
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
    let render = {
      fillStyle: '#333344'
    }

    let el = Bodies.rectangle(0, 0, 0, 0, {
      isSensor: true,
      isStatic: true,

      label: 'group', 
      key : bricks[0].group.key,

      bricks,
      render, 
    });

    for (let brick of bricks)
      brick.group.merged = true;

    this.reshape(el);
    this.groups.push(el);

    return el;
  }
  
  merge(first, second, world) {
    if (first.group.merged || second.group.merged)
      return true;

    if (!!!this.canGroup(first, second))
      return false;

    let group = this.create([first, second]);
    world.bodies.unshift(group);

    return true;
  }

  append(group, brick) {
    if (group.key !== brick.group.key)
      return false;

    if (brick.group.merged)
      return true;

    brick.group.merged = true;
    group.bricks.push(brick);
    return true;
  }
}

export default new Groups();