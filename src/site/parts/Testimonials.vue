<template>
  <section class="wrapper content-box">
    <cb-title title-type="subtled">
      <div class="cb-margin-bottom-md">
        Testimonials
      </div>
    </cb-title>
    <cb-text class="subtitle">
      Here are just a few out of many reviews of our Chatbots!
    </cb-text>
    <ul class="testimonials-list">
      <li>
        <div class="shadow-box">
          <img :src="ellenImage">
          <p>
            <strong>Ellen W</strong><br>
            I’m using it for survey and customers feedback
          </p>
        </div>
      </li>
      <li>
        <div class="shadow-box">
          <img :src="dannyImage">
          <p>
            <strong>Danny Arno</strong><br>
            I love that it turns to a chat in one click!
          </p>
        </div>
      </li>
      <li>
        <div class="shadow-box">
          <img :src="karenImage">
          <p>
            <strong>Karen Daniel</strong><br>
            Conversation is more engaging than a form
          </p>
        </div>
      </li>
    </ul>

    <div class="link-to-top flex row flex-align-center">
      <cb-button
        class="cb-margin-bottom-xlg cb-margin-top-lg"
        primary
        text="Create a Chatbot"
        :on-click="clicked"
      />
    </div>
  </section>
</template>

<script>

import ellenImage from '~/assets/ellen_w.png'
import karenImage from '~/assets/danny.png'
import dannyImage from '~/assets/karen.png'
import utils from '@/services/utils.js'

export default {
  computed: {
    karenImage () { return karenImage },
    ellenImage () { return ellenImage },
    dannyImage () { return dannyImage }
  },
  methods: {
    clicked () {
      utils.scrollToTop()
    }

  }

}
</script>

<style lang="scss" scoped>
.testimonials-list {
  display: flex;
  margin-top: 50px;
  li {
    flex-direction: row;
    display: flex;

        margin: 25px;

    position: relative;

    .shadow-box {
      box-shadow: 0 0 10px 2px rgba(0,0,0,0.15);
      padding: 25px;
      border-radius: 5px;
    }

    img {
      position: absolute;
      top: -26px;
      left: -26px;
      width: 56px;
      height: 56px;

    }

  }

}
  @media only screen and (max-width: $mobile) {
      .link-to-top{
        display: none;
      }
       .testimonials-list {
         flex-direction: row;
         flex-flow: nowrap;
         overflow:auto;
         padding: 5px;
         align-self: flex-start;

          > li {
            width: 240px;
            flex-shrink: 0;
            height: 170px;
            padding: 6px;
            margin: 5px;

            .shadow-box {
              padding: 15px;
            }

            img {
              top: -10px;
              left: -6px;
              width: 56px;
              height: 56px;
            }

          }
       }
        .subtitle{
          text-align: left;
          justify-content: flex-start;
          display: flex;
        }
    }

#see-testimonials-cta {

  margin-top: 60px;
  margin-bottom: 100px;
}
</style>"
