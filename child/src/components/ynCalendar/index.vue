<template>
  <div class="yn-calendar">
    <!-- <div class="btn-group">
      <div class="left-btn">
        <el-button-group>
          <el-button @click="prevMonth" type="primary">上一个月</el-button>
          <el-button type="primary" @click="goToCurrentMonth">{{ getCurDate() }}</el-button>
          <el-button @click="nextMonth" type="primary">下一个月</el-button>
        </el-button-group>
        <el-button type="primary" @click="goToCurrentDay">回到今天</el-button>
      </div>
    </div> -->
    <table v-loading="loading" class="parent-table">
      <thead>
        <th>周日</th>
        <th>周一</th>
        <th>周二</th>
        <th>周三</th>
        <th>周四</th>
        <th>周五</th>
        <th>周六</th>
      </thead>
      <tbody>
        <tr v-for="(week, windex) in monthData" :key="windex">
          <td v-for="(data, dindex) in week" :key="dindex">
            <div class="content">
              <div class="top-day">{{ data.date }}日</div>
              <div class="middle-event"></div>
              <div class="bottom-event"></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
function initData() {
  const currentYear = dayjs().year()
  const currentMonth = dayjs().month() + 1
  const currentDay = dayjs().date()
  getMonthData(`${currentYear}-${currentMonth}-1`)
}
let loading = ref(true)
onMounted(() => {
  initData()
})
//   获取当前月日是星期几
function getDay(date) {
  return dayjs(date).day()
}
let monthData = ref([])
// 获取日历整体信息
function getMonthData(date) {
  loading.value = true
  const currentYear = dayjs(date).year()
  const currentMonth = dayjs(date).month() + 1
  const currentDay = dayjs(date).date()
  dayjs(date).day()
  //   判断当前月数据是否满足从周日开始
  let week = getDay(date)
  const isWeekStart = week === 0
  const dayCount = dayjs(date).daysInMonth()
  monthData = []
  if (isWeekStart) {
    let tempWeek = []
    for (let date = 1; date <= dayCount; date++) {
      tempWeek.push({
        week,
        month: currentMonth,
        year: currentYear,
        date
      })
      if (week === 6) {
        week = 0
        monthData.push(tempWeek)
        tempWeek = []
      } else if (date === dayCount && week !== 6) {
        // 如果月最后一天不是星期六则补位下月日历
        let tempNextData = []
        for (let i = 0; i < 6 - week; i++) {
          tempNextData.push({
            week: week + 1 + i,
            month: currentMonth + 1,
            year: currentMonth === 12 ? currentYear + 1 : currentYear,
            date: i + 1
          })
        }
        monthData.push(tempWeek.concat(tempNextData))
        tempWeek = []
      } else {
        week++
      }
    }
  } else {
    let tempWeek = []
    // 获取上个月的天数
    const lastYear = currentMonth === 1 ? currentYear - 1 : currentYear
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1
    const lastDayCount = dayjs(`${lastYear}-${lastMonth}-1`).daysInMonth()
    for (let i = 0; i < week; i++) {
      tempWeek.unshift({
        week: week - 1 - i,
        month: lastYear,
        year: lastMonth,
        date: lastDayCount - i
      })
    }
    for (let date = 1; date <= dayCount; date++) {
      tempWeek.push({
        week,
        month: currentMonth,
        year: currentYear,
        date
      })
      if (week === 6) {
        week = 0
        monthData.push(tempWeek)
        tempWeek = []
      } else if (date === dayCount && week !== 6) {
        // 如果月最后一天不是星期六则补位下月日历
        let tempNextData = []
        for (let i = 0; i < 6 - week; i++) {
          tempNextData.push({
            week: week + 1 + i,
            month: currentMonth + 1,
            year: currentMonth === 12 ? currentYear + 1 : currentYear,
            date: i + 1
          })
        }
        monthData.push(tempWeek.concat(tempNextData))
        tempWeek = []
      } else {
        week++
      }
    }
  }
  loading.value = false
  //   console.log('整月数据：', monthData)
}
</script>

<style scoped lang="scss">
.yn-calendar {
  width: 100%;
  height: 100%;
}
</style>
