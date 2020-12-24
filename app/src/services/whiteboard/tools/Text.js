export default class text {
  path = null;

  type = 'text';

  click(coords, context, drawings, config, el) {
    let target;

    if (el && el.type === 'text') {      
      target = el;
      target.body.size = config.size * 6;
      target.body.color = config.color;
    }      
    else { 
      target = { type: 'text', value: '', x: coords.x, y: coords.y };
      target.size = config.size * 6;
      target.color = config.color;
    }

    drawings.pending = target;
  }

  move(coords, context, drawings, config) {
    // 
  }

  release(coords, context, drawings, config) {
    // 
  }
}