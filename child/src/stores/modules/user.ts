import { usePermissionStore } from './permission'
import { loginApi } from '@/api/auth/index'
import { getUserInfoApi } from '@/api/user'
import type { LoginData } from '@/api/auth/types'
import { UserInfo } from '@/api/user/types'

import { defineStore } from 'pinia'
import { store } from '@/stores/index'

import router, { resetRouter } from '@/router'

import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const roles = ref('')
    const isLogin = ref(false)
    const userInfo: UserInfo = reactive({
      name: '', // 用户昵称
      userId: '',
      username: '', // 账号用户名
      roles: [],
      avatar: ''
    })
    const hasRoles = ref(false)
    /**
     * 登录
     *
     * @param {LoginData}
     * @returns
     */
    function login(loginData: LoginData) {
      return new Promise<void>((resolve, reject) => {
        loginApi(loginData)
          .then((response) => {
            isLogin.value = true
            // const { sm_token } = response as any
            // setToken(sm_token) // 后端直接设置token
            getUserInfo()
              .then(() => {
                resolve()
              })
              .catch((error) => {
                // getUserInfo()
                reject(error)
              })
          })
          .catch((error) => {
            // getUserInfo()
            reject(error)
          })
      })
    }

    // 获取信息(用户昵称、头像、角色集合、权限集合)
    function getUserInfo() {
      return new Promise<UserInfo>((resolve, reject) => {
        const token = getQuery().token
        getUserInfoApi(token)
          .then((data) => {
            Object.assign(userInfo, data)
            hasRoles.value = true
            sessionStorage.setItem('user', JSON.stringify(userInfo))
            setTimeout(() => {
              if (token) {
                isLogin.value = true
              }
              resolve(userInfo)
            }, 100)
            // router.push(`/login`);
          })
          .catch((error) => {
            hasRoles.value = false
            router.push(`/login`)
            reject(error)
          })
      })
    }
    function getUserData() {
      return userInfo
    }

    // user logout
    function logout() {
      return new Promise<void>((resolve, reject) => {
        deleteCookie('sm_token')
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('permission')
        window.sessionStorage.clear()
        const _userInfo = {
          name: '', // 用户昵称
          userId: '',
          username: '', // 账号用户名
          roles: [],
          avatar: ''
        }
        Object.assign(userInfo, _userInfo)
        hasRoles.value = false
        isLogin.value = false
        resolve()
      })
    }

    function setRoles(num: string) {
      roles.value = num
    }

    function resetToken() {
      return new Promise<void>((resolve) => {
        resetRouter()
        resolve()
      })
    }
    return {
      isLogin,
      logout,
      roles,
      setToken,
      setRoles,
      resetToken,
      login,
      getUserInfo,
      userInfo,
      hasRoles,
      getUserData
    }
  },
  {
    // persist: true //开启
    persist: {
      key: 'user',
      storage: sessionStorage
    }
  }
)

// 非setup
export function useUserStoreHook() {
  return useUserStore(store)
}
