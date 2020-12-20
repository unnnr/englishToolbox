export default class Clear {
  snapshot = null;

  collection = null;

  constructor(collection) {
    this.snapshot = collection.get();
    this.collection= collection;
  }

  execute() {
    this.collection.clear();
  }

  undo() {
    this.collection.clear(this.snapshot);
  }
}