export default class Clear {
  collection = null;

  constructor(collection) {
    this.collection= collection;
  }

  async execute() {
    this.collection.clear();
  }

  async undo() {

  }
}