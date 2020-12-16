export class Pencil {
  path = null;

  previous = null;

  init(context, coords) {
    context.lineWidth = 15;
    context.lineCap = 'round';

    this.path = [];
    this.previous = coords;

    this.path.push({  
      x: coords.x,
      y: coords.y
    });
  }

  move(context, coords) {
    context.beginPath();

    context.moveTo(this.previous.x, this.previous.y);
    context.lineTo(coords.x, coords.y);
    context.stroke();

    this.previous = coords;
    this.path.push(coords);
  }

  release(context, coords) {
    return true;
  }

  compose() {
    if (!!!this.path.length)
      return;

    let previous = this.path[0];
    let relative = {
      x: [Math.round(previous.x)],
      y: [Math.round(previous.y)]
    };

    for (let {x, y} of this.path.slice(1)) {
      relative.x.push(Math.round(previous.x - x));
      relative.y.push(Math.round(previous.y - y));

      previous = {x, y};
    }

    return relative;
  }
}