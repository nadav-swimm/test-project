<template>
  <section
    class="examples wrapper content-box"
  >
    <cb-title
      class="examples__title cb-margin-bottom-lg"
      title-type="subtled"
    >
      Chat Examples
    </cb-title>
    <section class="examples__list">
      <vuescroll>
        <cb-thumbnail-boxes :items="list" />
      </vuescroll>
    </section>
  </section>
</template>

<script>
import vuescroll from 'vuescroll'
import { mapGetters } from 'vuex'
export default {
  components: {
    vuescroll
  },
  computed: {
    ...mapGetters(['exampleOrderFormImage', 'exampleProductFeedbackImage',
      'exampleRegistrationImage', 'exampleEventRegistrationImage', 'exampleContactImage',
      'exampleOnboardingImage', 'exampleOnboardingImage', 'exampleJobApplicationImage']),
    list () {
      return [
        { title: 'Product Feedback', icon: this.exampleProductFeedbackImage, url: 'https://chat-forms.com/forms/1612042889945-rse/?form' },
        { title: 'Event Registration', icon: this.exampleEventRegistrationImage, url: 'https://chat-forms.com/forms/1612046191485-lec/?form' },
        { title: 'Customer Feedback', icon: this.exampleProductFeedbackImage, url: 'https://chat-forms.com/forms/1612043332489-6xe/?form' },
        { title: 'Onboarding', icon: this.exampleOnboardingImage, url: 'https://chat-forms.com/forms/1612042079648-jzz/?form' },
        { title: 'Job Application', icon: this.exampleJobApplicationImage, url: 'https://chat-forms.com/forms/1612043573830-otu/?form' },
        { title: 'Registration', icon: this.exampleRegistrationImage, url: 'https://chat-forms.com/forms/1612044006773-2zx/?form' },
        { title: 'Contact Details', icon: this.exampleContactImage, url: 'https://chat-forms.com/forms/1612044943246-ep2/?form' },
        { title: 'Order Form', icon: this.exampleOrderFormImage, url: 'https://chat-forms.com/forms/1565516618383-cd2/?form' }
      ]
    }
  },
  methods: {
    clicked () {
      alert('clicked')
    }
  }
}
</script>

<style lang="scss" scoped>

.examples__list {
  display: flex;

  .see-more {
    justify-content: flex-start;
  }
}

</style>
<style lang="scss">
@media only screen and (min-width: $ipad) {

  .cb-thumbnail-boxes {
    display: grid;
    grid-template-columns: 221px 221px 221px 221px;
    grid-template-rows: 235px;
    grid-column-gap: 40px;
    grid-row-gap: 30px;
  }
  .cb-thumbnail-item {
    img {
      width: 221px;
      height: 181px;
    }

  }

  .cb-thumbnail-text {
    color: #596D81
  }

  .examples .cb-thumbnail-link {

    .cb-thumbnail-img {
      width: 221px;
      height: 181px;
      overflow: hidden;
    }

    img {
      transition: all 0.5s;
      transform: scale(1);
      transition-timing-function: ease-out;

      &:hover{
        transform: scale(1.3) rotate(-5deg);
        transition: all 0.2s;
        transition-timing-function: ease-in;
      }
    }

    &:hover {
      .cb-thumbnail-text {
        color: $primary-color;

    }
    }

  }
}
@media only screen and (max-width: $ipad), (max-device-height: $mobile) {
.cb-thumbnail-boxes {
    display: flex;
    flex: 1;
    height: 255px;
    overflow: auto;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }
  .cb-thumbnail-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    flex-wrap: wrap;
    margin-right: 10px;
  }

}
</style>
