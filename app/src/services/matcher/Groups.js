import {Bodies, Body} from 'matter-js'
import Config from '@services/matcher/Config'

function randomColor() {
  return'#' + Math.floor(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0'); 
}

class Groups {
  colorMap = {};
  
  groups = [];

  reshape(group) {
    let start = Date.now();

    group.render.fillStyle = randomColor();

    // let centr =  {x: 600, y: 400};
    
    // Computing all points
    let points = [];
    for (let i = 0; i < group.bricks.length; i++) {
      let brick = group.bricks[i];
      
      let bounds = {
        top:  brick.position.y - brick.height / 2,
        left:  brick.position.x - brick.width / 2,
        right: brick.position.x + brick.width / 2,
        bottom: brick.position.y + brick.height / 2
      };

      points.push(
        { x: bounds.left,  y: bounds.top },
        { x: bounds.right, y: bounds.top },
        { x: bounds.right, y: bounds.bottom },
        { x: bounds.left,  y: bounds.bottom }
      );
    }

    // Sorting points
    let byX = [...points].sort((first, second) =>
      first.x <= second.x ? -1 : 1);
    
    let byY = [...points].sort((first, second) =>
      first.y <= second.y ? -1 : 1);

    // Computing centr
    let min = {
      x: byX[0].x, y: byY[0].y
    };

    let max = {
      x: byX[byX.length - 1].x, y: byY[byY.length - 1].y
    };

    let centr = {
      x: min.x + (max.x - min.x) / 2,
      y: min.y + (max.y - min.y) / 2,
    };

    Body.setCentre(group, centr);;
    Body.setVertices(group, [
      {x: centr.x - min.x, y: centr.y - min.y },
      {x: centr.x - max.x, y: centr.y - min.y },
      {x: centr.x - max.x, y: centr.y - max.y },
      {x: centr.x - min.x, y: centr.y - max.y },
    ]);

    console.log(  '----');
    console.log({x: centr.x - min.x, y: centr.y - min.y });
    console.log({x: centr.x - max.x, y: centr.y - min.y });
    console.log({x: centr.x - max.x, y: centr.y - max.y });
    console.log({x: centr.x - min.x, y: centr.y - max.y });

    return;


    return;
   /*  let shapes = [];

    for (let brick of group.bricks) {
      let bounds = {
        top:  brick.position.y - brick.height / 2,
        left:  brick.position.x - brick.width / 2,
        right: brick.position.x + brick.width / 2,
        bottom: brick.position.y + brick.height / 2
      };

      shapes.push([ 
        { x: centr.x - bounds.left,  y: centr.y - bounds.top },
        { x: centr.x - bounds.right, y: centr.y - bounds.top },
        { x: centr.x - bounds.right, y: centr.y - bounds.bottom }, 
        { x: centr.x - bounds.left,  y: centr.y - bounds.bottom }
      ])
    }

    let path = [...shapes[0]];

    for (let shape of shapes.splice(1))  {
      if ()
    }

    console.log(path, group);

    Body.setVertices(group, path);

    console.log('teken ', Date.now() - start); */
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
      fillStyle: '#333344'
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