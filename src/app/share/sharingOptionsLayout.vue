<template>
  <section class="wizard-step3__wrapper">
    <div
      v-if="isAppLoading"
      class="app-loader"
    >
      <cb-text
        bold
        normal
      >
        Loading... Please wait.
      </cb-text>
    </div>
    <section class="wizard-step3__title">
      <slot name="title" />
    </section>
    <section class="wizard-step3__content flex row">
      <aside class="wizard-step3__left flex col flex-align-start">
        <slot name="left" />
      </aside>
      <aside class="wizard-step3__right">
        <slot name="right" />
      </aside>
    </section>

    <div
      v-if="isShareCtaVisible"
      class="wizard-step3__cta"
    >
      <slot name="cta" />
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'

export default {

  computed: {
    ...mapGetters([
      'isAppLoading',
      'isShareCtaVisible'
    ])
  }
}
</script>
<style lang="scss" scoped>
.app-loader {
  position: absolute;
  background: rgba(255, 255,255, 0.8);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  vertical-align: center;
  text-align: center;
}
.wizard-step3__wrapper {
  justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
}
.wizard-step3__content {
  width: 100%;
  align-items: flex-start;
  padding: 20px 20px 0 20px;
  min-height: 360px;
}
.wizard-step3__cta {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 90px;
  align-items: center;
  justify-content: center;
}
.wizard-step3__title {
  align-self: center;
    height: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 95%;
}

.wizard-step3__left{
  width: 45%;
  flex-shrink: 0;
  padding: 0 25px;
}
.wizard-step3__right{
  width: 55%;
  flex-shrink: 0;
  padding: 0 25px;
  display: flex;
  text-align: center;
  justify-content: center;
  background: url("~/assets/loader.gif") no-repeat center center;
  height: 100%;

  img {
    width: 100%;
    max-width: none;
  }
}
@media only screen and (max-width: $ipad) {

  .wizard-step3__left {
    width: 100%;
    padding: 0;
  }
  .wizard-step3__right {
    display: none;
  }
  .wizard-step3__content {
    padding: 0 20px 0 20px;
  }
}
</style>
