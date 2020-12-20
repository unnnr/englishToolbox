export default class Inspector {
  painting = false;

  type = 'inspector';
  
  click(coords, context, drawings, config) {
    this.painting = true;
  }

  move(coords, context, drawings, config) {
    //
  }

  release(coords, context, drawings, config) {
    if (!!!this.painting)
      return;


  }
}