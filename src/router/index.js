import { createRouter, createWebHistory } from 'vue-router'
import About from '../../src/views/About.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      component: About
    },
  
  ]
})

export default router
