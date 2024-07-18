import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface _RouteRecordBase {
    hidden?: boolean | string | number
  }
}

export const Layout = () => import('@/layout/index.vue')

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
    meta: {}
  },
  {
    path: '/:pathMatch(.*)*',
    hidden: true,
    meta: {},
    component: Layout
  },
  {
    path: '/',
    name: '/',
    component: Layout,
    redirect: '/eyeDataStatistics',
    hidden: true,
    meta: { icon: 'Odometer' },
    children: [
      {
        path: '401',
        hidden: true,
        component: () => import('@/views/error-page/401.vue'),
        meta: {}
      },
      {
        path: '404',
        hidden: true,
        component: () => import('@/views/error-page/404.vue'),
        meta: {}
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: '/login' })
}

export default router
