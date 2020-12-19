export default class Triangle {
  coords = null;

  painting = false; 

  color = 'black';

  type = 'triangle';

  clear(context) {
    const OFFSET = 400;

    let x = this.coords.x1;
    let y = this.coords.y1;
    let height = this.coords.y3 - this.coords.y2;
    let width = this.coords.x2 - this.coords.x1;

    if (width > 0) {
      width += 2 * OFFSET;
      x -= OFFSET;
    }
    else {
      width -= 2 * OFFSET;
      x += OFFSET;
    }

    if (height > 0) {
      height += 2 * OFFSET;
      y -= OFFSET;
    }
    else {
      height -= 2 * OFFSET;
      y += OFFSET;
    }
    
    context.clearRect(x, y, width, height);
  }
  
  compose() {
    return {
      type: this.type,
      color: this.color,
    };
  }

  click(coords, context, drawings, config) {
    this.color = config.color;

    this.coords = {
      x1: coords.x,
      y1: coords.y
    }

    this.painting = true;
  }

  move(coords, context, drawings, config) {
    if (!!!this.painting)
      return;

    this.coords.x2 = coords.x; 
    this.coords.y2 = this.coords.y1; 

    this.coords.y3 = coords.y;
    this.coords.x3 = 
      this.coords.x1 + (this.coords.x2 - this.coords.x1) / 2 ;
     

    this.clear(context);
    context.beginPath();
    
    context.fillStyle = this.color;

    context.moveTo(this.coords.x1, this.coords.y1);
    context.lineTo(this.coords.x2, this.coords.y2);
    context.lineTo(this.coords.x3, this.coords.y3);

    // context.lineTo(this.coords.x3, this.coords.x3);
    
    // context.fillStyle = this.color;
    context.fill();
  }

  release(coords, context, drawings, config) {
    if (!!!this.painting)
      return false;
      
    drawings.append(this.compose());
    this.painting = false;

    return true;
  }
}