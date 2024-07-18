export const getStaticImg = (imagePath:string)=>{
      return new URL(imagePath, import.meta.url).href
    // return new URL(imagePath, 'http://192.168.88.233:9006').href
}