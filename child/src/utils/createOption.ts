export const axisLabelColor = '#ccc'

export const axisLineColor = 'rgb(0,203,255)'

export const splitLineColor = 'rgba(1,119,158,0.5)'

export const defaultColor = [
  '#258BFF',
  'rgb(237,106,119)',
  'rgb(247,206,118)',
  'rgb(32,183,126)',
  'rgb(92,201,250)',
  'rgb(74,112,255)',
  'rgb(134,158,248)'
]

export const modules: any = {
  base: {
    color: defaultColor,
    legend: { textStyle: { color: '#ccc' }, top: '5%' },
    grid: { left: '5%', top: '20%', right: '5%', bottom: '5%', containLabel: true },
    xAxis: {
      name: '',
      type: 'category',
      nameTextStyle: { color: axisLabelColor },
      axisLabel: { color: axisLabelColor },
      axisTick: { show: false },
      axisLine: { lineStyle: { color: axisLineColor } }
    },
    yAxis: {
      name: '',
      type: 'value',
      nameTextStyle: { color: axisLabelColor },
      axisLabel: { color: axisLabelColor },
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { show: true, lineStyle: { type: 'dashed', color: splitLineColor } }
    },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } }
  },
  base2y: {
    color: defaultColor,
    legend: { textStyle: { color: '#ccc' }, top: '5%' },
    grid: { left: '5%', top: '20%', right: '5%', bottom: '5%', containLabel: true },
    xAxis: {
      name: '',
      type: 'category',
      nameTextStyle: { color: axisLabelColor },
      axisLabel: { color: axisLabelColor },
      axisTick: { show: false },
      axisLine: { lineStyle: { color: axisLineColor } }
    },
    yAxis: [
      {
        name: '',
        type: 'value',
        nameTextStyle: { color: axisLabelColor },
        axisLabel: { color: axisLabelColor },
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { show: true, lineStyle: { type: 'dashed', color: splitLineColor } }
      },
      {
        name: '',
        type: 'value',
        nameTextStyle: { color: axisLabelColor },
        axisLabel: { color: axisLabelColor },
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { show: false }
      }
    ],
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } }
  },
  valueX: {
    color: defaultColor,
    legend: { textStyle: { color: '#ccc' }, top: '5%' },
    grid: { left: '5%', top: '20%', right: '5%', bottom: '5%', containLabel: true },
    xAxis: {
      name: '',
      type: 'value',
      nameTextStyle: { color: axisLabelColor },
      axisLabel: { color: axisLabelColor },
      axisTick: { show: false },
      axisLine: { show: true, lineStyle: { color: axisLineColor } },
      splitLine: { show: true, lineStyle: { type: 'dashed', color: splitLineColor } }
    },
    yAxis: {
      name: '',
      type: 'category',
      nameTextStyle: { color: axisLabelColor },
      axisLabel: { color: axisLabelColor },
      axisTick: { show: false },
      axisLine: { lineStyle: { color: axisLineColor } }
    },
    dataZoom: [
      {
        type: 'inside',
        orient: 'vertical',
        start: 100,
        minValueSpan: 10,
        maxValueSpan: 10
      },
      {
        type: 'slider',
        orient: 'vertical',
        width: 12,
        right: '1.5%',
        handleSize: 0,
        color: 'rgba(255,255,255,0.1)',
        borderColor: 'rgba(255,255,255,0)',
        showDetail: false,
        showDataShadow: false,
        // zoomLock: true,
        brushSelect: false
      }
    ],
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } }
  }
}

export const createOption = (option: any, type = 'base') => {
  return {
    ...modules[type],
    ...option
  }
}
