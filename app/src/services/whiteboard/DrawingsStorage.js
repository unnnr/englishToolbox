import Http from '@services/Http';

export default class DrawingsStorage {
  collection = [];

  parseResponce(response) {
    let data = response.data;

    let el = JSON.parse(data.body);
    el.id = data.id;

    return el;
  }

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
    let body = JSON.stringify(el).replace(/"id":\d+,?/, '');

    let data = new FormData();
    data.append('body', body);

    let response = await Http.delete({
      data, uri: 'whiteboard/drawings/' + el.id
    });

    let updated = this.parseResponce(response);

    Object.assign(this.find(el), updated);
  }
  
  async push(el) {
    let data = new FormData();
    data.append('body',  JSON.stringify(el));

    let response = await Http.post({
      data, uri: 'whiteboard/drawings'
    });

    let created = this.parseResponce(response);

    this.collection.push(created);
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