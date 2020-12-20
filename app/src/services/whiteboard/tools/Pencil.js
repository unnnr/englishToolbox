export default class Pencil {
  path = null;

  previous = null;

  painting = false; 

  color = 'black';

  size = 1;

  type = 'pen';

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
      color: this.color,
      size: this.size,

      path: relative
    };
  }

  updateConfig(config) {
    this.size = config.size * 10;
    this.color = config.color;
  }

  click(coords, context, drawings, config) {
    this.updateConfig(config);

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