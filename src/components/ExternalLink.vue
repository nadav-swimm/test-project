<template>
  <a
    :href="'//' + url"
    target="_blank"
  ><slot />
    <img
      :src="externalLinkIcon"
      class="icon"
    >
  </a>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  props: {

    url: {
      type: String,
      default: ''
    }

  },
  computed: {
    ...mapGetters([
      'externalLinkIcon'
    ])

  }
}
</script>

<style lang="scss" scoped>
.icon {
  display: inline-block;
}
</style>
