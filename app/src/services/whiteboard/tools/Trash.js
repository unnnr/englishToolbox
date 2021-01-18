export default class Trash {
  painting = false; 

  type = 'trash';

  sizeless = true;

  colorless = true;
  
  click(coords, context, drawings, config) {
    this.painting = true;
  }

  move(coords, context, drawings, config) {
    //
  }

  release(coords, context, drawings, config) {
    if (!!!this.painting)
      return;

    this.painting = false
    
    if (!!!drawings.collection().length)
      return;
      
    drawings.clear();
  }
}