import request from '@/utils/request'
import type { AxiosPromise } from 'axios'
import type { LoginData, LoginResult } from './types'

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data: LoginData): AxiosPromise<LoginResult> {
  // const formData = new FormData();
  // formData.append("username", data.username);
  // formData.append("password", data.password);
  // formData.append("verifyCodeKey", data.verifyCodeKey || "");
  // formData.append("verifyCode", data.verifyCode || "");
  return request({
    url: '/sm/pc/login/login',
    method: 'post',
    data: data
  })
}

/**
 * 注销API
 */
export function logoutApi() {
  return request({
    url: '/api/v1/auth/logout',
    method: 'delete'
  })
}
