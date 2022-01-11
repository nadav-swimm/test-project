<template>
  <a
    :href="'//' + url"
    target="_blank"
  ><slot />
  </a>
</template>

<script>
export default {

  props: {

    url: {
      type: String,
      default: ''
    }

  }
}
</script>

<style lang="scss" scoped>
.icon {
  display: inline-block;
}
</style>
