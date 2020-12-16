export class Pencil {
  __path = null;

  _previous = null;

  init(context, coords) {
    this._previous = coords;
  }

  move(context, coords) {
    console.log(coords);
    
    context.beginPath();
    context.lineWidth = 15;
    context.lineCap = 'round';

    context.moveTo(this._previous.x, this._previous.y);
    context.lineTo(coords.x, coords.y);

    this._previous = coords;

    context.stroke();
  }

  release(context, coords) {

  }
}