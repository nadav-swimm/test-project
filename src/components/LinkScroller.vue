<template>
  <cb-centralizer>
    <div class="cb-link-scroller-wrapper">
      <cb-button
        v-if="showCta"
        class="create-chatbot-button"
        :on-click="clicked"
        text="Create a Chatbot"
      />
      <a
        v-if="targetElement"
        v-scroll-to="scrollOptions"
        class="cb-scroller-link"
        href="#"
      >{{ text }}</a>
    </div>
  </cb-centralizer>
</template>
<script>

export default {

  props: {
    showCta: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: 'link'
    },
    targetElement: {
      type: String,
      default: ''
    },
    offset: {
      type: Number,
      default: 0
    }

  },
  data: function () {
    return {
      scrollOptions: {
        el: this.targetElement,
        duration: 1000,
        easing: 'ease',
        offset: this.offset,
        force: true,
        cancelable: true,
        x: false,
        y: true
      },
      url: ''

    }
  },
  methods: {
    clicked () {
      this.$scrollTo('#hp-submitter', 1000, { easing: 'ease', offset: -100 })
    },
    onclick () {
      console.log('bla')
    }
  }
}
</script>
<style lang="scss">
.cb-link-scroller-wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: $high-z-index;
}
.cb-button.create-chatbot-button {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
