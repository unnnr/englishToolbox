export default class Inspector {
  type = 'inspector';

  inspecting = true;

  sizeless = true;

  colorless = true;
  
  click(coords, context, drawings, config, el) {
    if (el)
      drawings.remove(el);
  }

  move(coords, context, drawings, config) {
    //
  }

  release(coords, context, drawings, config) {
    // 
  }
}