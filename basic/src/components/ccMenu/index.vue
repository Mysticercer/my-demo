<template>
  <div :style="{ top, left }" class="cc-menu">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    x: { type: Number },
    y: { type: Number }
  },
  data() {
    return {
      left: 0,
      top: 0
    }
  },
  mounted() {
    this.calc()
  },
  methods: {
    calc() {
      if (document.body.clientWidth < this.$el.clientWidth + this.x) {
        const right = document.body.clientWidth - this.x
        this.left = document.body.clientWidth - right - this.$el.clientWidth + 'px'
      } else {
        this.left = this.x + 'px'
      }
      if (document.body.clientHeight < this.$el.clientHeight + this.y) {
        const bottom = document.body.clientHeight - this.y
        this.top = document.body.clientHeight - bottom - this.$el.clientHeight + 'px'
      } else {
        this.top = this.y + 'px'
      }
    }
  },
  watch: {
    x(newVal) {
      this.calc()
    },
    y(newVal) {
      this.calc()
    }
  }
}
</script>

<style lang="scss" scoped>
.cc-menu {
  z-index: 999;
  // position: f;
  color: $theme-color-text;
  position: fixed;
  border: 1px solid;
  background-color: $theme-color-dark !important;
  border-color: $theme-color-border;
  :deep(.option) {
    display: flex;
    align-items: center;
    font-size: 14px;
    white-space: nowrap;
    text-align: left;
    padding: 5px 5px;
    cursor: pointer;
    min-width: 90px;
    border-bottom: 1px solid $theme-color-border;
    &:hover {
      background-color: $theme-color-border;
    }
    &::last-child {
      border-bottom: 0;
    }
  }
}
.cc-menu:last-child {
  border-bottom: 0 !important;
}
</style>
