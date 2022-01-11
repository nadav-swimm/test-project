<template>
  <section class="faq wrapper cb-site-width no-select">
    <div class="chatboat-header">
      <div class="chatboat-content">
        <div>
          <p class="title-heading">
            My Chatboats
          </p>
        </div>
      </div>
    </div>
    <div class="dashboard-header">
      <div class="input-content">
        <span class="input-text">
          <div class="cb-form-input__wrapper">
            <cb-button
              v-if="filtered"
              class="form-to-chat__form-clear-input-button"
              :icon="subtractIcon"
              :on-click="resetSearchText"
            />
            <i
              class="fa fa-search search-icon"
              aria-hidden="true"
            ></i>
            <input
              type="text"
              placeholder="Search Chatbots"
              class="chatboat-input"
              v-model="filteredText"
              @change="getSearchData"
              @keyup="getSearchData"
            >
          </div>
        </span>
        <!-- <span class="group-icons">
          <i
            class="fa fa-bars custom-icons"
            aria-hidden="true"
          />
          <i
            class="fa fa-th-large custom-icons"
            aria-hidden="true"
          />
        </span> -->
      </div>
      <cb-button
        primary
        class="edit-modal__update-button addChat-btn"
        minimal
        :on-click="redirectToForm"
        text="Create a new chatbot"
      />
    </div>
    <hr class="custom-hr" />
    <div class="chatboat-lists">
      <vsa-list v-if="filtered" :key="componentKey">
        <vsa-item
          v-for="(item,index) in filterData"
          :key="index"
        >
          <vsa-heading>
            <div class="chat-block">
              <div class="img-block">
                <img
                  class="share-banner share-banner__edit"
                  :src="squareBanner"
                >
                <p class="heading-text">
                  {{item.formName}}
                </p>
              </div>
              <div class="created-content">
                <span class="span-text">Created On</span>
                <p class="date-text">
                  {{ getLocalDate(item.createdTime) }}
                </p>
              </div>
            </div>
          </vsa-heading>
          <vsa-content>
            <div class="wrapper-content">
              <sharing-options-layout class="custom-layout">
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
                      @click="openChat(item)"
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
                      @click="showEditDialog(item)"
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
                      @click="embedInWeb(item.formId)"
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
                      @click="shareByEmail(item.formId)"
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
                          :val="getChatboatURL(item.formId)"
                          text="Get your chatbot link"
                        />
                      </div>
                    </div>

                    <social-media
                      :formId="item.formId"
                    />
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
            </div>
          </vsa-content>
        </vsa-item>
      </vsa-list>
      <div v-else>
        <vsa-list>
          <vsa-item
            v-for="(item,index) in chatBoats"
            :key="index"
          >
            <vsa-heading>
              <div class="chat-block">
                <div class="img-block">
                  <img
                    class="share-banner share-banner__edit"
                    :src="squareBanner"
                  >
                  <p class="heading-text">
                    {{item.formName}}
                  </p>
                </div>
                <div class="created-content">
                  <span class="span-text">Created On</span>
                  <p class="date-text">
                    {{ getLocalDate(item.createdTime) }}
                  </p>
                </div>
              </div>
            </vsa-heading>
            <vsa-content>
              <div class="wrapper-content">
                <sharing-options-layout class="custom-layout">
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
                        @click="openChat(item)"
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
                        @click="showEditDialog(item)"
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
                        @click="embedInWeb(item.formId)"
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
                        @click="shareByEmail(item.formId)"
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
                            :val="getChatboatURL(item.formId)"
                            text="Get your chatbot link"
                          />
                        </div>
                      </div>

                      <social-media
                        :formId="item.formId"
                      />
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
              </div>
            </vsa-content>
          </vsa-item>
        </vsa-list>
      </div>
    </div>
    <modal
      name="popupModal"
      :width="1000"
      :height="650"
      :adaptive="true"
      :clickToClose="false"
    >
      <div>
        <button @click="hideModal" class="btn-close">
          <i class="fa fa-times fa-2x grey-icon" aria-hidden="true"></i>
        </button>
        <share-by-email v-if="shareOption == 'email'" />
        <edit-chat-bot v-if="shareOption == 'edit'" />
        <share-by-embed v-if="shareOption == 'embed'" />
      </div>
    </modal>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ShareByEmbed from '@/app/share/shareByEmbed.vue'
import ShareByEmail from '@/app/share/shareByEmail.vue'
import EditChatBot from '@/app/edit/editChatBot.vue'
import squareImage from '~/assets/group_icons.png'
import _shareBanner from '~/assets/share_banner.svg'
import SocialMedia from '@/app/share/shareBySocialMedia.vue'
import SharingOptionsLayout from '~/src/app/share/sharingOptionsLayout.vue'
import {
  VsaList,
  VsaItem,
  VsaHeading,
  VsaContent
} from 'vue-simple-accordion'
import 'vue-simple-accordion/dist/vue-simple-accordion.css'
export default {
  components: {
    VsaList,
    VsaItem,
    VsaHeading,
    VsaContent,
    SharingOptionsLayout,
    SocialMedia,
    ShareByEmbed,
    ShareByEmail,
    EditChatBot
  },
  data () {
    return {
      chatBoats: [],
      componentKey: 0,
      filteredText: null,
      items: [
        {
          id: 1,
          name: 'hello',
          content: 'content'
        },
        {
          id: 2,
          name: 'hello1',
          content: 'content1'
        },
        {
          id: 3,
          name: 'hello3',
          content: 'content3'
        }
      ],
      filterData: [],
      filtered: false
    }
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
      'shareOption',
      'subtractIcon',

      // Form
      'isAppLoading',
      'chatBotUrl',
      'chatBotProductionDir',
      'formFieldsFromExistingChatbot',
      'showFormEditBadge',

      // Analytics
      'formOpenEditDialog',
      'fireEventOpenEditDialog',
      'fireEventOpenChat',
      'fireEventOpenShareOptions',
      'fireEventCreateAnotherChat'

    ]),
    shareBanner () {
      return _shareBanner
    },
    squareBanner () {
      return squareImage
    }
  },
  watch: {
    filterData (newValue) {
      this.filterData = newValue
    }
  },
  created () {
    this.getChatboatLists()
    this.setUserEmail({ target: { value: localStorage.getItem('email') } })
  },
  methods: {
    ...mapMutations([
      'setShareOption',
      'setFormFieldsFromExistingChatbot',
      'showModal',
      'startAppLoader',
      'startAppLoader',
      'setFormEditIndication',
      'setChatBotProductionDir',
      'setUserEmail'
    ]),

    ...mapActions([
      'restartForm',
      'fetchUserChatbotFields',
      'fetchAndSetRemoteChatbotFields',
      'getUserChatBoats'
    ]),
    redirectToForm () {
      this.$router.push({ name: 'app' })
    },
    getLocalDate (Data) {
      var date = new Date(Data)
      if (isNaN(date.getTime())) {
        return date
      } else {
        var month = []
        var day
        month[0] = '1'
        month[1] = '2'
        month[2] = '3'
        month[3] = '4'
        month[4] = '5'
        month[5] = '6'
        month[6] = '7'
        month[7] = '8'
        month[8] = '9'
        month[9] = '10'
        month[10] = '11'
        month[11] = '12'
        day = date.getDate()
        if (day < 10) {
          day = '0' + day
        }
        return day + '/' + month[date.getMonth()] + '/' + date.getFullYear()
      }
    },
    getChatboatLists () {
      this.getUserChatBoats(localStorage.getItem('email')).then((res) => {
        if (res.data.output.length > 0) {
          this.chatBoats = res.data.output
          this.filterData = res.data.output
        } else {
          this.$router.push({ name: 'no-data' })
        }
      })
    },
    openChat (item) {
      var chatBotUrl = `https://chat-forms.com/forms/${item.formId}/?form`
      window.open(chatBotUrl, '_blank')
      this.setFormEditIndication(false)
      this.fireEventOpenChat()
    },

    showEditDialog (item) {
      this.formOpenEditDialog()
      this.fetchUserChatbotFields(item)
      this.setChatBotProductionDir(item.formId)
      this.$modal.show('popupModal')
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
    },
    getChatboatURL (id) {
      return `https://chat-forms.com/forms/${id}/?form`
    },
    shareByEmail (formId) {
      this.$modal.show('popupModal')
      this.setShareOption('email')
      this.setChatBotProductionDir(formId)
    },
    embedInWeb (formId) {
      this.$modal.show('popupModal')
      this.setShareOption('embed')
      this.setChatBotProductionDir(formId)
    },
    getSearchData (e) {
      if (this.filteredText !== '' && this.filteredText !== null) {
        this.filtered = true
        this.componentKey += 1
        var data = []
        data = this.chatBoats.filter(item => {
          return item.formName.toLowerCase().includes(this.filteredText.toLowerCase())
        })
        this.$set(this, 'filterData', data)
      } else {
        this.filtered = false
        this.componentKey += 1
        this.filteredText = null
      }
    },
    resetSearchText () {
      this.filteredText = ''
      this.filtered = false
    },
    hideModal () {
      this.$modal.hide('popupModal')
      // location.reload()
      this.setShareOption(null)
    }
  }
}
</script>

<style lang="scss" scoped>
// search icon
.search-icon {
  position: absolute;
  left: 1rem;
  top: 0.6rem;
  color: #818181 !important;
}

// chat form
.cb-form-input__wrapper {
  width: 100%;
  position: relative;
}

.form-to-chat__form-clear-input-button {
  position: absolute;
  right:6px;
  top: 6px;
  padding: 0 !important;
  background: transparent;
  cursor: pointer;
}

.chatboat-content {
  padding-top:10rem;
}
.vsa-list {
  margin-top: 50px;
  border: 0 !important;
  background-color: transparent !important;
  max-width: 100% !important;
  // --vsa-highlight-color: #ffffff !important;
}
.vsa-list {
  .vsa-item__trigger__icon {
    display: none !important;
  }
}
.vsa-item {
  border: 1px #ddd solid !important;
  margin-bottom: 15px !important;
  background-color: #fff !important;
  border-radius: 5px !important;
  padding: 5px 0px !important;
}
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

.chat-block {
  align-items: center !important;
  display: grid !important;
  grid-template-columns: 50% 50% !important;
  text-align: left !important;
  .img-block {
    display: flex !important;
    align-items: center !important;
  }
  .heading-text {
    margin-left: 2rem !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 2 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }
}
.created-content {
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
}
.span-text {
  font-weight: 400;
  font-size: 0.8rem;
  color: #596D81;
  margin-bottom: 0.5rem;
}
.date-text {
  font-size: 16px !important;
  color: #282336 !important;
  font-weight: 400 !important;
}
.heading-text {
  font-size: 1rem !important;
}
.dashboard-header{
  display: grid;
  grid-template-columns: 50% 50%;
}
.input-content{
  align-items: center;
  display: flex;
}
.input-text {
  display: inline-block;
  width: 60%;
}
.custom-icons {
  font-size: 20px;
  margin-left: 10px;
}
.chatboat-input{
  background-color: #fff;
  padding-left: 40px;
}
.addChat-btn{
  max-width: fit-content !important;
  margin-left: auto !important;
}
.addChat-btn:before {
  font-family: "Font Awesome 5 Free";
  content: "+";
  display: inline-block;
  padding-right: 10px;
  vertical-align: middle;
  font-weight: 900;
  font-size: 1.5rem !important;
}
.wizard-step3__wrapper .wizard-step3__title {
  height: auto !important;
}
.wizard-step3__title {
  display: none !important;
}
.custom-hr {
  border-color: transparent !important;
  margin-top: 2rem;
  background-color: #E2E6E9 !important;
  width: 95%;
}

.btn-close {
  position: absolute;
  cursor: pointer;
  z-index: 1111;
  right: 1rem;
  top: 1rem;
  border: transparent;
  background-color: #fff;
}

.grey-icon {
  color: #757575 !important;
}

// media queries for dashboard

@media (max-width: 319.98px) {
  .chatboat-content {
    padding-top: 6rem !important;
  }
  .group-icons {
    display: none;
  }
  .chatboat-lists {
    padding: 0.5rem 0.5rem !important;
    .vsa-list {
      margin-top: 0rem !important;
    }
  }
  .chat-block {
    grid-template-columns: 50% 50% !important;
    .created-content {
      margin-left: auto !important;
    }
  }
  .custom-hr {
    margin-top: 0rem !important;
  }

  .input-content {
    .input-text {
      width: 100% !important;
    }
  }

  .dashboard-header {
    display: flex !important;
    flex-direction: column !important;
    padding: 2rem 2rem !important;
    .addChat-btn {
      width: 100% !important;
      margin: auto !important;
      max-width: none !important;
      margin-top: 2rem !important;
    }
  }
  .title-heading {
    padding: 0rem 2rem !important;
  }
  .hoverlink {
    margin-top: auto !important;
  }
  .heading-text {
    margin-left: 2rem !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 2 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }
}

@media (max-width: 575.98px) {
  .chatboat-content {
    padding-top: 6rem !important;
  }
  .group-icons {
    display: none;
  }
  .chatboat-lists {
    padding: 0.5rem 0.5rem !important;
    .vsa-list {
      margin-top: 0rem !important;
    }
  }
  .chat-block {
    grid-template-columns: 50% 50% !important;
    .created-content {
      margin-left: auto !important;
    }
  }
  .custom-hr {
    margin-top: 0rem !important;
    width: 97%;
  }

  .input-content {
    .input-text {
      width: 100% !important;
    }
  }

  .dashboard-header {
    display: flex !important;
    flex-direction: column !important;
    padding: 2rem 2rem !important;
    .addChat-btn {
      width: 100% !important;
      margin: auto !important;
      max-width: none !important;
      margin-top: 2rem !important;
    }
  }
  .title-heading {
    padding: 0rem 2rem !important;
  }
  .hoverlink {
    margin-top: auto !important;
  }
  .heading-text {
    margin-left: 2rem !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 2 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .chatboat-content {
    padding-top: 6rem !important;
  }
  .chatboat-lists {
    padding: 2rem 2rem !important;
    .vsa-list {
      margin-top: 0rem !important;
    }
  }
  .chat-block {
    grid-template-columns: 50% 50% !important;
    .created-content {
      margin-left: auto !important;
    }
  }
  .custom-hr {
    margin-top: 0rem !important;
    width: 92%;
  }
  .dashboard-header {
    padding: 2rem 2rem !important;
  }
  .title-heading {
    padding: 0rem 2rem !important;
  }
  .hoverlink {
    margin-top: auto !important;
  }
  .heading-text {
    margin-left: 2rem !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 2 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .chatboat-content {
    padding-top: 6rem !important;
  }
  .chatboat-lists {
    padding: 2rem 2rem !important;
    .vsa-list {
      margin-top: 0rem !important;
    }
  }
  .chat-block {
    grid-template-columns: 50% 50% !important;
  }
  .custom-hr {
    margin-top: 0rem !important;
    width: 92%;
  }
  .dashboard-header {
    padding: 2rem 2rem !important;
  }
  .title-heading {
    padding: 0rem 2rem !important;
  }
  .heading-text {
    margin-left: 2rem !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 2 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  .chatboat-lists {
    padding: 2rem 2rem !important;
    .vsa-list {
      margin-top: 0rem !important;
    }
  }
  .chat-block {
    grid-template-columns: 50% 50% !important;
  }
  .custom-hr {
    margin-top: 0rem !important;
    width: 94%;
  }
  .dashboard-header {
    padding: 2rem 2rem !important;
  }
  .title-heading {
    padding: 0rem 2rem !important;
  }
}

@media (min-width: 1200px) {
  .chatboat-lists {
    padding: 2rem 2rem !important;
    .vsa-list {
      margin-top: 0rem !important;
    }
  }
  .chat-block {
    grid-template-columns: 50% 50% !important;
  }
  .custom-hr {
    margin-top: 0rem !important;
    width: 96%;
  }
  .dashboard-header {
    padding: 2rem 2rem !important;
  }
  .title-heading {
    padding: 0rem 2rem !important;
  }
}
.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently */
}
</style>
