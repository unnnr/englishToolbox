import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@services/Auth'

class Links {
  authenticated = false;

  router = null;

  links = [
    { name: 'home', alias: '/'},

    { name: 'recommendations' },
  
    { name: 'profile' },

    { name: 'games' },
  

    { name: 'login', guest: true },
  
    { name: 'register', guest: true },
  

    { name: 'audio', postPage: true},

    { name: 'charts', component: 'Chart', postPage: true},

    { name: 'videos', component: 'Video', postPage: true},
  
    { path: '*', name: 'NotFound'},
  ]

  constructor() {
    Auth.onChange(value => this.authenticated = value);

    Auth.check().then(async value => {
      this.authenticated = value;

      let app = this.router.app;
      
      setTimeout(() => {
        app.$route;
      }, 50)
    });


    Vue.use(VueRouter)
    this.createRouter();
  }


  _computeComponent(route) {
    let componentName = route.component;

    if (!!!componentName) {
      componentName = 
        route.name.charAt(0).toUpperCase() + route.name.slice(1);
    }

    return () => import('@pages/'+ componentName);
  }

  _createPostRoute(link) {
    let route = {};

    route.component = link.component;
    route.path = '/' + link.name+ '/:id'

    return route;
  }
  
  _computePath(route) {
    return route.path ? 
      route.path : '/' + route.name 
  }

  _redirectAuthed(to, from, next) {
    Auth.check().then(value => {
      if (value)
        next({path: 'home'})
    });

    next();
  }

  compute() {
    let routes = [];
    
    for (let link of this.links) {
      let route = Object.assign({}, link);
      route.component = this._computeComponent(route);
      route.path = this._computePath(route);
      
      if (route.guest)  {
        route.beforeEnter = this._redirectAuthed.bind(this);
        route.meta = {guest: true};
      }

      if (route.postPage) {
        route.redirect = { path: route.path + '/first'}
        routes.push(this._createPostRoute(route))
      }

      routes.push(route);
    }

    return routes;
  }

  scrollBehavior(to) {
    function waitFor(callback) {
      const DELAY = 500;

      return new Promise(resolve => 
        setTimeout(callback, DELAY));
    }

    function scrollToHash() {
      if (!!!to.hash)
        return;
      
      let target = document.querySelector(to.hash);
      if (target)
        target.scrollIntoView({ behavior: 'smooth' });
    }

    waitFor(scrollToHash);
  }
  
  scrollToTop(to, from, next) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    next();
  }

  createRouter() {
    this.router = new VueRouter({
      mode: 'history',

      base: process.env.BASE_URL,
      routes: this.compute(),

      scrollBehavior: this.scrollBehavior,
      beforeEach: this.scrollToTop
    });
  }
}

export default Links;