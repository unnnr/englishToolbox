import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  // Main pages

  { path: '/home', alias: '/', name: 'Home',component: () => import('@pages/Home') },

  { path: '/profile', name: 'Profile', component: () => import('@pages/Profile') },

    // -> recommended 

  // Auth pages
  
  { path: '/login', name: 'Login', component: () => import('@pages/Login') },

  { path: '/register', name: 'Register', component: () => import('@pages/Register') },


  // Post pages
  
  { path: '/videos', name: 'Videos', component: () => import('@pages/Video') },

  { path: '/audio', name: 'Audio', component: () => import('@pages/Audio') },

    // -> charts page
    

  // Fallback pages 

  { path: '*', name: 'NotFound', component: () => import('@pages/NotFound') },


  // temp -> 
  { path: '/inputs', name: 'inputs', component: () => import('@pages/Inputs') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,

  scrollBehavior(to) {
    function waitFor(callback) {
      return new Promise(resolve => 
        setTimeout(callback.bind(this, resolve), DELAY));
    }

    function scroll(resolve) {
      if (!!!to.hash)
        return;
      
      let target = document.querySelector(to.hash);
      target.scrollIntoView({
        behavior: 'smooth'
      });

      resolve();
    }
    
    const DELAY = 500;

    return waitFor(scroll);
  }
})

export default router
