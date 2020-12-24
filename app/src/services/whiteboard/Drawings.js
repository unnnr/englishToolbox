import DrawingsStorage from '@services/whiteboard/DrawingsStorage'
import History from '@services/whiteboard/History'
import Remove from '@services/whiteboard/commands/Remove'
import Append from '@services/whiteboard/commands/Append'
import Clear from '@services/whiteboard/commands/Clear'


export default class WhiteboardDrawings {
  _history = new History();
  
  _collection = null

  constructor() {
    window.drawings = this;

    this._collection = new DrawingsStorage(
      this.onCreated.bind(this),
      this.onRemoved.bind(this),
      this.onCleared.bind(this));
  }

  clear() {
    let command = new Clear(this._collection);
    command.execute();

    this._history = new History();
  }

  remove(el) {
    let command = new Remove(el, this._collection);
    command.execute();

    this._history.push(command);
  }

  append(el) {
    let command = new Append(el, this._collection);
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

  onCleared() {
    this._history = new History();
  }

  onCreated(el) {
    let command = new Append(el, this._collection);
    this._history.push(command);
  }

  onRemoved(el) {
    let command = new Remove(el, this._collection);
    this._history.push(command);
  }
}