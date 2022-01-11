<template>
  <section class="jumbo-header flex row cb-app__content-max-width cb-content">
    <div class="value-proposition flex col">
      <cb-text
        larger
        primary
        nocursor
        bolder
        class="value-proposition__title cb-margin-bottom-lg"
      >
        <span class="first-line">Interactive & friendly</span>chatbots
        <cb-animated-text class="secondary-text" />
        <br>
        in less than a minute
      </cb-text>

      <cb-text
        secondary
        class="value-proposition__tagline cb-margin-bottom-lg"
      >
        Turn dull <cb-text
          bold
          primary
        >
          Google Forms
        </cb-text>to lively conversational
        chatbots and share it with everyone!
      </cb-text>
      <cb-button
        text-id="jumbo-header__cta"
        class="jumbo-header__cta"
        :on-click="navigateToApp"
        primary
        text="Start for free"
      />
    </div>
    <div class="cb-grid-row" />
  </section>
</template>

<script>

export default {
  methods: {
    navigateToApp () {
      this.$router.push('/chatbot')
    }
  }
}
</script>

<style lang="scss" scoped>
.jumbo-header {
  background: url("~/assets/hp_banner.png") top right no-repeat;
  background-size: 660px;
  background-position: right center;
  height: 660px;
  display: flex;
  align-items: center;
  margin-right: 90px;
  margin-top: $grid-line-height;
}

.value-proposition__title {
  line-height: 50px;
}

.value-proposition__tagline{
  max-width: 500px;
}

.jumbo-header__cta {
    align-self: flex-start;
  }

.first-line {
  display: block;
}

@media only screen and (max-width: $mobile) {
  .jumbo-header {
    background: url("~/assets/hp_banner.png") top right no-repeat;
    background-size: 300px;
    background-position: center 40px;
    margin: 60px 0 0 0;
    height: auto;
    padding: 280px 10px 0 10px !important;

  }
  .value-proposition__title {
    line-height: 32px !important;
  }
  .value-proposition{
    width: auto;
    padding: 12px;
    box-sizing: content-box;
    text-align: left;
  }
  .jumbo-header__cta {
    align-self: center;
    margin-top: 0;
  }

}
@media only screen and (min-width: $mobile) and (max-width: $ipad) {

   .jumbo-header {
    background: url("~/assets/hp_banner.png") top right no-repeat;
    background-size: 44%;
    background-position: calc(100% - 0px) 110px;
    padding-top: 210px !important;
    margin-top: 0;
    height: 490px;
  }

  .value-proposition{
    width: auto;
    padding: 12px;
    box-sizing: content-box;
    text-align: left;
  }
  .value-proposition__title {
    line-height: 32px !important;
  }
  .jumbo-header__cta {
    align-self: flex-start;
    margin-top: 0;
  }

}

@media only screen and (min-width: $ipad) and (max-width: $small-screens) {
   .jumbo-header {
    background: url("~/assets/hp_banner.png") top right no-repeat;
    background-size: 42%;
    background-position: right 50px;
    padding-top: 110px;
    margin-top: 80px;
    height: 500px;
  }
    .value-proposition{
    width: auto;
    padding: 0;
    box-sizing: content-box;
    text-align: left;
  }
    .jumbo-header__cta {
    align-self: flex-start;
    margin-top: 0;
  }

}
</style>
