import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { UserInfo } from './types'

/**
 * 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 *
 * @param ssoToken
 */
export function getUserInfoApi(ssoToken: string = ''): AxiosPromise<UserInfo> {
  return request({
    url: '/sm/pc/login/getUserDetil',
    method: 'post',
    data: { ssoToken }
  })
}

/**
 * 修改用户密码
 *
 * @param id
 * @param password
 */
export function updateUserPassword(id: number, password: string) {
  return request({
    url: '/api/v1/users/' + id + '/password',
    method: 'patch',
    params: { password: password }
  })
}
