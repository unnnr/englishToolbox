export default class Triangle {
  coords = null;

  painting = false; 

  color = 'black';

  type = 'triangle';

  clear(context, coords) {
    context.clearRect(0, 0, 2000, 1000);
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

    this.clear(context);

    this.coords.x2 = coords.x; 
    this.coords.y2 = this.coords.y1; 

    this.coords.x3 = 
      this.coords.x1 + (this.coords.x2 - this.coords.x1) / 2 ;
    this.coords.y3 = coords.y;
     
    
    context.beginPath();
    
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