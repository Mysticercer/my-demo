export const require = (imgPath: string) => {
  try {
    // const handlePath = imgPath.replace('@', '..');
    return new URL(imgPath, import.meta.url).href
  } catch (error) {
    console.warn(error)
  }
}
