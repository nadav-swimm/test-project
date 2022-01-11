<template>
  <section class="wizard-step__container wizard-step3 flex col flex-align-start">
    <!-- ========================================= -->
    <sharing-options-main v-if="!shareOption" />
    <share-by-email v-if="shareOption == 'email'" />
    <edit-chat-bot v-if="shareOption == 'edit'" />
    <share-by-embed v-if="shareOption == 'embed'" />

    <section
      v-if="false"
      class="wizard-step3__banner flex col"
    >
      <!-- Contextual Big image -->
    </section>
  </section>
</template>

<script>
import ShareByEmbed from '@/app/share/shareByEmbed.vue'
import ShareByEmail from '@/app/share/shareByEmail.vue'
import EditChatBot from '@/app/edit/editChatBot.vue'
import SharingOptionsMain from '@/app/share/SharingOptionsMain.vue'
import { mapGetters, mapMutations } from 'vuex'
const TOKEN_PLACEHOLDER = '[***]'
const CHAT_FORMS_BOT_URL = `https://chat-forms.com/forms/${TOKEN_PLACEHOLDER}/?form`

//
// The Success and Share step
// -----------------------------------------
// The Form generation has been successful
// - Displays a success view
// - Navigate between the different sharing options
//
export default {
  components: {
    SharingOptionsMain,
    ShareByEmbed,
    ShareByEmail,
    EditChatBot

  },

  data () {
    return {
      results: null,
      formEditError: ''
    }
  },
  created () {
    console.log('calleddd')
  },
  computed: {
    ...mapGetters([
      // Icons
      'emailIconBlack',
      'pencilIconBlack',
      'embedIconBlack',

      'chatBotProductionDir',
      'shareOption',
      'chevronDownIcon',
      'fireImpressionStep3',
      'fireEventOpenChat'
    ])

  },
  mounted () {
    this.fireImpressionStep3()
    this.setShareOption(null)
  },

  methods: {

    ...mapMutations([
      'setShareOption'
    ]),

    openChat () {
      this.fireEventOpenChat()
      window.open(CHAT_FORMS_BOT_URL.replace(TOKEN_PLACEHOLDER, this.$store.getters.chatBotProductionDir), '_blank')
    }

  }
}
</script>

<style lang="scss" scoped>
.icon {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}
.wizard-step__container.wizard-step3 {
  min-height: 550px;
  justify-content: flex-start;
}

// large sections - layout
.wizard-step3__banner {
  width: 50%;
  justify-content: flex-start;
  text-align: center;
  height: 100%;
  align-items: center;
}

.back-navigation {
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    height: 56px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 20px 20px 0 0;
  padding-left: 35px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.back-navigation__title {
  flex:1;
    text-align: left;
    border-left: 1px solid rgba(0,0,0,0.2);
    padding-left: 20px;
}
.back-navigation__back {
  justify-self: flex-start;
  width: 70px;
}

.main-title {
  font-weight: 800;
}
.subtitle {
  font-weight: 400;
  margin-bottom: 20px;
}

.share-banner {
  display: inline-block;
}
  .share-banner__edit {
    height: 400px;
  }
  .rotate-minus-90{
    transform: rotate(90deg);
  }

@media only screen and (min-width: $mobile) and (max-width: $small-screens) {
  // .wizard-step3__sharing-options__main {
  //   .prominent {
  //     font-size: 30px;
  //     margin-bottom: 10px;
  //   }
  // }
}
@media only screen and (max-width: 800px) {
  .wizard-step3__banner {
    display: none;
  }

}
@media only screen and (max-width: $mobile) {

  .wizard-step__container.wizard-step3 {
    // height: calc(100vh - 175px);
    width: auto;
    overflow: auto;
  }

  .share-banner {
    width: 180px;
    height: 120px;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  .logo-icon {
    transform: rotate(-15deg);
  }
  .cta {
    justify-content: center;
    align-content: center;
  }

  .success-and-share__text{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
  }

}

</style>
