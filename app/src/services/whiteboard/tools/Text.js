export default class text {
  path = null;

  type = 'text';

  click(coords, context, drawings, config, el) {
    drawings.pending = el;

    el.size = config.size;
    el.size = config.color;
  }

  move(coords, context, drawings, config) {
    // 
  }

  release(coords, context, drawings, config) {
    // 
  }
}