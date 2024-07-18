<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'

let chart: echarts.ECharts
const chartRef = ref(null)
const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  },
  option: {
    type: Object,
    default: () => ({}),
    required: true
  }
})

const emit = defineEmits(['chartClick'])

//页面成功渲染，开始绘制图表
onMounted(() => {
  chart = echarts.init(chartRef.value)

  chart.on('click', (params) => {
    emit('chartClick', params)
  })
  setOption(props.option)
  //自适应不同屏幕时改变图表尺寸
  window.addEventListener('resize', cancalDebounce)
})

function setOption(option: any) {
  if (!option?.noClear) {
    chart.clear()
  }
  chart.resize()
  chart.setOption(option)
}

//重绘图表函数
const resizeHandler = () => {
  chart.resize()
}
const debounce = (fun: { (): void; (): void }, delay: number | undefined) => {
  let timer: number | undefined
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = window.setTimeout(() => {
      fun()
    }, delay)
  }
}
const cancalDebounce = debounce(resizeHandler, 50)

//页面销毁前，销毁事件和实例
onBeforeUnmount(() => {
  window.removeEventListener('resize', cancalDebounce)
  chart.dispose()
})
//监听图表数据时候变化，重新渲染图表
watch(
  () => [props.option],
  () => {
    setOption(props.option)
  },
  { deep: true }
)
</script>

<template>
  <div class="echarts" ref="chartRef" :style="{ height, width }" />
</template>

<style lang="scss" scoped></style>
