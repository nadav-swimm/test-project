<template>
  <section class="cb-site-width">
    <cb-page-title text="Feedback" />
    <div :class="`wrapper ${loaded ? '': 'loading'} cb-app__content-max-width`">
      <iframe
        class="frame"
        src="https://chat-forms.com/forms/1574026109191-gxy/?form&embedded=true"
        scrolling="no"
        frameborder="0"
        allowtransparency="true"
        @load="onload"
      />
    </div>
  </section>
</template>
<script>
export default {
  data: function () {
    return {
      loaded: false
    }
  },
  methods: {
    onload: function () {
      this.loaded = true
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;

  height: calc(100vh - 70px);
}
.loading {
  background: url("~/assets/loader.gif") no-repeat center center;
}
.frame {
  width: 600px;
  margin: 20px auto;
  height: auto;
  border: none;
  background: transparent;

}
</style>
