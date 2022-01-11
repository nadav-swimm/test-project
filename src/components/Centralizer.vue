<template>
  <div :class="`cb-cetralizer ${verticalClass} ${horizontalClass}`">
    <slot />
  </div>
</template>
<script>

export default {

  props: {
    veritcal: {
      type: Boolean,
      default: true
    },
    horizontal: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    horizontalClass () {
      return this.horizontal ? 'cb-horizontal' : ''
    },
    verticalClass () {
      return this.veritcal ? 'cb-vertical' : ''
    }

  }
}
</script>

<style lang="scss" scoped>
.cb-cetralizer {
  display: flex;

  &.cb-horizontal {
    text-align: center;
    justify-content: center;
  }
  &.cb-vertical {
    align-items: center;
  }
}
</style>"
