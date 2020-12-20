export default class DrawingsStorage {
  collection = [];

  push(item) {
    this.collection.push(item);
    console.log(this.collection);
  }

  remove(item) {
    let index = 
      this.collection.indexOf(item);

    if (index !== -1)
      this.collection.splice(item, 1);
  }

  get() {
    return this.collection;
  }
}