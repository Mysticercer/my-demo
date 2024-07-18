<template>
  <div
    :style="{ width, height }"
    class="camera-player"
    :class="{ full: fullFlag }"
    v-loading="loading"
  >
    <video
      ref="videoEl"
      class="video"
      controls="controls"
      disablepictureinpicture
      autoplay
      muted
    ></video>
  </div>
</template>

<script>
import flvjs from 'flv.js'
export default {
  name: 'camera-player',
  props: {
    width: { type: String, default: '100%' },
    height: { type: String, default: 'calc(100% - 1px)' },
    url: { type: String }
  },
  data() {
    return { player: null, loading: false, fullFlag: false }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  beforeUnmount() {
    this.close()
  },
  methods: {
    init() {
      // const { url } = this
      let { url } = this
      if (!url) return
      url = this.url
      const player = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        url
      })
      player.attachMediaElement(this.$refs.videoEl)
      player.load()
      this.player = player
    },
    close() {
      if (this.player) {
        // console.log('执行销毁')
        this.player.pause()
        this.player.unload()
        this.player.destroy()
        this.player = null
      }
    }
  },
  watch: {
    url() {
      this.close()
      this.init()
    }
  }
}
</script>

<style scoped lang="scss">
:deep(.el-loading-spinner) .path {
  stroke: rgb(255, 161, 0);
}

.full {
  position: fixed !important;
  left: 0;
  top: 0;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 3;
  border: 0 !important;
}

.camera-player {
  position: relative;
  background-color: rgb(35, 39, 46);

  .video {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .full_button {
    z-index: 1;
    opacity: 0;
    position: absolute;
    right: 0%;
    bottom: 0%;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 3px;
    justify-content: center;
    transition: 0.3s all;
    font-size: 28px;
  }

  .full_button:hover {
    opacity: 1;
  }
}
</style>
