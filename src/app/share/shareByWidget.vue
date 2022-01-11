<template>
  <div
    class="share-embedd-form"
  >
    <cb-text
      block
      small
      primary
      class="title"
    >
      As a javascript widget
    </cb-text>
    <cb-copy-to-clipboard :val="webWidgetEmbedUrl" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {

  computed: {
    ...mapGetters([
      'isShareEmbedded', 'webWidgetEmbedUrl'
    ])

  }
}
</script>
<style lang="scss" scoped>
    .share-embedd-form {
      width: 100%;
    }
    .share-embedd-form__title{
        margin-bottom: 10px;
        display: block;
    }
    .title {
      margin-top: 20px;
      margin-bottom: 20px;
    }

  </style>
