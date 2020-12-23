export default class Polygon {
  path = [];

  color = 'black';

  type = 'polygon';

  painting = true;

  clear(context, config) {
    context.clearRect(0, 0, config.width, config.height);
  }

  compute(drawings) {
    drawings.append({
      type: this.type,
      path: this.path,
      color: this.color
    });

    this.path = [];
  }

  coordsCanMerge(first, second) {
    const OFFSET = 10;

    if (Math.abs(first.x - second.x) > OFFSET)
      return false;

    if (Math.abs(first.y - second.y) > OFFSET)
      return false;

    return true
  }

  draw(context, config, fill) {
    this.clear(context, config);
    context.beginPath();

    let firstCoords = this.path[0];
    context.moveTo(firstCoords.x, firstCoords.y);

    for (let {x, y} of this.path.slice(1))
      context.lineTo(x, y);

    context.lineWidth = 10;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.strokeStyle = this.color;
    context.fillStyle = this.color;

    if (fill) 
      context.fill()
    else 
      context.stroke();
  }

  click(coords, context, drawings, config, el) {
    console.log('click');

    if (this.path.length && this.coordsCanMerge(coords, this.path[0])) {
      this.path.push(this.path[0]);
      this.draw(context, config, true);
      this.compute(drawings);
      return;
    }
    
    this.path.push(coords);
    this.draw(context, config);
  }


  move(coords, context, drawings, config) {
    if (!!!this.path.length)
      return;

    this.draw(context, config);

    let last = this.path[this.path.length - 1];
    context.moveTo(last.x, last.y);
    context.lineTo(coords.x, coords.y)
    context.stroke();
  }

  release(coords, context, drawings, config) {
    // 
  }
}