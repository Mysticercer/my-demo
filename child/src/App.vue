<script setup lang="ts">
// import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
const _window = window as any
document.domain = _window.location.host.split(':')[0]
onMounted(() => {
  document.oncontextmenu = () => false
  // document.getElementsByTagName('html')[0].style.setProperty(`--el-border-color`, 'red')
})
</script>

<template>
  <!-- <ScaleBox> -->
  <el-config-provider namespace="el">
    <router-view />
    <!-- <RouterView /> -->
  </el-config-provider>
  <!-- </ScaleBox> -->
</template>

<style lang="scss" scoped></style>
