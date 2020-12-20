export default class WhiteboardDrawings {
  collection = [];

  constructor() {
    // loading pusher
  }

  async clear() {
    // await Pusher->send

    let removed  = this.collection;
    this.collection = []

    return removed;
  }

  async remove() {
    // await Pusher->send

  }

  async append(item) {
    // await Pusher->send
    this.collection.push(item);
  }
}