export default class DrawingsStorage {
  collection = [];

  clear(withDefault = []) {
    this.collection = withDefault;
  }

  push(item) {
    this.collection.push(item);
  }

  remove(item) {
    let index = 
      this.collection.indexOf(item);

    if (index !== -1)
      this.collection.splice(index, 1);
  }

  get() {
    return this.collection;
  }
}