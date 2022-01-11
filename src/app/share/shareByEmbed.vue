<template>
  <sharing-options-layout>
    <template v-slot:title>
      <cb-text
        prominent
        large
        bold
        block
      >
        Embed it in your website!
      </cb-text>
      <cb-text
        class="cb-margin-bottom-md"
        small
        block
        center
      >
        Add a code snippet and enjoy your Chat Forms chatbot<br>
        as a native part of your website!
      </cb-text>
    </template>

    <template v-slot:left>
      <cb-text
        block
        primary
        small
        class="title"
      >
        As an iframe
      </cb-text>
      <cb-copy-to-clipboard :val="chatBotEmbedUrl" />

      <share-by-widget />
    </template>

    <template v-slot:right>
      <img
        class="share-banner share-banner__embed"
        :src="shareEmbedBanner"
      >
    </template>
    <template v-slot:cta>
      <cb-button
        secondary
        :on-click="updateShareOption"
        text="Back"
      />
    </template>
  </sharing-options-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import SharingOptionsLayout from '~/src/app/share/sharingOptionsLayout.vue'
import ShareByWidget from '@/app/share/shareByWidget.vue'
import _embedBanner from '~/assets/embed_illustration.svg'

export default {
  components: {
    SharingOptionsLayout,
    ShareByWidget
  },

  computed: {
    ...mapGetters([
      'isShareEmbedded', 'chatBotEmbedUrl'
    ]),
    shareEmbedBanner () {
      return _embedBanner
    }

  },
  methods: {
    ...mapMutations([
      'setShareOption'
    ]),
    updateShareOption () {
      this.setShareOption(null)
      this.$modal.hide('popupModal')
    }
  }
}
</script>
<style lang="scss" scoped>
    .wrapper {
        position: relative;
    }
    .title {
      margin-bottom: 20px;
    }

  </style>
