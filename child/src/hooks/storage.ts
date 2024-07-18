export const storage = {
  setLocal: (key: string, value: any) => {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  getLocal: (key: string) => {
    const value: any = window.localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  },
  clearOneLocal: (key: string) => {
    window.localStorage.removeItem(key)
  },
  clearAllLocal: () => {
    window.localStorage.clear()
  },
  setSession: (key: string, value: any) => {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  },
  setSessionObject: (obj: KeyObject) => {
    Object.keys(obj).forEach((key) => {
      window.sessionStorage.setItem(key, JSON.stringify(obj[key]))
    })
  },
  getSession: (key: string) => {
    const value: any = window.sessionStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  },
  clearOneSession: (key: string) => {
    window.sessionStorage.removeItem(key)
  },
  clearAllSession: () => {
    window.sessionStorage.clear()
  }
}
