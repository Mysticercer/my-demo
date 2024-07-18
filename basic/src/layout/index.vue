<script setup lang="ts">
import PageHeader from './components/PageHeader/index.vue'
import Sidebar from './components/Sidebar/index.vue'
const _window = window as any
_window.hasBasic = true
document.domain = _window.location.host.split(':')[0]
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

window.addEventListener('message', (event) => {
  if (event.data === 'getPosition') {
    var iframe = document.getElementById('iframe')
    if (iframe) {
      iframe.contentWindow.postMessage({ left: 212, top: 60 }, '*')
    }
  }
})

// import { RouterView } from 'vue-router'
// 需要关闭插件的路由
const staticRoute: string[] = ['/eyeDataStatistics/home', '/401', '/404']
const iframeRoute: string[] = ['/eye']
</script>

<template>
  <div class="page-layout">
    <page-header />
    <div class="page-content">
      <Sidebar class="sidebar-container" />
      <div class="page-main">
        <router-view v-if="staticRoute.includes(currentPath)" />
        <!-- <iframe
          id="iframe"
          v-else-if="currentPath.startsWith('/eye')"
          class="main-iframe"
          :src="`http://172.17.8.103:3001/#${currentPath}?token=test`"
          frameborder="0"
        ></iframe> -->
        <micro-app
          v-else
          iframe
          :name="currentPath"
          url="http://172.17.8.103:3002/"
          router-mode="native"
        ></micro-app>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-layout {
  width: 100%;
  height: 100%;
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
    padding: 10px 22px;

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
