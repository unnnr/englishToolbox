export default class Append {
  data = null;

  el = null;

  collection = null;

  constructor(data, collection) {
    this.collection =  collection;
    this.data = data;
  }

  async execute() {
    this.el = await this.collection.push(this.data);
  }

  undo() {
    if (!!!this.el)
      return;

    return this.collection.remove(this.el);
  }
}