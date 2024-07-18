import './assets/main.css'
import '@/assets/scss/base.scss'

import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'
import { setupStore } from '@/stores'
import { setupPermission } from '@/plugins'
import 'virtual:svg-icons-register'
import directive from './directives'
import microApp from '@micro-zoe/micro-app'

microApp.start()

const app = createApp(App)

// 全局过滤器
import { filters } from '@/utils/filters'
app.config.globalProperties.$filters = filters

import { createOption } from '@/utils/createOption'
// 将globalFunc方法挂载在全局
app.provide('$createOption', createOption)
// app.config.globalProperties.$createOption = createOption

// 解决ts监测filters属性不存在
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: any
  }
}

// 注册eleentplus所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 手动注册iconfont
// import SvgIcon from '@/components/SvgIcon/index.vue'
// app.component('svg-icon', SvgIcon)
import '@/assets/icons/iconfont.js'

setupStore(app)

// 动态全局路由
setupPermission()
app.use(directive)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})
app.mount('#app')
