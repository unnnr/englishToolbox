import Cookies from 'js-cookie'
import Pusher from "pusher-js"
import Echo from "laravel-echo"
import Http from '@services/Http';

export default class DrawingsStorage {
  collection = [];

  Echo = null;
  
  constructor(onCreated, onRemoved, onCleared) {
    this.onCreated = onCreated;
    this.onRemoved = onRemoved;
    this.onCleared = onCleared;

    this.Echo = new Echo({
      broadcaster: 'pusher',
      key: '6194830899e2ae7c1ec9',
      cluster: 'eu',
      authEndpoint: 'http://etoolbox/api/broadcasting/auth',
      encrypted: true,
      auth: {
        headers: {
            Authorization: 'Bearer ' + Cookies.get('auth'),
        },
      },
    });
    
    this.load()
        .then(this.listen.bind(this));
  }

  find(target) {
    for (let el of this.collection) {
      if (el.id === target.id)
        return el;
    }

    return null;
  }

  parseResponse(response) {
    let el = response;
    el.body = JSON.parse(el.body);

    return el;
  }

  listen() {
    this.Echo.private('whiteboard')
      .listen('DrawingCreated', this.created.bind(this))
      .listen('DrawingRemoved', this.removed.bind(this))
      .listen('WhiteboardCleared', this.cleared.bind(this));
  }

  removed(raw) {
    let el = this.find(this.parseResponse(raw));
    let index = this.collection.indexOf(el);

    console.log(el);
    if (index === -1)
      return;

    this.collection.splice(index, 1);
    if (typeof this.onCreated === 'function')
      this.onCreated();
  }

  created(raw) {
    let el = this.parseResponse(raw);
    this.collection.push(el);

    if (typeof this.onCreated === 'function')
      this.onCreated(el);
  }

  cleared() {
    this.collection = [];

    if (typeof this.onCreated === 'function')
      this.onCreated();
  }

  async load() {
    let response  = await Http.get({
      uri: 'whiteboard/drawings'
    });

    let drawings = response.data;

    for (let el of drawings) {
      el.body = JSON.parse(el.body);
      this.collection.push(el);
    }
  }

  async clear() {
    await Http.delete({
      uri: 'whiteboard/drawings'
    });

    this.collection = [];
  }


  async update(el) {
    let headers =  
      {'X-Socket-ID': this.Echo.socketId()};

    let data = new FormData();
    data.append('body', JSON.stringify(el.body));

    let response = await Http.patch({
      headers, data, uri: 'whiteboard/drawings/' + el.id
    });

    let updated = this.parseResponse(response.data);
    Object.assign(this.find(el), updated);
  }
  
  async push(el) {
    let headers =  
      {'X-Socket-ID': this.Echo.socketId()};

    let data = new FormData();
    data.append('body',  JSON.stringify(el));

    let dummy = {
      id: this.collection.length + 1000, 
      loading: true,
      body: el
    };

    this.collection.push(dummy);
    let response = await Http.post({
      headers, data, uri: 'whiteboard/drawings'
    });
    
    let created = this.parseResponse(response.data);
    dummy.id = created.id;
    dummy.loading = false;

    return dummy;
  }

  async remove(el) {
    let index = this.collection.indexOf(el);
    if (index === -1)
      return;

    this.collection.splice(index, 1);

    let headers =  
      {'X-Socket-ID': this.Echo.socketId()};

    await Http.delete({
      headers, uri: 'whiteboard/drawings/' + el.id
    });
  }

  get() {
    return this.collection;
  }
}