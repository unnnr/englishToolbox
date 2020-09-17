import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  // Main pages

  { path: '/', alias: '/home', name: 'Home',component: () => import('@pages/Home') },

  { path: '/profile', name: 'Profile', component: () => import('@pages/Profile') },

  { path: '/about', name: 'About', component: () => import('@pages/About') },

    // -> recommended 

  // Auth pages
  
  { path: '/login', name: 'Login', component: () => import('@pages/Login') },

  { path: '/register', name: 'Login', component: () => import('@pages/Register') },


  // Post pages
  
  { path: '/video', name: 'Home', component: () => import('@pages/Video') },

  { path: '/audio', name: 'Audio', component: () => import('@pages/Audio') },

    // -> chart page
    

  // Fallback pages 

  { path: '*', name: 'NotFound', component: () => import('@pages/NotFound') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
