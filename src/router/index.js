import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import City from '../views/City.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/:city',
    component: City
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router