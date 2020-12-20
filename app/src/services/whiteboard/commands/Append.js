export default class Append {
  element = null;

  collection = null;

  constructor(element, collection) {
    this.collection =  collection;
    this.element = element;
  }

  execute() {
    this.collection.push(this.element);
  }

  undo() {
    this.collection.remove(this.element);
  }
}