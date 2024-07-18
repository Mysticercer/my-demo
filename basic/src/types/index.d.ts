export { }
declare global {
  interface KeyObject {
    [key: string]: any
  }
  namespace COMPONENT_PROPS {
    namespace REAL_PLAYER {
      interface INFO {
        ip: string,
        port: string,
        username: string,
        password: string,
        id?: string,
        name?: string,
        channel?: string,
        isNvr?: number,
        type?:number
      }
      interface OPTIONS {
        autoPlay: boolean,
        bWndFull: boolean,
        windNum: number
      }
    }
  }
}

