export default class Pencil {
  coords  = null;

  painting = false; 

  color = 'black';

  type = 'recntagle';

  compose() {
    return {
      type: this.type,
      color: this.color,
      size: this.size,

      coords: this.coords
    };
  }

  updateConfig(config) {
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