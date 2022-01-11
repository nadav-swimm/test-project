<template>
  <div
    class="wrapper"
    @click="copyLink"
  >
    <cb-text
      hoverlink
      primary
      small
    >
      {{ text }}
    </cb-text>
    <!-- Copy to clipboard Badge -->
    <transition name="fade">
      <div class="flex row copied-to-clipboard-notification">
        <div v-show="copied">
          Copied to clipboard
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import utils from '@/services/utils.js'

export default {
  props: {
    val: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      copied: false
    }
  },

  methods: {
    copyLink (e) {
      console.log('Being copied')
      this.$analytics.track('Share', 'Copy to clipboard', { snippet: this.val })
      utils.copyTextToClipboard(this.val)
      this.temporaryShowBadge()
    },

    temporaryShowBadge () {
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 3000)
    }
  }

}
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  position: relative;
}
.copied-to-clipboard-notification {
    position: static;
    color: rgb(84, 155, 84);
    font-size: 14px;
    border-radius: 20px;
    line-height: 24px;
}

.check {
  @include svg-icon("check", rgb(84, 155, 84));
  margin-left: 3px;
}

.fade-enter-active, .fade-leave-active {
 opacity: 1;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transition: opacity 0.5s
}

  .embed {
    width: 100%;
    min-height: 90px;
    line-height: 22px;
    background: #fff;
  }

</style>
