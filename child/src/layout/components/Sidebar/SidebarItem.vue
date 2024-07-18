<script setup lang="ts">
const props = defineProps({
  menuData: {
    type: Object //类型字符串
  },
  parentPath: {
    type: String, //类型字符串
    default: ''
  },
  mapLevel: {
    type: Number,
    default: 1
  }
})

interface MenuObj {
  hidden: boolean
  children: MenuObj[]
}

function hasChild(menuData: MenuObj) {
  return menuData?.children && menuData?.children.filter((item) => !item.hidden).length > 1
}

const { menuData, parentPath } = props
</script>

<template>
  <div v-if="menuData?.hidden !== true">
    <el-sub-menu
      v-if="hasChild(menuData as MenuObj)"
      :index="parentPath ? parentPath + '/' + menuData?.path : menuData?.path"
    >
      <template #title>
        <el-icon v-show="parentPath === ''"><component :is="menuData?.meta.icon" /></el-icon>
        <!-- <el-icon><location /></el-icon> -->
        <span>{{ menuData?.meta?.title }}</span>
      </template>

      <SidebarItem
        :menuData="child"
        :parentPath="parentPath ? parentPath + '/' + menuData?.path : menuData?.path"
        :mapLevel="mapLevel + 1"
        v-for="(child, childIndex) in menuData?.children"
        :key="childIndex"
      ></SidebarItem>
    </el-sub-menu>
    <el-menu-item v-else-if="mapLevel === 1" :index="menuData?.redirect">
      <el-icon><component :is="menuData?.meta?.icon" /></el-icon>
      <span> {{ menuData?.meta?.title }}</span>
    </el-menu-item>

    <el-menu-item
      v-else
      :index="parentPath && parentPath !== '/' ? parentPath + '/' + menuData?.path : menuData?.path"
    >
      <span> {{ menuData?.meta?.title }}</span>
    </el-menu-item>
  </div>
</template>

<style lang="scss" scoped></style>
