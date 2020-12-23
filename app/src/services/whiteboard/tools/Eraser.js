export default class Eraser {
  path = null;

  previous = null;

  painting = false; 

  colorless = true;

  size = 1;

  color = "#ffffff"

  type = 'eraser';

  compose() {
    if (!!!this.path.length)
      return;

    let previous = this.path[0];
    let relative = {
      x: [Math.round(previous.x)],
      y: [Math.round(previous.y)]
    };

    for (let {x, y} of this.path.slice(1)) {
      let relativeX = Number((x - previous.x).toFixed(2));
      relative.x.push(relativeX);

      let relativeY = Number((y - previous.y).toFixed(2));
      relative.y.push(relativeY);

      previous = {x, y};
    }


    return {
      type: this.type,
      size: this.size,

      path: relative
    };
  }

  click(coords, context, drawings, config) {
    this.size = config.size * 10;

    context.strokeStyle = this.color;
    context.lineWidth = this.size;
    context.lineCap = 'round';

    this.previous = coords;
    this.path = [];

    this.path.push({  
      x: coords.x,
      y: coords.y
    });

    this.painting = true;
  }

  move(coords, context, drawings, config) {
    if (!!!this.painting)
      return;

    context.beginPath();

    context.moveTo(this.previous.x, this.previous.y);
    context.lineTo(coords.x, coords.y);
    context.stroke();

    this.previous = coords;
    this.path.push(coords);
  }

  release(coords, context, drawings, config) {
    if (!!!this.painting || !!!this.path.length)
      return false;
      
    drawings.append(this.compose());
    this.painting = false;

    return true;
  }
}