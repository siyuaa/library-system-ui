import { createRouter, createWebHistory } from 'vue-router'

import BookView from '../views/BookView.vue'

const routes = [
  {
    path: '/',
    component: BookView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router