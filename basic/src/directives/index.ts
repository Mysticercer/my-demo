import type { App } from 'vue'
import { role } from './modules/role'

export default {
  install(app: App) {
    app.directive('role', role)
  },
}
