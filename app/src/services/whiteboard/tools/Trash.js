export default class Trash {
  painting = false; 

  type = 'trash';
  
  click(coords, context, drawings, config) {
    this.painting = true;
  }

  move(coords, context, drawings, config) {
    //
  }

  release(coords, context, drawings, config) {
    if (!!!this.painting || !!!drawings.collection().length)
      return;

    this.painting = false
    drawings.clear();
  }
}