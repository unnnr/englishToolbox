import Http from '@services/Http';

export default class DrawingsStorage {
  collection = [];


  find(target) {
    for (let el of this.collection) {
      if (el.id === target.id)
        return el;
    }

    return null;
  }

  parseResponse(response) {
    let el = response.data;
    el.body = JSON.parse(el.body);

    return el;
  }

  async clear(withDefault = []) {
    await Http.delete({
      uri: 'whiteboard'
    });

    this.collection = [];
  }


  async update(el) {
    let data = new FormData();
    data.append('body', JSON.stringify(el.body));

    let response = await Http.patch({
      data, uri: 'whiteboard/drawings/' + el.id
    });

    let updated = this.parseResponse(response);
    Object.assign(this.find(el), updated);
  }
  
  async push(el) {
    let data = new FormData();
    data.append('body',  JSON.stringify(el));

    let response = await Http.post({
      data, uri: 'whiteboard/drawings'
    });

    let created = this.parseResponse(response);
    this.collection.push(created);
  }

  async remove(el) {
    await Http.delete({
      uri: 'whiteboard/drawings/' + el.id
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