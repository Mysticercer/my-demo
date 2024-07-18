import request from '@/utils/request'
import type { AlarmSource, AlarmList, AlarmGroupSum } from './types'
/**
 * 获取数据统计
 * 报警统计
 */
export const getAlarmStats = () => {
  return request({
    url: '/sm/pc/stats/alarmStats',
    method: 'post'
  })
}

/**
 * 获取数据统计
 * 设备统计
 * 登录验证
 */
export const getDeviceStats = () => {
  return request({
    url: '/sm/pc/stats/deviceStats',
    method: 'post'
  })
}

/**
 * 获取数据统计
 * 报警来源统计
 * 登录验证
 * @param periodType 1.本日；2.本周；3.本月
 */

export const getAlarmSource = (data: AlarmSource) => {
  return request({
    url: '/sm/pc/stats/alarmSource',
    method: 'post',
    data: data
  })
}

/**
 * 获取数据统计
 * 设备分布
 */

export const getDeviceDistribution = () => {
  return request({
    url: '/sm/pc/stats/deviceDistribution',
    method: 'post'
  })
}

/**
 * 获取数据统计
 * 报警类别统计柱状图
 * @param periodType 1.本日；2.本周；3.本月
 */

export const getAlarmCategory = (data: AlarmSource) => {
  return request({
    url: '/sm/pc/stats/alarmCategory',
    method: 'post',
    data
  })
}

/**
 * 获取数据统计
 * 当前报警列表
 * @param status 0.全部1.待处理2.处理中
 * @param startDate {date}
 * @param endDate {date}
 */

export const getAlarmList = (data: AlarmList) => {
  return request({
    url: '/sm/pc/stats/alarmList',
    method: 'post',
    data
  })
}
/**
 * 获取数据统计
 * 当前报警列表总数
 * @param status 0.全部1.待处理2.处理中
 * @param startDate {date}
 * @param endDate {date}
 */
export const getAlarmGroupSum = (data: AlarmGroupSum) => {
  return request({
    url: '/sm/pc/alarm/alarmGroupSum',
    method: 'post',
    data
  })
}

/**
 * 获取数据统计
 * 报警地点
 * @param status 0.全部1.待处理2.处理中
 * @param startDate {date}
 * @param endDate {date}
 */
export const getAlarmPlaceStatistics = (data: AlarmSource) => {
  return request({
    url: '/sm/pc/stats/alarmPlaceStatistics',
    method: 'post',
    data: data
  })
}

/**
 * 获取监控列表
 */
export const getRealUrlList = () => {
  return request({
    url: '/sm/pc/realTime/realUrlList',
    method: 'post'
  })
}

/**
 * 门禁-人员出入登记
 */
export const getEvent = () => {
  return request({
    url: '/sm/acs/event/getEvent',
    method: 'post'
  })
}
