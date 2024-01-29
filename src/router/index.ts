import { createRouter, createWebHistory } from 'vue-router'
import TopBarFront from '@/components/topBar/TopBarFront.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: TopBarFront,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: 'category',
          name: 'category',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: 'favorite',
          name: 'favorite',
          component: () => import('../views/FavoriteView.vue')
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/CartView.vue')
        }
      ]
    }
  ]
})

export default router
