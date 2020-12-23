export default class DrawingsStorage {
  collection = [];

  clear(withDefault = []) {
    this.collection = withDefault;
  }

  find(target) {
    for (let el of this.collection) {
      if (el.id === target.id)
        return el;
    }

    return null;
  }

  update(el) {
    let saved = this.find(el);
    Object.assign(saved, el);
  }
  
  push(el) {
    el.id = this.collection.push(el);
  }

  remove(el) {
    let index = 
      this.collection.indexOf(el);
    
    if (index !== -1)
      this.collection.splice(index, 1);
  }

  get() {
    return this.collection;
  }
}