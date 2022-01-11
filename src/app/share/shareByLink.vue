<template>
  <div
    class="share-link-form"
  >
    <cb-text
      subtitle
      class="share-link-form__title"
    >
      Via a Link
    </cb-text>
    <cb-copy-to-clipboard
      id="share-link__value"
      :val="chatBotUrl"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {

  computed: {
    ...mapGetters([
      'isShareByLink', 'chatBotUrl'
    ])

  }
}
</script>
<style lang="scss" scoped>
    .wrapper {
        position: relative;
    }
    .share-link-form__title{
        margin-bottom: 10px;
        display: block;
    }
  </style>
