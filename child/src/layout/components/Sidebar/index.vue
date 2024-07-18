<script setup lang="ts">
import { usePermissionStore, useUserStore } from '@/stores'
import { constantRoutes } from '@/router/index'
const switchState = ref(false)
const permissionStore = usePermissionStore()
const userStore = useUserStore()

let routeList = constantRoutes
import { useRoute, useRouter } from 'vue-router'
const $route = useRoute()
const $router = useRouter()

import SidebarItem from './SidebarItem.vue'

const handleSelect = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}

const allRouters1: string[] = [] // 平铺路由表路由
function hasChild(menuData: any) {
  // console.log(menuData?.children && menuData?.children.filter((item: any) => !item.hidden).length > 1);

  return menuData?.children && menuData?.children.filter((item: any) => !item.hidden).length > 1
}

function getAllRouters1(list: any[], parentPath: string = '') {
  list.forEach((item) => {
    if (item.children && item.children.length > 0) {
      getAllRouters1(item.children, `${item.path}/`)
    } else {
      allRouters1.push(parentPath ? parentPath + item.path : item.path)
    }
  })
}

const allRouters2: string[] = [] // 平铺menu菜单节点
function getAllRouters2(list: any[], parentPath: string = '') {
  list.forEach((item) => {
    if (hasChild(item)) {
      getAllRouters2(item.children, `${item.path}/`)
    } else {
      allRouters2.push(parentPath ? parentPath + item.path : item.path)
    }
  })
}

onBeforeMount(() => {
  getAllRouters1(routeList)
  getAllRouters2(routeList)
})

const evt = new Event('updateSidebar', { bubbles: true, cancelable: false })
const changeSwitch = () => {
  switchState.value = !switchState.value
  // document.dispatchEvent(evt)
}
</script>

<template>
  <nav class="page_sidebar" :class="switchState ? 'closing' : 'opening'">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-menus"
      @select="handleSelect"
      :unique-opened="true"
      router
    >
      <SidebarItem
        :menuData="menuItem"
        :key="menuItem.name"
        v-for="menuItem in routeList"
      ></SidebarItem>
    </el-menu>
    <div class="switch" @click="changeSwitch" />
  </nav>
</template>

<style lang="scss">
.page_sidebar {
  width: 190px;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  justify-content: space-between;
  position: relative;
  transition: width 0.2s;

  &.opening {
    width: 190px;
    .switch {
      background: url(@/assets/img/sidebar-close.png) no-repeat;
      background-position-y: center;
    }
  }

  &.closing {
    width: 0px;
    .switch {
      background: url(@/assets/img/sidebar-open.png) no-repeat;
      background-position-y: center;
    }
  }

  .switch {
    position: absolute;
    top: calc(50% - 45px);
    right: -20px;
    z-index: 1;
    width: 20px;
    height: 90px;
    cursor: pointer;
  }
  .el-menu-vertical-menus {
    overflow-x: hidden;
  }
  .menu_content {
    width: 100%;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    background: none !important;
  }

  // .menu_company_title {
  //   text-align: center;
  //   white-space: nowrap;
  //   text-overflow: ellipsis;
  //   overflow: hidden;
  //   padding: 10px 20px;
  //   color: rgba($color: $theme-color-text, $alpha: 0.3);
  //   background: rgba($color: #4080da, $alpha: 0.06);
  //   border-top: 1px solid rgba($color: #1ea2c3, $alpha: 0.14);
  //   font-size: 12px;
  // }

  // .sidebar_button {
  //   z-index: 2;
  //   position: absolute;
  //   right: -10px;
  //   top: 50%;
  //   transform: translateY(-50%);
  //   width: 10px;
  //   height: 100px;
  //   border-top: 0.5px solid rgba(255, 255, 255, 0.1333333333);
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   flex-wrap: nowrap;
  //   white-space: nowrap;
  //   cursor: pointer;
  //   transition: background 0.3s;
  //   border-radius: 0 5000px 5000px 0;
  //   background: linear-gradient(to left, #2085bf 0, #2085bf 0%, #124960 20%, #00354b);

  //   .sidebar_button_arrow {
  //     width: 5px;
  //     height: 10px;
  //     background: #2085bf;
  //     clip-path: polygon(0 50%, 100% 100%, 100% 0);
  //     background: linear-gradient(135deg, rgba($color: #00ffe6, $alpha: 0.36) 42%, transparent 42%),
  //       linear-gradient(to right, #31aeff, #195780);
  //   }
  // }

  .main_menu {
    display: flex;

    .iconfont {
      width: 33px;
      margin-right: 5px;
    }
  }
}

.page_sidebar .el-menu {
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  background: $theme-color-dark-gray;

  .el-submenu__icon-arrow {
    color: rgba($color: $theme-color-black, $alpha: 0.4) !important;
  }
}

.el-menu-item:focus {
  background-color: unset !important;
}

.el-menu-item:hover,
.el-sub-menu__title:hover {
  background: rgba($color: $theme-color-black, $alpha: 0.2);
}

.el-menu-item,
.el-sub-menu__title {
  background: none;
  color: rgba($color: $theme-color-black, $alpha: 0.8);
}

.el-submenu.is-active > .el-sub-menu__title {
  background: rgba($color: $theme-color-black, $alpha: 0.2);
}

.el-menu-item.is-active {
  background: rgba($color: $theme-color-black, $alpha: 0.2) !important;
}

.el-menu--popup {
  background-color: $theme-color-dark !important;
}
</style>
