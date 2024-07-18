<script setup lang="ts">
import dayjs from 'dayjs'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import ccMenu from '@/components/ccMenu/index.vue'
interface MenuObj {
  flag: boolean
  x: number
  y: number
}
const menuData: MenuObj = reactive({
  flag: false,
  x: 0,
  y: 0
})

const closeMenu = () => {
  menuData.flag = false
  window.removeEventListener('click', closeMenu)
}
const openMenu = (e: any) => {
  window.addEventListener('click', closeMenu)
  menuData.flag = true
  menuData.x = e.clientX
  menuData.y = e.clientY
}

const realData = reactive({
  CMPT_Real_Timestamp: ''
})
let timer = ref()
onMounted(() => {
  timer.value = setInterval(() => {
    refreshData()
  }, 1000)
})

onUnmounted(() => {
  window.clearInterval(timer.value)
})

import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

import { useUserStore } from '@/stores/modules/user'
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const userInfo  = userStore.getUserData()


const getImageErr = (event: any) => {
  let img = event.srcElement
  img.src = new URL('../../../assets/img/user_icon.svg', import.meta.url).href
  img.onerror = null //防止闪图
}

const logout = () => {
  userStore
  .logout()
  .then(() => {
    router.push(`/login?redirect=${route.fullPath}`)
  })
    .catch((error) => {
      console.error('退出登录失败', error)
      router.push(`/login`)
      location.reload() // 清空路由
    })
}

const refreshData = () => {
  realData.CMPT_Real_Timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss')
}
</script>
<template>
  <nav class="nav" v-if="userInfo?.name && userInfo?.userId">
    <div class="nav_cell admin" @click.right="openMenu">
      <img class="avatar" style="margin-right: 1vmin" @error="getImageErr" :src="userInfo.avatar" />
      <span style="color: rgba(255, 255, 255, 0.8)">{{ userInfo.name || '管理员' }}</span>
    </div>
    <div class="nav_cell time">
      <p class="nowDate">
        {{ realData.CMPT_Real_Timestamp && realData.CMPT_Real_Timestamp.split(' ')[0] }}
      </p>
      <p class="nowTime">
        {{ realData.CMPT_Real_Timestamp && realData.CMPT_Real_Timestamp.split(' ')[1] }}
      </p>
    </div>
    <cc-menu :x="menuData.x" :y="menuData.y" v-if="menuData.flag">
      <p class="option">
        <img src="../../../assets/img/updatePwd.png" style="margin-right: 5px" />修改密码
      </p>
      <p class="option">
        <img src="../../../assets/img/sysSet.png" style="margin-right: 5px" />系统设置
      </p>
      <p class="option" @click="logout">
        <img src="../../../assets/img/logout.png" style="margin-right: 5px" />退出
      </p>
    </cc-menu>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: flex-end;

  .nav_cell {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 10px;

    .avatar {
      width: 24px;
      height: 24px;
      border-radius: 24px;
      overflow: hidden;
    }
  }

  .iconfont {
    font-size: 2vmin;
  }

  .iconfont {
    margin-right: 5px;
  }

  .time {
    cursor: default;
    flex-direction: column;
    font-size: 12px;
    justify-content: center;

    .nowDate {
      color: rgba($color: #fff, $alpha: 0.8);
    }

    .nowTime {
      color: rgba($color: #fff, $alpha: 0.8);
    }
  }
}
</style>
