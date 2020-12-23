export default class Triangle {
  coords = null;

  painting = false; 

  color = 'black';

  type = 'triangle';

  sizeless = true;

  clear(context, config) {
    context.clearRect(0, 0, config.width, config.height);
  }
  
  compose() {
    return {
      type: this.type,
      color: this.color,

      path: [
        {x: this.coords.x1, y: this.coords.y1 },
        {x: this.coords.x2, y: this.coords.y2 },
        {x: this.coords.x3, y: this.coords.y3 }
      ]
    };
  }

  click(coords, context, drawings, config) {
    this.color = config.color;

    this.coords = {
      x1: coords.x,
      y1: coords.y,
      x2: null,
      y2: null,
      x3: null,
      y3: null,
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
     

    this.clear(context, config);
    context.beginPath();
    
    context.fillStyle = this.color;

    context.moveTo(this.coords.x1, this.coords.y1);
    context.lineTo(this.coords.x2, this.coords.y2);
    context.lineTo(this.coords.x3, this.coords.y3);

    context.fill();
  }

  release(coords, context, drawings, config) {
    if (!!!this.painting)
      return false;

    this.painting = false;
    if (this.coords.x2 === null)
      return;
      
    drawings.append(this.compose());
    return true;
  }
}