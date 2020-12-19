export default class Ellipse {
  coords = null;

  radiuses = null;

  painting = false; 

  color = 'black';

  type = 'ellipse';

  clear(context, coords) {
    context.clearRect(0, 0, 2000, 1000);
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

    this.radiuses = {
      x: 0,
      y: 0
    }

    this.painting = true;
  }

  move(coords, context, drawings, config) {
    if (!!!this.painting)
      return;

    this.radiuses.x = Math.abs(coords.x - this.coords.x) / 2;
    this.radiuses.y = Math.abs(coords.y - this.coords.y) / 2;
    this.clear(context, coords);

    let x = this.coords.x + this.radiuses.x 
      * (coords.x > this.coords.x ? 1 : -1);

    let y = this.coords.y + this.radiuses.y 
      * (coords.y > this.coords.y ? 1 : -1);

    context.beginPath();
    context.fillStyle = this.color;
    context.ellipse(x, y, this.radiuses.x, this.radiuses.y, 0, 0, 2 * Math.PI);
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