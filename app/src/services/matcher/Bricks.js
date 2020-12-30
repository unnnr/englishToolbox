import {Bodies} from 'matter-js'
import Config from '@services/matcher/Config'
import Groups from '@services/matcher/Groups'


class Bricks {
  bricks = [];

  drawText(render) {
    let context =  render.context;
    context.textBaseline = 'middle';
    context.textAlign = 'center';

    context.font = 
      Config.font.size + 'px Arial';

    context.fillStyle = 
      Config.font.color;

    for (let brick of this.bricks) {
      context.fillText(brick.word.verb,
                       brick.position.x,
                       brick.position.y);
    }
  }

  collection(words) {
    return words.map(word => this.create(word))
  }

  create(word) {
    let x = Math.floor(Math.random() * Config.world.width);
    let y = Math.floor(Math.random() * Config.world.height);

    let width = word.verb.length * Config.font.size * Config.brick.widthScale;
    let height = Config.font.size * Config.brick.heightScale;

    let chamfer =  {
      radius: Config.brick.borderRadius
    };

    let render = {
      fillStyle: Groups.createColor(word.key)
    }

    let el = Bodies.rectangle(x, y, width, height, {
      chamfer, render, word, 
      inertia: Infinity,
      label: 'brick', 
    });

    window.el = el;

    this.bricks.push(el);

    return el;
  }
}

export default new Bricks();