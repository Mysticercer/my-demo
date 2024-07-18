<template>
  <section class="cc-content" :style="{ width, height }">
    <div class="cc-content-header" v-if="hasHeader">
      <div class="title" v-if="title">
        <span class="iconfont" :class="icon" v-if="icon"></span>
        {{ title }}
      </div>

      <!-- <div class="other"> -->
      <slot name="head-left" />
      <slot name="head-right" />
      <!-- </div> -->
    </div>
    <div class="cc-content-body">
      <slot name="body" />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    width: { type: String, default: '100%' },
    height: { type: String, default: '100%' },
    title: { type: String, default: '' },
    icon: { type: String, default: '' },
    hasHeader: { type: Boolean, default: true }
  }
}
</script>

<style lang="scss" scoped>
.cc-content {
  display: flex;
  flex-direction: column;
  :deep(.icon-button) {
    cursor: pointer;
  }
  .cc-content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    // padding: 8px 5px 8px 15px;
    padding-left: 15px;
    padding-right: 5px;
    height: 4.5vmin;
    min-height: 42px;
    font-size: 1vmin;
    // background: rgba($color: #000000, $alpha: 0.15);
    .title {
      font-size: 14px;
      color: $theme-font-color;
      vertical-align: middle;
      white-space: nowrap;
      font-weight: 700;
    }
  }
  .cc-content-body {
    // background: rgba($color: #000000, $alpha: 0.4);
    // display: flex;
    flex: 1;
    height: 0;
    width: 100%;
  }
}
</style>
<style lang="scss" scoped>
.position_a_l {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.cc-content-header {
  position: relative;
  background: url('@/assets/img/contenthbg.png') center center no-repeat;
  background-size: 100% 100%;
}
.cc-content-header::before {
  @extend .position_a_l;
  content: '';
  border: 2px solid;
  box-sizing: border-box;
  border-image: linear-gradient(to right, #4384ac, #4384ac);
  pointer-events: none;
}
.cc-content-header::after {
  @extend .position_a_l;
  content: '';
  width: 10px;
  height: 10px;
  background: linear-gradient(
    135deg,
    rgb(0, 255, 230) 0%,
    rgb(0, 255, 230) 25%,
    rgb(49, 174, 255) 25%,
    rgb(49, 174, 255) 50%,
    transparent 50%,
    transparent 100%
  );
}
.cc-content-body {
  border: 1px solid $theme-color-border-dark;
}
</style>
