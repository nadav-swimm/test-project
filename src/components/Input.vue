<template>
  <input
    class="cb-input"
    type="text"
    :value="value"
    @input="input"
  >
</template>

<script>

export default {
  props: {

    input: {
      type: Function,
      default: () => {
      }
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.cb-input {
  border: none
}
</style>
