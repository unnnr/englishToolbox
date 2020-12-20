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

  async remove(painting) {
    // await Pusher->send

    let index = this.collection.indexOf(painting);
    if (index !== -1)
      this.collection.splice(index);
  }

  async append(item) {
    // await Pusher->send
    this.collection.push(item);
  }
}