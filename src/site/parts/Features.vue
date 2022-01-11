<template>
  <section class="wrapper features cb-content">
    <div class="cb-app__content-max-width">
      <cb-hp-section-title>
        Why Chat-forms?
      </cb-hp-section-title>
      <div class="cb-grid-row" />

      <section>
        <ul class="list cb-horizontal-list">
          <li
            v-for="item in list"
            :key="item.title"
            class="item"
          >
            <cb-text
              large
              primary
              nocursor
              bold
              center
              class="cb-margin-bottom-md feature__title flex row"
            >
              <img
                v-if="item.icon"
                :src="item.icon"
                class="icon"
              >
              <span>{{ item.title }}</span>
            </cb-text>

            <cb-text
              normal
              nocursor
              center
            >
              {{ item.content }}
            </cb-text>
          </li>
        </ul>
      </section>
    </div>
    <div class="cb-grid-row" />
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import utils from '@/services/utils.js'

export default {
  computed: {
    ...mapGetters(['featureEasyToUseIcon', 'featureSaveTimeIcon', 'featureMobileWebIcon']),
    list () {
      return [
        { title: '🤝 Engaging', content: 'Chatbots are more effective and get better results' },
        { title: '😻 Delightful', content: 'Give your audience a delightful & interactive experience' },
        { title: '🎨 Easy to create', content: 'Convert your google form in one click and create a chatbot No-code needed' },
        { title: '😊 100% free', content: 'Create and share chatbots for free' }
      ]
    }

  },
  methods: {
    clicked () {
      utils.scrollToTop()
    }

  }
}
</script>

<style lang="scss" scoped>
.features {

  .list{
    display: flex;

    .item{
      padding: $spacing;
    }

    .icon {
        width: 24px;
        height: 24px;

      }
  }

}

   @media only screen and (max-width: $mobile) {
     .link-to-top{
        display: none;
      }
      .list {
        flex-direction: column;
        text-align: center;
        justify-content: center;
        li {
          border-bottom: 1px solid rgba(0,0,0,0.06);
          text-align: left;
          align-items: start;
          display: flex;
          flex-direction: column;
          span {
            text-align: left;
          }
        }
        li:last-child{
            border-bottom: none;
        }
      }

      .title {
        justify-content: center;
        display: flex;
      }
       .features {
       margin-bottom: 0;

       .feature__title {
        font-size: 20px;
      }
       }

   }

@media only screen and (min-width: $mobile) and (max-width: $ipad) {
    .feature__title {
      font-size: 24px;
    }

  .list {
        flex-direction: row;
        flex-wrap: wrap;
        text-align: left;

        li {
          width: calc(50% - 20px);
          flex-basis: auto;
          margin: 10px;
          border: 5px solid $site-bg-color;
          @include card-shadow;
          height: 210px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

      }
}

</style>
