/**
 * 报警统计请求参数
 */
export interface AlarmSource {
  /**
   * 时间维度
   */
  periodType: string
}

/**
 * 报警列表请求参数
 */
export interface AlarmList {
  /**
   * 时间维度
   */
  status: number
  startDate?: Date
  endDate?: Date
}

/**
 * 报警列表总数请求参数
 */
export interface AlarmGroupSum {
  /**
   * 时间维度
   */
  startDate?: Date
  endDate?: Date
}
