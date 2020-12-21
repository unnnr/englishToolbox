export default class Inspector {
  type = 'inspector';
  
  click(coords, context, drawings, config) {
    // 
  }

  move(coords, context, drawings, config) {
    //
  }

  release(coords, context, drawings, config) {
    // 
  }

  select(painting, drawings) {
    drawings.remove(painting);
  }
}