<template>
  <div>
    <div class="cb-grid-row" />
    <div class="cb-grid-row" />
    <div class="cb-grid-row">
      <cb-text
        primary
        normal
        bold
      >
        {{ text }}
      </cb-text>
    </div>
    <div class="cb-grid-row" />
  </div>
</template>
<script>
export default {

  components: {
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }

  }
}
</script>

<style lang="scss" scoped>
.cb-page-title {
  padding: 20px 0 30px 0;
}
</style>"
