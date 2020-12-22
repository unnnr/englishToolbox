import DrawingsStorage from '@services/whiteboard/DrawingsStorage'
import History from '@services/whiteboard/History'
import Remove from '@services/whiteboard/commands/Remove'
import Append from '@services/whiteboard/commands/Append'
import Clear from '@services/whiteboard/commands/Clear'


export default class WhiteboardDrawings {
  _history = new History();
  
  _collection = new DrawingsStorage();

  pending = null;

  constructor() {
    console.log('DRAWINGS CREATED');
    window.drawings = this;
  }

  clear() {
    let command = new Clear(this._collection);
    command.execute();

    this._history.push(command);
  }

  remove(item) {
    let command = new Remove(item, this._collection);
    command.execute();

    this._history.push(command);
  }

  append(item) {
    let command = new Append(item, this._collection);
    command.execute();

    this._history.push(command);
  }

  undo() {
    this._history.undo();
  }

  redo() {
    this._history.redo();
  }

  collection() {
    return this._collection.get();
  }
}