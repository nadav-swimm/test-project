<template>
  <ul class="social-media-links flex flex-row">
    <li
      class="icon facebook"
      @click="shareOnFacebook"
    >
      <img
        :src="facebookIcon"
        title="Share on Facebook"
      >
    </li>
    <li
      class="twitter icon"
      @click="shareOnTwitter"
    >
      <img
        :src="twitterIcon"
        title="Share on Twitter"
      >
    </li>
    <li
      class="icon linkedin"
      @click="shareOnLinkedIn"
    >
      <img
        :src="linkedinIcon"
        title="Share on linkedin"
      >
    </li>
  </ul>
</template>
<script>
import { mapGetters } from 'vuex'
import utils from '@/services/utils.js'

export default {
  props: {
    formId: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['chatBotUrl', 'linkedinIcon', 'facebookIcon', 'twitterIcon'])

  },
  methods: {
    shareOnFacebook () {
      var URL = ''
      if (this.chatBotUrl == null) {
        URL = `https://chat-forms.com/forms/${this.formId}/?form`
      } else {
        URL = this.chatBotUrl
      }
      utils.fbShare(URL)
    },
    shareOnTwitter () {
      var URL = ''
      if (this.chatBotUrl == null) {
        URL = `https://chat-forms.com/forms/${this.formId}/?form`
      } else {
        URL = this.chatBotUrl
      }
      utils.tweet(URL)
    },
    shareOnLinkedIn () {
      var URL = ''
      if (this.chatBotUrl == null) {
        URL = `https://chat-forms.com/forms/${this.formId}/?form`
      } else {
        URL = this.chatBotUrl
      }
      utils.linkedInShare(URL)
    }
  }
}
</script>
<style lang="scss" scoped>

.social-media-links {
    li {
        margin-right: 8px;
    }
}

</style>
