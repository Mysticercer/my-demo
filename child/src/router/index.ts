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
    path: '/test',
    redirect: '/test/home',
    name: '测试',
    meta: { title: '测试', icon: 'Monitor' },
    hidden: false,
    component: Layout,
    children: [
      {
        path: 'home',
        hidden: true,
        component: () => import('@/views/test/index.vue'),
        meta: {}
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    hidden: true,
    meta: {},
    component: Layout
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
