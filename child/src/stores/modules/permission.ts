import { constantRoutes } from '@/router/index'
import { defineStore } from 'pinia'
import { store } from '@/stores/index'
import { RouteRecordRaw } from 'vue-router'
// export const usePermissionStore = defineStore('permission', {
//   // persist: true,
//   persist: {
//     key: 'permission',
//     storage: sessionStorage
//   },
//   state: () => {
//     return {
//       list: constantRoutes
//     }
//   }
// })

const modules = import.meta.glob('../../views/**/**.vue')
const Layout = () => import('@/layout/index.vue')

// setup
export const usePermissionStore = defineStore(
  'permission',
  () => {
    // state
    const routes = ref<RouteRecordRaw[]>([])
    const asyncRoute = ref<RouteRecordRaw[]>([])
    // actions
    function setRoutes(newRoutes: any[]) {
      asyncRoute.value = newRoutes
      routes.value = constantRoutes.concat(newRoutes)
    }

    const list = ref(constantRoutes)

    /**
     * 递归过滤有权限的异步(动态)路由
     *
     * @param routes 接口返回的异步(动态)路由
     * @param roles 用户角色集合
     * @returns 返回用户有权限的异步(动态)路由
     */
    const filterAsyncRoutes: any = (routes: RouteRecordRaw[], roles: string[]) => {
      const asyncRoutes: RouteRecordRaw[] = []
      routes.forEach((route) => {
        const tmpRoute = { ...route } // ES6扩展运算符复制新对象
        if (!route.name) {
          tmpRoute.name = route.path
        }
        // 判断用户(角色)是否有该路由的访问权限
        if (tmpRoute.component?.toString() == 'Layout') {
          tmpRoute.component = Layout
        } else {
          const component = modules[`../../views/${tmpRoute.component}.vue`]
          if (component) {
            tmpRoute.component = component
          } else {
            tmpRoute.component = modules[`../../views/error-page/404.vue`]
          }
        }

        if (tmpRoute.children) {
          tmpRoute.children = filterAsyncRoutes(tmpRoute.children, roles)
        }

        asyncRoutes.push(tmpRoute)
      })

      return asyncRoutes
    }

    /**
     * 生成动态路由
     *
     * @param roles 用户角色集合
     * @returns
     */
    function generateRoutes(roles: string[]) {
      const data: RouteRecordRaw[] = []
      const accessedRoutes = filterAsyncRoutes(data, roles)
      setRoutes(accessedRoutes)
      return accessedRoutes
      // return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      //   // 接口获取所有路由
      //   try {
      //     const data: RouteRecordRaw[] = []

      //     const accessedRoutes = filterAsyncRoutes(data, roles)
      //     setRoutes(accessedRoutes)
      //     resolve(accessedRoutes)
      //   } catch (error) {
      //     reject(error)
      //   }
      // })
    }

    return {
      list,
      routes,
      asyncRoute,
      setRoutes,
      generateRoutes
    }
  },
  {
    persist: {
      key: 'permission',
      storage: sessionStorage
    }
  }
)

// 非setup
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
