type ttt = NodeJS.Timer | null | number
class Timer {
  public timer: ttt
  public delay: number
  public time: number
  public stopFlag: boolean = false
  public callback: Function
  public immediately: boolean
  constructor(callback: Function, time: number, delay: number, immediate: boolean) {
    this.timer = null
    this.callback = callback
    this.time = time
    this.delay = delay
    this.stopFlag = false
    this.immediately = immediate
  }

  async start(delay?: number) {
    if (this.immediately) {
      await this.callback()
    } else {
      this.immediately = true
    }
    if (this.stopFlag) return
    this.timer = setTimeout(() => {
      this.start()
    }, delay || this.time)

    return this.timer
  }
  reStart() {
    if (this.stopFlag === true) {
      this.stopFlag = false
      this.start(this.delay)
    }
  }
  stop() {
    this.stopFlag = true
    window.clearTimeout(this.timer as number)
  }
}

const mytimer = (callback: Function, time = 5000, delay = 1000, immediately: boolean = false) => {
  const timerObj = new Timer(callback, time, delay, immediately)
  timerObj.start(delay)
  // console.log(timerObj.stop)
  return timerObj
}

export default mytimer
