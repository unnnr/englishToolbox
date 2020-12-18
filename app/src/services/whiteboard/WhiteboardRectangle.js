export default class Pencil {
  width = null;

  height = null;

  coords = null;

  painting = false; 

  color = 'black';

  type = 'rectangle';

  clear(context) {
    const OFFSET = 10;
    
    let height, width, x, y;

    if (this.width > 0) {
      width = this.width + 2 *  OFFSET;
      x = this.coords.x - OFFSET;
    }
    else {
      width = this.width - 2 * OFFSET;
      x = this.coords.x + OFFSET;
    }

    if (this.height > 0) {
      height = this.height + 2 * OFFSET ;
      y = this.coords.y - OFFSET;
    }
    else {
      height = this.height - 2 *  OFFSET;
      y = this.coords.y + OFFSET;
    }

    context.clearRect(x, y, width, height);
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

    this.painting = true;
  }

  move(coords, context, drawings, config) {
    if (!!!this.painting)
      return;

    this.clear(context);

    this.width = Number((coords.x - this.coords.x).toFixed(2));
    this.height = Number((coords.y - this.coords.y).toFixed(2));

    context.fillStyle = this.color;
    context.fillRect(this.coords.x, this.coords.y,
                     this.width, this.height);
  }

  release(coords, context, drawings, config) {
    if (!!!this.painting)
      return false;
      
    drawings.append(this.compose());
    this.painting = false;

    return true;
  }
}