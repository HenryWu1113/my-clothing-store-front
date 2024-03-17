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
            login: false
          }
        },
        {
          path: 'category',
          name: 'category',
          component: () => import('../views/CategoryView.vue'),
          meta: {
            title: `${mainTitle} | 分類`,
            login: false
          }
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/ProductsView.vue'),
          meta: {
            title: `${mainTitle} | 商品`,
            login: false
          }
        },
        {
          path: 'product/:id',
          name: 'product',
          component: () => import('../views/ProductView.vue'),
          meta: {
            title: `${mainTitle} | 商品`,
            login: false
          }
        },
        {
          path: 'outfits',
          name: 'outfits',
          component: () => import('../views/OutfitsView.vue'),
          meta: {
            title: `${mainTitle} | 穿搭`,
            login: false
          }
        },
        {
          path: 'outfit/:id',
          name: 'outfit',
          component: () => import('../views/OutfitView.vue'),
          meta: {
            title: `${mainTitle} | 個別穿搭`,
            login: false
          }
        },
        {
          path: 'stores',
          name: 'stores',
          component: () => import('../views/StoresView.vue'),
          meta: {
            title: `${mainTitle} | 店鋪總覽`,
            login: false
          }
        },
        {
          path: 'store/:id',
          name: 'store',
          component: () => import('../views/StoreView.vue'),
          meta: {
            title: `${mainTitle} | 店鋪資訊`,
            login: false
          }
        },
        {
          path: 'aboutus',
          name: 'aboutus',
          component: () => import('../views/AboutUs.vue'),
          meta: {
            title: `${mainTitle} | 關於我們`,
            login: false
          }
        },
        {
          path: 'favorite',
          name: 'favorite',
          component: () => import('../views/FavoriteView.vue'),
          meta: {
            title: `${mainTitle} | 我的收藏`,
            login: true
          }
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/CartView.vue'),
          meta: {
            title: `${mainTitle} | 購物車`,
            login: true
          }
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/ProfileView.vue'),
          meta: {
            title: `${mainTitle} | 個人資訊`,
            login: true
          }
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('../views/OrderView.vue'),
          meta: {
            title: `${mainTitle} | 我的訂單`,
            login: true
          }
        },
        {
          path: 'news',
          name: 'AllNews',
          component: () => import('../views/AllNewsView.vue'),
          meta: {
            title: `${mainTitle} | 最新消息`,
            login: false
          }
        },
        {
          path: 'news/:id',
          name: 'news',
          component: () => import('../views/NewsView.vue'),
          meta: {
            title: `${mainTitle} | 最新消息`,
            login: false
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
        login: false
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
