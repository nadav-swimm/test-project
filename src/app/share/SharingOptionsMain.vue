<template>
  <sharing-options-layout>
    <template v-slot:title>
      <cb-text
        prominent
        large
        bold
        block
      >
        Share it with the world 📢
      </cb-text>
      <cb-text
        class="cb-margin-bottom-md"
        small
        block
        center
      >
        Your chat is ready!<br>
        You have many ways to get to your audience.
      </cb-text>
    </template>

    <template v-slot:left>
      <nav class="flex col flex-align-start sharing-navigation">
        <cb-text
          bold
          small
          primary
          class="cb-margin-bottom-lg"
        >
          What would you like to do next?
        </cb-text>

        <!-- Sharing Option: Open chatbot -->
        <div
          class="sharing-options__item cb-margin-bottom-lg flex row"
          @click="openChat"
        >
          <img
            :src="openIcon"
          ><cb-text
            hoverlink
            primary
            small

            nocursor
          >
            Open your chatbot
            <cb-text
              v-if="showFormEditBadge"
              badge
            >
              Changed
            </cb-text>
          </cb-text>
        </div>

        <!-- Sharing Option: Edit chatbot -->
        <div
          class="sharing-options__item cb-margin-bottom-lg flex row"
          @click="showEditDialog"
        >
          <img
            :src="pencilIcon"
          ><cb-text
            class="sharing-option-edit-chat"
            hoverlink
            primary
            small

            nocursor
          >
            Edit your chat
          </cb-text>
        </div>

        <!-- Sharing Option: Create -->
        <div
          class="sharing-option__create sharing-options__item cb-margin-bottom-lg flex row"
          @click="onCreateNewChat"
        >
          <img
            :src="plusIcon"
          ><cb-text
            hoverlink
            small
            primary

            nocursor
          >
            Create another
          </cb-text>
        </div>

        <!-- Sharing Option: Share chatbot -->
        <cb-text
          small
          bold
          primary
          class="sharing-option__embed sharing-options__item cb-margin-top-md cb-margin-bottom-lg"
        >
          Share
        </cb-text>

        <!-- Embed in your website -->
        <div
          class="sharing-options__item cb-margin-bottom-lg flex row"
          @click="()=>setShareOption('embed')"
        >
          <img
            :src="embedIcon"
          ><cb-text
            hoverlink
            small
            nocursor

            primary
          >
            Embed in your website
          </cb-text>
        </div>

        <!-- Share by email -->
        <div
          class="sharing-options__item cb-margin-bottom-lg flex row"
          @click="()=>setShareOption('email')"
        >
          <img
            :src="emailIcon"
          ><cb-text
            hoverlink
            small
            nocursor

            primary
          >
            Share by email
          </cb-text>
        </div>

        <!-- Copy link -->
        <div
          class="sharing-options__item sharing-option-get-link cb-margin-bottom-lg flex column"
        >
          <div class="flex row">
            <img
              :src="linkIcon"
            >
            <cb-plain-copy-to-clipboard
              :val="chatBotUrl"
              text="Get your chatbot link"
            />
          </div>
        </div>

        <social-media />
      </nav>
    </template>

    <template v-slot:right>
      <img
        class="share-banner share-banner__default"
        :src="shareBanner"
      >
    </template>
    <template v-slot:cta />
  </sharing-options-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import _shareBanner from '~/assets/share_banner.svg'
import SharingOptionsLayout from '~/src/app/share/sharingOptionsLayout.vue'
import SocialMedia from '@/app/share/shareBySocialMedia.vue'

export default {
  components: {
    SharingOptionsLayout,
    SocialMedia
  },

  computed: {
    ...mapGetters([
      // Icons
      'robotIcon',
      'openIcon',
      'embedIcon',
      'pencilIcon',
      'plusIcon',
      'emailIcon',
      'linkIcon',

      // Form
      'isAppLoading',
      'chatBotUrl',
      'chatBotProductionDir',
      'formFieldsFromExistingChatbot',
      'showFormEditBadge',

      // Analytics
      'fireEventOpenEditDialog',
      'fireEventOpenChat',
      'fireEventOpenShareOptions',
      'fireEventCreateAnotherChat'

    ]),

    shareBanner () {
      return _shareBanner
    }
  },
  methods: {
    ...mapMutations([
      'setShareOption',
      'setFormFieldsFromExistingChatbot',
      'showModal',
      'startAppLoader',
      'startAppLoader',
      'setFormEditIndication'
    ]),

    ...mapActions([
      'restartForm',
      'fetchAndSetRemoteChatbotFields'
    ]),

    openChat () {
      window.open(this.chatBotUrl, '_blank')
      this.setFormEditIndication(false)
      this.fireEventOpenChat()
    },

    showEditDialog () {
      this.fireEventOpenEditDialog()
      this.fetchAndSetRemoteChatbotFields()
    },

    showSharingOptions () {
      this.fireEventOpenShareOptions()
    },

    onCreateNewChat () {
      const confirmed = confirm('This will take you away from this view. Make sure you have this url bookmarked before you leave')
      if (confirmed) {
        this.fireEventCreateAnotherChat()
        this.restartForm()
        this.$router.push('/chatbot')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sharing-navigation {
  margin: 0;
  padding: 0;
}
.sharing-options__item {

      img {
        align-self: flex-start;
        justify-self: flex-start;
        width: 16px;
        height: 16px;
        margin-right: 20px;
        margin-top:3px;
      }
    }

@media (max-width: 319.98px) {
  .hoverlink {
    font-weight: 400 !important;
    font-size: 20px !important;
    margin-top: auto !important;
  }
}

@media (max-width: 575.98px) {
  .hoverlink {
    font-weight: 400 !important;
    font-size: 20px !important;
    margin-top: auto !important;
  }
}

@media (max-width: 767.98px) {
  .hoverlink {
    font-weight: 400 !important;
    font-size: 20px !important;
    margin-top: auto !important;
  }
}

@media only screen and (max-device-width: 780px), (max-device-height: 780px) {
  .hoverlink {
    font-weight: 400 !important;
    font-size: 14px !important;
    margin-top: auto !important;
  }
}
</style>
