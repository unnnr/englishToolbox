export default class WhiteboardDrawings {
  collection = [];

  constructor() {
    // loading pusher
  }

  async clear() {
    // await Pusher->send

  }

  async remove() {
    // await Pusher->send

  }

  async append(item) {
    // await Pusher->send
    this.collection.push(item);
  }
}