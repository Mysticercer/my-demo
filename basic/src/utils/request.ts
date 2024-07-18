import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStoreHook } from '@/stores/modules/user'
import { useRouter } from 'vue-router'
// 需要关闭插件的路由
const pluginsList: string[] = [
  '/eyeRealtimeMonitoring/home',
  '/eyeAlarmScreen/home',
  '/eyeAlarmCenter/detail'
]
let currentUrl = window.location.href.split('#')[1]
if (currentUrl.indexOf('redirect') >= 0) {
  currentUrl = currentUrl.split('redirect=')[1]
}
if (currentUrl.indexOf('?') >= 0) {
  currentUrl = currentUrl.split('?')[1]
}

const $router = useRouter()
// 创建 axios 实例
const service = axios.create({
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})
let timer: boolean = false

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // config.headers.sm_token = getToken() // 后端直接读取cookie
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  async (response: AxiosResponse) => {
    const { code, msg } = response.data
    if (code === '200') {
      return response.data.data
    } else if (code === '401') {
      const userStore = useUserStoreHook()
      deleteCookie('sm_token')
      // 清空用户信息
      userStore.userInfo = {
        name: '',
        userId: '',
        username: '',
        roles: [],
        avatar: ''
      }
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('permission')
      userStore.hasRoles = false
      userStore.isLogin = false
      window.sessionStorage.clear()
      const _window = window as any
      if (_window.myTimer) {
        _window.myTimer.stop()
      }
      // 由于每个页面的接口请求过多，防止短时间内多次重定向到首页
      if (!timer) {
        ElMessage({
          message: '当前登录的用户身份已失效。请重新登录！',
          type: 'warning'
        })
        try {
          if (pluginsList.includes(currentUrl)) {
            await checkPlugs()
          }
        } catch (error: any) {
          console.error(error.msg)
        } finally {
          window.location.href = `/#/login?redirect=${String(window.location.hash.slice(1))}`
        }
      }
      timer = true
      setTimeout(() => {
        timer = false
      }, 5000)
    }

    // 响应数据为二进制流处理(Excel导出)
    if (response.data instanceof ArrayBuffer) {
      return response
    }

    // console.error(msg || '系统出错')
    return Promise.reject(new Error(msg || 'Error'))
  },
  (error: any) => {
    if (error.response.data) {
      const { code, msg } = error.response.data
      // token 过期,重新登录
      if (code === '401') {
        deleteCookie('sm_token')
        const _window = window as any
        if (_window.myTimer) {
          _window.myTimer.stop()
        }
        if (!timer) {
          ElMessage({
            message: '当前登录的用户身份已失效。请重新登录！',
            type: 'warning'
          })
          location.href = `/#/login?redirect=${String(location.hash.slice(1))}`
          location.reload() // 清空路由
        }
        timer = true
        setTimeout(() => {
          timer = false
        }, 1000)
      } else {
        console.error(msg || '系统出错')
      }
    }
    return Promise.reject(error.message)
  }
)

// 导出 axios 实例
export default service
