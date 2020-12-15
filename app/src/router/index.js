import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@services/Auth'

Vue.use(VueRouter)


let authenticated = false;

Auth.check().then(value => authenticated = value);
Auth.onChange(value => authenticated = value);
  
const routes = [

  // Main pages

  { path: '/home', alias: '/', name: 'Home', component: () => import('@pages/Home') },

  { path: '/recommendations', name: 'Recommendations', component: () => import('@pages/Recommendations') },

  { path: '/profile', name: 'Profile', component: () => import('@pages/Profile') },

  // Auth pages
  
  { path: '/login', name: 'Login', component: () => import('@pages/Login'),
    beforeEnter: (to, from, next) => {
      if (!!!authenticated)
        return next();

      next({ name: 'Home'});
    }
  },

  { path: '/register', name: 'Register', 
    component: () => import('@pages/Register'),
    beforeEnter: (to, from, next) => {
      if (!!!authenticated)
        return next();

      next({ name: 'Home'});
    }
  },


  // Post pages
  
  { path: '/charts', name: 'Charts', redirect: { path: '/charts/first' }},
  { path: '/charts/:id', component: () => import('@pages/Chart') },
    
  { path: '/videos', name:'Videos', redirect: { path: '/videos/first' }},
  { path: '/videos/:id', component: () => import('@pages/Video') },

  { path: '/audio', name: 'Audio', redirect: { path: '/audio/first' }},
  { path: '/audio/:id', component: () => import('@pages/Audio') },

  // Fallback pages 

  { path: '*', name: 'NotFound', component: () => import('@pages/NotFound') },

  // whiteboard -> 
  { path: '/whiteboard', name: 'Whiteboard', component: () => import('@pages/Whiteboard') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,


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
});

router.beforeEach((to, from, next) => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  next();
});

export default router
