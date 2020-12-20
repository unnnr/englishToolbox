import DrawingsStorage from '@services/whiteboard/DrawingsStorage'
import History from '@services/whiteboard/History'
import Remove from '@services/whiteboard/commands/Remove'
import Append from '@services/whiteboard/commands/Append'
import Clear from '@services/whiteboard/commands/Clear'


export default class WhiteboardDrawings {
  _history = new History();
  
  _collection = new DrawingsStorage();

  async clear() {
    let command = new Clear(this._collection);
    command.execute();

    this._history.push(command);
  }

  async remove(item) {
    let command = new Remove(item, this._collection);
    command.execute();

    this._history.push(command);
  }

  async append(item) {
    let command = new Append(item, this._collection);
    command.execute();

    this._history.push(command);
  }

  collection() {
    return this._collection.get();
  }
}