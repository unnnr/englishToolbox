export class Pencil {
  path = null;

  previous = null;

  appendCoords(coords) {
    let last = 
      this.path[this.path.length - 1];

    let relative = {
      x: last.x - coords.x,
      y: last.y - coords.y, 
    }
    
    this.path.push(relative);
  }

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
    this.appendCoords(coords);
  }

  release(context, coords) {
    return true;
  }

  compose() {
    return this.path;
  }
}