export const checkPlugs = function() {
    const _window = window as any
    const webVideoCtrl = _window.WebVideoCtrl
    return new Promise<void>((resolve, reject) => {
      if (webVideoCtrl && webVideoCtrl !== null) {
            webVideoCtrl.I_HideWnd({
              success: function () {
                resolve()
              },
              error: function (err: any) {
                reject({ msg: '关闭播放视频插件失败！', error: err })
              }
            })
      }
      resolve()
    })
  }