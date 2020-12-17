export default class Pencil {
  path = null;

  previous = null;

  paiting = false; 

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
      type: 'pen',
      path: relative
    };
  }

  click(coords, context, drawings, config) {
    context.lineWidth = 15;
    context.lineCap = 'round';

    this.path = [];
    this.previous = coords;
    this.paiting = true;

    this.path.push({  
      x: coords.x,
      y: coords.y
    });
  }

  move(coords, context, drawings, config) {
    if (!!!this.paiting)
      return;

    context.beginPath();

    context.moveTo(this.previous.x, this.previous.y);
    context.lineTo(coords.x, coords.y);
    context.stroke();

    this.previous = coords;
    this.path.push(coords);
  }

  release(coords, context, drawings, config) {
    if (!!!this.paiting || !!!this.path.length)
      return false;
      
    drawings.append(this.compose());
    this.paiting = false;

    return true;
  }
}