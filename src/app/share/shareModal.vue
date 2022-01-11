
<template>
  <cb-modal
    modal-id="sharing-modal"
    width="615px"
    class="share-modal"
    @closed="onClose"
  >
    <cb-title class="share-modal__title">
      Share your Chatbot
    </cb-title>

    <section class="flex share-modal__navigation navigation">
      <ul class="flex flex-row">
        <li
          id="share-modal__navigation__by-email"
          :class="isShareByEmail? 'active': ''"
          @click="setShareByEmail"
        >
          <span class="icon email" />
        </li>
        <li
          id="share-modal__navigation__by-link"
          :class="isShareByLink? 'active': ''"
          @click="setShareByLink"
        >
          <span class="icon link" />
        </li>
        <li
          id="share-modal__navigation__by-embed"
          :class="isShareEmbedded? 'active': ''"
          @click="setShareByEmbed"
        >
          <span class="icon embed" />
        </li>
        <li
          id="share-modal__navigation__by-widget"
          :class="isShareByWidget? 'active': ''"
          @click="setShareByWidget"
        >
          <span class="icon widget" />
        </li>
      </ul>
      <span class="spacer" />
      <share-by-social-media />
    </section>
    <section class="share-modal__forms">
      <share-by-email v-if="isShareByEmail" />
      <share-by-link v-if="isShareByLink" />
      <share-by-embed v-if="isShareEmbedded" />
      <share-by-widget v-if="isShareByWidget" />
    </section>
  </cb-modal>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ShareByEmail from '@/app/share/shareByEmail.vue'
import ShareByEmbed from '@/app/share/shareByEmbed.vue'
import ShareByLink from '@/app/share/shareByLink.vue'
import ShareBySocialMedia from '@/app/share/shareBySocialMedia.vue'
import ShareByWidget from '@/app/share/shareByWidget.vue'
//
// Bot-Sharing Modal
//
export default {
  components: {
    shareByEmail: ShareByEmail,
    shareByEmbed: ShareByEmbed,
    shareByLink: ShareByLink,
    shareBySocialMedia: ShareBySocialMedia,
    shareByWidget: ShareByWidget
  },

  computed: {
    ...mapGetters([
      'isShareByEmail', 'isShareByLink', 'isShareEmbedded', 'isShareByWidget'
    ])

  },
  mounted () {
    window.addEventListener('keyup', e => {
      if (e.key === 'Escape') {
        this.hideModal()
      }
    })
  },

  methods: {
    ...mapMutations([
      'setShareByEmail', 'hideModal', 'setShareByEmbed', 'setShareByLink', 'setShareByWidget', 'resetForm'
    ]),
    onClose () {
      this.resetForm()
    }

  }
}
</script>

<style lang="scss" scoped>
.spacer {
    display: flex;
    flex: 1;
}

.active {
  border-bottom: 2px solid $primary-color;
  .icon {
    background-color: $primary-color;
  }
}
.email {
  @include svg-icon("email-2");

}

.widget {
  @include svg-icon("widget");

}

.link {
  @include svg-icon("link-2");

}

.embed {
  @include svg-icon("link");
  line-height: 22px;
}

.navigation {
    margin-bottom: 20px;
    flex-direction: row;
    li {
      width: 90px;
      padding-bottom:5px;
      justify-content: center;
      display: flex;
    }
}
.share-modal__title {
  @include margin('down', 'lg');
  padding: 20px 30px 20px 30px;
}
@media only screen and (max-width: $mobile) {
  .share-modal__title {
      margin: 0;
      padding: 0 0 20px 0;
      margin-top: 60px;
      border: none;
      justify-content: center;
      text-align: center;
      display: flex;
  }
  .navigation{
    flex-direction: column;
    flex-flow: column-reverse;
    margin: 10px;
    li {
      width: calc(100vw / 3)
    }
  }
  .share-modal__forms {
    padding: 10px;
  }
}
</style>
<style lang="scss">
@media only screen and (max-width: $mobile){
  .share-modal .social-media-links{
    // display: flex;
    // height: 30px;
    // align-items: center;
    // justify-content: center;
    // width: 100vw;
    display: none;
  }
  .share-modal__title {
    padding-bottom: 0 !important;
  }
  .share-modal .modal__content {
    width: auto !important;
  }
}
.ti-input {
  flex:1
}

</style>
