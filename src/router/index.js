import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import City from '../views/City.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:city',
    name: 'City',
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

router.beforeEach((to, from, next) => {
  const addToTitle = 'Mad Duck Code'
  if (to.name === 'Home') {
    document.title = `${to.name} | ${addToTitle}`
  } else if (to.params.city) {
    document.title = `${to.params.city.split('_').map(v => v[0].toUpperCase() + v.slice(1)).join(' ')} | ${addToTitle}`
  } else {
    document.title = addToTitle
  }

  next()
})

export default router