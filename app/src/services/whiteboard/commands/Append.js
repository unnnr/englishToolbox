export default class Append {
  data = null;

  el = null;

  collection = null;

  constructor(data, collection, el = null) {
    this.collection =  collection;
    this.data = data;
    this.el = el;
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