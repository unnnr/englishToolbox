export default class text {
  path = null;

  type = 'text';

  click(coords, context, drawings, config, el) {
    let target;

    if (el && el.type === 'text')
      target = el;
    else
      target = { type: 'text', value: '', x: coords.x, y: coords.y }

    console.log(coords);
    
    target.size = config.size;
    target.size = config.color;

    drawings.pending = target;
  }

  move(coords, context, drawings, config) {
    // 
  }

  release(coords, context, drawings, config) {
    // 
  }
}