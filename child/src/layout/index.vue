<script setup lang="ts">
import PageHeader from './components/PageHeader/index.vue'
import Sidebar from './components/Sidebar/index.vue'
const _window = window as any
_window.hasBasic = true
const hasBasic = ref(false)
if (self !== top) {
  const _windowTop = _window.rawWindow || (_window.top as any)
  hasBasic.value = _windowTop.hasBasic
}
import { useRoute } from 'vue-router'
const $route = useRoute()
let currentPath = ref('')
watch(
  () => $route.path,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      currentPath.value = newVal
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="page-layout">
    <template v-if="hasBasic">
      <router-view />
    </template>
    <template v-else>
      <page-header />
      <div class="page-content">
        <Sidebar class="sidebar-container" />
        <div class="page-main">
          <router-view />
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.page-layout {
  width: 100%;
  height: 100%;
  color: $theme-font-color;
  display: flex;
  flex-direction: column;
}

.page-content {
  height: 0;
  width: 100%;
  flex: 1;
  display: flex;

  .page-main {
    display: flex;
    width: 0;
    flex: 1;
    flex-direction: column;
    position: relative;

    .router-view {
      // background-color: #035b80;
      width: 100%;
      height: 0;
      flex: 1;
    }
    > .main-iframe {
      height: 100%;
      width: 100%;
      padding: 0px;
    }
  }
}
</style>
