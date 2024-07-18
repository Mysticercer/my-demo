<template>
  <span class="yn-upload-text" @click="clickUpload" v-if="isText"><slot /></span>
  <el-button v-else v-bind="parentAttrs" @click="clickUpload"><slot /></el-button>
  <input
    ref="inputFileRef"
    :accept="acceptList"
    type="file"
    id="inputFile"
    @change="handleChange"
  />
</template>

<script setup>
import MyWorker from './worker.js?worker'

const parentAttrs = useAttrs()
const props = defineProps({
  isText: {
    type: Boolean,
    default: true
  }
})
const acceptList = ['.zip', '.rar', '.gzip', '.7z']
function check(file) {
  const fileExt = file.name.substr(file.name.lastIndexOf('.')).toLowerCase() //获得文件后缀名
  return acceptList.includes(fileExt)
}
const inputFileRef = ref(null)
function clickUpload() {
  // inputFileRef.value.dispatchEvent(new MouseEvent('click'))
}
let worker = new MyWorker()
function handleChange(event) {
  const file = event.target.files[0]
  if (check(file)) {
    // 调用子线程生成文件hash
    worker.postMessage({ file, chunkSize: 100 * 1024 * 1024 })
  }
}
onMounted(() => {
  if (typeof Worker !== 'undefined') {
    // worker = new Worker('./worker.js') // 加载 worker 脚本
    worker.onmessage = (e) => {
      // 接收来自 worker 的消息（文件哈希值）
      //   fileHash.value = e.data
      console.log('Main: Received file hash from worker', e.data)
    }

    worker.onerror = (e) => {
      console.error('Worker error:', e)
    }
  } else {
    console.log('Sorry! No Web Worker support.')
  }
})
</script>

<style scoped lang="scss">
.yn-upload-text {
  color: $theme-color-light;
  cursor: pointer;
}
#inputFile {
  display: none;
}
</style>
