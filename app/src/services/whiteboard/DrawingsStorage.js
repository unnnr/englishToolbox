import Http from '@services/Http';

export default class DrawingsStorage {
  collection = [];

  async clear(withDefault = []) {
    await Http.delete({
      uri: 'whiteboard'
    });

    this.collection = [];
  }

  find(target) {
    for (let el of this.collection) {
      if (el.id === target.id)
        return el;
    }

    return null;
  }

  async update(el) {
    let response = await Http.delete({
      uri: 'whiteboard/drawings/' + el.id
    });

    Object.assign(this.find(el), response.data);
  }
  
  async push(el) {
    let response = await Http.post({
      uri: 'whiteboard/drawings',
      data: el,
    });

    this.collection.push(response.data);
  }

  async remove(el) {
    await Http.delete({
      uri: 'whiteboard/drawings' + el.id
    });

    let index = 
      this.collection.indexOf(el);
    
    if (index !== -1)
      this.collection.splice(index, 1);
  }

  get() {
    return this.collection;
  }
}