<template>
  <section class="how-it-works cb-content">
    <div class="cb-grid-row" />
    <cb-hp-section-title>
      How it works?
    </cb-hp-section-title>
    <div class="cb-grid-row" />

    <ul class="how-it-works__list">
      <li class="flex row how-it-works__list-item">
        <aside class="image">
          <img :src="step1Image">
        </aside>
        <aside class="cb-padding-left-lg text">
          <cb-text
            primary
            large
            bold
          >
            Step #1<br>
            Import your google form
          </cb-text><br>
          <cb-text
            normal
            class="step-explanation"
          >
            You can browse and import forms directly from your google account or just paste a google form url
          </cb-text>
        </aside>
      </li>

      <li class="flex row cb-margin-top-md how-it-works__list-item reverse">
        <aside class="image">
          <img :src="step2Image">
        </aside>
        <aside class="cb-padding-left-lg text">
          <cb-text
            primary
            large
            bold
          >
            Step #2<br>
            Auto-Generate a chat bot
          </cb-text><br>
          <cb-text
            normal
            class="step-explanation"
          >
            Just push the button and the google form will convert to a shiny 🤖 chat bot!
          </cb-text>
        </aside>
      </li>

      <li class="flex row cb-margin-top-md how-it-works__list-item">
        <aside class="cb-padding-md image">
          <img :src="step3Image">
        </aside>
        <aside class="cb-padding-left-lg text">
          <cb-text
            primary
            large
            bold
          >
            Step #3<br>
            Share it with everyone
          </cb-text><br>
          <cb-text
            normal
            class="step-explanation"
          >
            Share your chatbot via link.
            Embedd it in your website as a widget.
            share it by mail and social media
          </cb-text>
        </aside>
      </li>
    </ul>

    <div class="cb-grid-row" />
    <div class="flex flex-align-center">
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
import Step1Image from '~/assets/step1.svg'
import Step2Image from '~/assets/step2.svg'
import Step3Image from '~/assets/step3.svg'
export default {
  computed: {
    step1Image () { return Step1Image },
    step2Image () { return Step2Image },
    step3Image () { return Step3Image }
  },
  methods: {
    navigateToApp () {
      this.$router.push('/chatbot')
    }
  }
}

</script>

<style lang="scss" scoped>

.reverse {
      flex-direction: row-reverse;
    }

  .how-it-works__list-item {
    margin-bottom: $grid-line-height;

    &:last-child {
      margin-bottom: $grid-line-height;
    }

    aside {
      flex: 1;
    }

    .step-explanation {
      max-width: 450px;
      display: inline-block;
    }
    img {
      // @include card-shadow;
    }

  }
 @media only screen and (max-width: $mobile){
   .reverse {
      flex-direction: row;
    }
   .how-it-works__list-item {
      flex-direction: column !important;
      padding-bottom: 40px;
      margin-bottom: 40px;
      border-bottom: 1px solid rgba(0,0,0,0.1);

      img {
      // @include card-shadow;
        max-width: 100%;
      }

      aside.text {
      width: auto;
        .normal br {
          display: none;
        }
      }
      &.cb-margin-top-huge {
        margin-top: 40px;
      }
   }

  }
  @media only screen and (min-width: $mobile) and (max-width: $ipad) {
    .how-it-works__list-item {
      margin-bottom: 20px;
      img {
        max-width: 100%;
      }
    }
  }

</style>
