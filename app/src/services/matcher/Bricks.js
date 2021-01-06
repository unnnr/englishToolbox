import {Bodies, Body} from 'matter-js'
import Config from '@services/matcher/Config'
import Animations from '@services/matcher/Animations'


class Bricks {
  bricks = [];

  clear() {
    this.bricks = [];
  }

  drawText(render) {
    let context =  render.context;
    context.textBaseline = 'middle';
    context.textAlign = 'center';

    context.font = 
      Config.font.size + 'px Arial';

    for (let brick of this.bricks) {
      context.fillStyle = 
        brick.render.strokeStyle;

      context.fillText(brick.group.verb,
                       brick.position.x,
                       brick.position.y);
    }
  }

  remove(brick, world) {
    let index = this.bricks.indexOf(brick);
    if (index !== -1)
      this.bricks.splice(index, 1);

    Animations.fade(brick, world)
  }

  create(group) {
    let x = Math.floor(Math.random() * Config.world.width);
    let y = Math.floor(Math.random() * Config.world.height);

    let width = group.verb.length * Config.font.size * Config.brick.widthScale;
    let height = Config.font.size * Config.brick.heightScale;

    let chamfer =  {
      radius: Config.brick.borderRadius
    };

    let render = {
      fillStyle: '#ffffff',
      lineWidth: Config.brick.borderSize,
      strokeStyle: Config.brick.color,
    }

    let el = Bodies.rectangle(x, y, width, height, {
      group, label: 'brick',

      chamfer, render,

      height, width,      
    });

    window.el = el;
    this.bricks.push(el);
    return el;
  }

  collection(words) {
    return words.map(word => this.create(word))
  }

  update() {
    for (let brick of this.bricks)
      Body.setAngle(brick, 0)
  }
}

export default new Bricks();