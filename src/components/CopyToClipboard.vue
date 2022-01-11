<template>
  <div class="wrapper">
    <!-- Copy to clipboard Badge -->
    <transition name="fade">
      <div class="flex row copied-to-clipboard-notification">
        <span v-show="copied">Copied</span>
        <span
          v-show="copied"
          class="icon check"
        />
      </div>
    </transition>

    <!-- Embed Link -->
    <textarea
      ref="elem"
      class="embed"
      readonly
      :value="val"
      @click="onClick"
    />
  </div>
</template>
<script>
import utils from '@/services/utils.js'

export default {
  props: {
    val: {
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
    onClick (e) {
      this.$analytics.track('Share', 'Copy to clipboard', { snippet: this.val })
      utils.copyTextToClipboard(this.val)
      e.target.select()
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
    position: absolute;
    right: 0;
    bottom: 15px;
    color: rgb(84, 155, 84);
    font-size: 12px;
    font-weight: 400;
    border-radius: 20px;
    padding: 0 8px;
    line-height: 24px;
    background: rgba(255, 255, 255, 0.5);
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
    font-family: 'menlo', 'Monaco', 'Courier New', Courier, monospace;

  }

</style>
