import {Bodies, Body, Vertices} from 'matter-js'
import Animations from '@services/matcher/Animations'
import Config from '@services/matcher/Config'
import Bricks from '@services/matcher/Bricks'


function randomColor() {
  return'#' + Math.floor(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0'); 
}

class Groups {
  colorMap = {};
  
  groups = [];

  clear() {
    this.groups = [];
  }

  canGroup(first, second) {
    return first.group.key === second.group.key;
  }

  createColor(key) {
    if (!!!this.colorMap[key])
      this.colorMap[key] = randomColor();
    
    return this.colorMap[key];
  }

  remove(group, world) {
    for (let brick of group.bricks){
      brick.render.fillStyle = Config.brick.color;
      brick.group.merged = false;
    }

    let index = this.groups.indexOf(group);
    if (index !== -1)
      this.groups.splice(index, 1);
      
    Animations.fade(group, world)
  }

  release(group, world) {
    for (let brick of group.bricks)
      Bricks.remove(brick, world);

    this.remove(group, world);
  }

  groupeIsBroken(group) {
    for (let brick of group.bricks) {
      let distance = 
        Math.sqrt(Math.pow(group.position.x - brick.position.x, 2) +
                  Math.pow(group.position.y - brick.position.y, 2));

      if (distance > Config.group.radius)
        return true;
    }

    return false;
  }

  shrink(group) {
    for (let brick of group.bricks) {
      let distance = 
        Math.sqrt(Math.pow(group.position.x - brick.position.x, 2) +
                  Math.pow(group.position.y - brick.position.y, 2));

      let percentage = distance / Config.group.radius;
      if (percentage < .5)
        continue;

      let direction = {
        x: brick.position.x < group.position.x ? 1: -1,
        y: brick.position.y < group.position.y ? 1: -1,
      };

      Body.setVelocity(brick, {
        x: Config.group.magnet * direction.x * Math.sqrt(percentage),
        y: Config.group.magnet * direction.y * Math.sqrt(percentage),
      });
    }
  }

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

    let centre = {
      x: min.x + (max.x - min.x) / 2,
      y: min.y + (max.y - min.y) / 2,
    };
    
    let vertices = Vertices.create([
      {x: centre.x - min.x, y: centre.y - min.y },
      {x: centre.x - max.x, y: centre.y - min.y },
      {x: centre.x - max.x, y: centre.y - max.y },
      {x: centre.x - min.x, y: centre.y - max.y },
    ])

    vertices = 
      Vertices.chamfer(vertices, Config.group.borderRadius);
    
    Body.setCentre(group, centre);;
    Body.setVertices(group, vertices);
  }

  create(bricks) {
    for (let brick of bricks) {
      if (brick.group.merged)
        return;
    }
    
    // Group render
    let {key} =  
      bricks[0].group;

    let opacity =
       Math.floor(Config.group.opacity * 100).toString(16).padStart(2, '0');
    
    let color = 
      this.createColor(key);

    let render = {
      strokeStyle: color,
      fillStyle: color + opacity,
      lineWidth: 3
    }

    //  Creating body
    let el = Bodies.rectangle(0, 0, 0, 0, {
      key, bricks, render, label: 'group',
      isSensor: true, isStatic: true,
    });


    for (let brick of bricks) {
      brick.group.merged = true;
      brick.render.fillStyle = color;
    }

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

  update(event) {
    let world = event.source.world;
    for (let group of this.groups) {
      this.reshape(group);

      if (this.groupeIsBroken(group))
        this.remove(group, world);
      else 
        this.shrink(group);
    }
  } 

  lenght() {
    this.groups.length;
  }
}

export default new Groups();