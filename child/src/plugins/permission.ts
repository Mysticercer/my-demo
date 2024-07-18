import router from '@/router'
import NProgress from '@/utils/nprogress'

export async function setupPermission() {
  NProgress.start()
  router.afterEach(() => {
    NProgress.done()
  })
}
