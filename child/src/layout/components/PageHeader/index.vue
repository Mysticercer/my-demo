<script setup lang="ts">
import navInfo from './navInfo.vue'
</script>

<template>
  <div class="header">
    <div class="logo_box">
      <p class="text">视频平台</p>
    </div>
    <nav-info />
  </div>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 5.5vh;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  background: url('@/assets/img/headbg.png') center center no-repeat;
  background-size: 100% 100%;
  .logo_box {
    // width: 400px;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;

    .logo {
      // width: 4vmin;
      height: 4vmin;
      margin-left: 10px;
      margin-right: 10px;
    }
    .text {
      color: $theme-color-text-gray;
      font-family: projt;
      font-size: 30px;
    }
  }
}
</style>
