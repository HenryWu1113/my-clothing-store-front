import { createRouter, createWebHistory } from 'vue-router'
import TopBarFront from '@/components/topBar/TopBarFront.vue'
import { useUserStore } from '@/stores/user'

const mainTitle = '我的商城'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    login: Boolean
  }
}

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
          component: () => import('../views/HomeView.vue'),
          meta: {
            title: `${mainTitle} | 首頁`,
            login: false,
            admin: false
          }
        },
        {
          path: 'category',
          name: 'category',
          component: () => import('../views/ProductsView.vue'),
          meta: {
            title: `${mainTitle} | 分類`,
            login: false,
            admin: false
          }
        },
        {
          path: 'favorite',
          name: 'favorite',
          component: () => import('../views/FavoriteView.vue'),
          meta: {
            title: `${mainTitle} | 我的收藏`,
            login: true,
            admin: false
          }
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/CartView.vue'),
          meta: {
            title: `${mainTitle} | 購物車`,
            login: true,
            admin: false
          }
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/ProfileView.vue'),
          meta: {
            title: `${mainTitle} | 個人資訊`,
            login: true,
            admin: false
          }
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('../views/OrderView.vue'),
          meta: {
            title: `${mainTitle} | 我的訂單`,
            login: true,
            admin: false
          }
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/NotFound.vue'),
      meta: {
        title: `${mainTitle} | 404`,
        login: false,
        admin: false
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      redirect: '/404'
    }
  ]
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

router.beforeEach((to, from, next) => {
  const user = useUserStore()

  if (user.isLogin && (to.path === '/register' || to.path === '/login')) {
    next('/')
  } else if (to.meta.login && !user.isLogin) {
    alert('not Auth')
    next('/')
  } else {
    next()
  }
})

export default router
