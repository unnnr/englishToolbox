export default class Rectangle {
  width = null;

  height = null;

  coords = null;

  painting = false; 

  sizeless = true;

  color = 'black';

  type = 'rectangle';

  clear(context, config) {
    context.clearRect(0, 0, config.width, config.height);
  }
  
  compose() {
    return {
      type: this.type,
      color: this.color,

      x: this.coords.x,
      y: this.coords.y,

      width: this.width,
      height: this.height,
    };
  }

  click(coords, context, drawings, config) {
    this.color = config.color;

    this.coords = {
      x: coords.x,
      y: coords.y
    }

    this.height = 0;
    this.width = 0;

    this.painting = true;
  }

  move(coords, context, drawings, config) {
    if (!!!this.painting)
      return;

    this.clear(context, config);

    this.width = Number((coords.x - this.coords.x).toFixed(2));
    this.height = Number((coords.y - this.coords.y).toFixed(2));

    context.fillStyle = this.color;
    context.fillRect(this.coords.x, this.coords.y,
                     this.width, this.height);
  }

  release(coords, context, drawings, config) {
    if (!!!this.painting)
      return false;
      
    this.painting = false;
    if (!!!this.width || !!!this.height)
      return false;
      
    drawings.append(this.compose());
    return true;
  }
}