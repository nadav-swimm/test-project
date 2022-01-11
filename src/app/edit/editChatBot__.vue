<template>
  <sharing-options-layout>
    <template v-slot:title>
      <cb-text
        prominent
        large
        bold
        block
      >
        Customize your Chatbot!!
      </cb-text>
      <cb-text
        class="cb-margin-bottom-md"
        small
        block
        center
      >
        Give your chatbot more personalized feeling.
      </cb-text>
    </template>

    <template v-slot:left>
      <section class="flex col edit-content-wrapper">
        <div
          v-if="loading"
          class="cb-component-overlay"
        />

        <!-- ------------------------------
      Chat Edit form
    ---------------------------------->
        <section class="edit-content">
          <cb-text
            small
            block
            primary
            class="edit-content__title"
          >
            Greetings & Statements
          </cb-text>
          <div
            v-if="formFieldsFromExistingChatbot"
            class="edit-content__list"
          >
            <div
              v-for="(item, qIndex) in formFieldsFromExistingChatbot.messages"
              :key="`messages_${qIndex}`"
              class="flex col"
            >
              <div
                v-for="(textMessage, tIndex) in item.message.text"
                :key="tIndex"
                class="flex col edit-content__message-item"
              >
                <VueEmoji
                  :ref="`${qIndex}, ${tIndex}`"
                  :value="textMessage"
                  width="280px"
                  autocomplete="off"
                  :data-original-message="textMessage"
                  @input="updateMessage(qIndex, tIndex, $event)"
                />
              </div>
            </div>
          </div>

          <!-- ------------------------------
      Chat Edit form Submit Fields
    ---------------------------------->
          <br>
          <cb-text
            small
            block
            primary
            class="edit-content__submit"
          >
            Submission Text
          </cb-text>

          <div
            v-for="(item, qIndex) in formFieldsFromExistingChatbot.messages_submit"
            :key="`messages_subit_${qIndex}`"
            class="flex col"
          >
            <div
              v-for="(textMessage, tIndex) in item.message.text"
              :key="tIndex"
              class="flex col"
            >
              <input
                :id="`${qIndex}, ${tIndex}`"
                :ref="`${qIndex}, ${tIndex}`"
                class="bot-message-field"
                autocomplete="off"
                :value="textMessage"
                :data-original-message="textMessage"
                @input="updateMessageSubmit(qIndex, tIndex, $event)"
              >
            </div>
          </div>
        </section>
      </section>
    </template>

    <template v-slot:right>
      <img
        class="share-banner share-banner__edit"
        :src="editBanner"
      >
    </template>
    <template v-slot:cta>
      <cb-button
        secondary
        :on-click="()=>setShareOption(null)"
        text="Cancel"
        class="cb-margin-right-md"
      />
      <!-- ------------------------------
      Chat Edit form UPDATE
    ---------------------------------->
      <cb-button
        id="uuid-edit-update"
        primary
        class="edit-modal__update-button"
        minimal
        :disabled="editDisabled"
        :on-click="updateForm"
        text="Save"
      />
    </template>
  </sharing-options-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import VueEmoji from 'emoji-vue'
import _editBanner from '~/assets/edit_illustration.svg'
import SharingOptionsLayout from '~/src/app/share/sharingOptionsLayout.vue'

//
// Bot-Sharing Modal
//
export default {
  components: {
    VueEmoji,
    SharingOptionsLayout
  },
  data () {
    return {
      messages: [],
      loading: false,
      editDisabled: true,
      showEmoji: false
    }
  },

  computed: {
    ...mapGetters([
      'formFieldsFromExistingChatbot',
      'rawGoogleFormUrl',
      'chatBotProductionDir'
    ]),
    editBanner () {
      return _editBanner
    }

  },

  mounted () {
    this.messages = this.formFieldsFromExistingChatbot.messages
  },

  methods: {
    ...mapMutations([
      'updateFormQuestions',
      'updateFormQuestionsSubmit',
      'hideModal',
      'setShareOption'
    ]),
    ...mapActions([
      'updateDeployedChatbotFields'
    ]),

    updateMessage (questionId, textFieldsId, e) {
      // unfortunate workaround to show an input has been changed
      // since the whole data structure isn't modeled properly
      // I had to compromise on ref's and injecting data-original-message into the dom
      console.log('changed')
      this.editDisabled = false
      const hash = `${questionId}, ${textFieldsId}`
      const element = this.$refs[hash][0].$el

      // set indication for "edited"
      element.classList.add('cb-input__changed')

      // update the chatbot
      this.updateFormQuestions({
        questionIndex: questionId,
        textIndex: textFieldsId,
        newValue: e.data
      })
    },

    updateMessageSubmit (questionId, textFieldsId, e) {
      // unfortunate workaround to show an input has been changed
      // since the whole data structure isn't modeled properly
      // I had to compromise on ref's and injecting data-original-message into the dom
      const inputElement = e.target
      const originalMessage = inputElement.getAttribute('data-original-message')
      const element = this.$refs[`${questionId}, ${textFieldsId}`][0]
      const fieldHasChanged = originalMessage !== inputElement.value

      // Be able to show change between original and new value
      if (fieldHasChanged) {
        this.editDisabled = false
        element.classList.add('cb-input__changed')
      } else {
        element.classList.remove('cb-input__changed')
      }

      this.updateFormQuestions({
        questionIndex: questionId,
        textIndex: textFieldsId,
        newValue: inputElement.value
      })
    },

    updateForm () {
      // show processing.
      this.loading = true
      this.updateDeployedChatbotFields().then((res) => {
        this.loading = false
        if ((res.data.status) === 'success') {
          this.hideModal('chat-bot-editor-modal')
        } else {
          this.formEditError = 'Something went wrong. Please try again.'
        }
      })
    }

  }
}
</script>
<style lang="scss">
.emoji-picker {
visibility: hidden;
}
.bot-message-field,
.emoji-vue-textarea{
    outline: none;
    border: none;
    border-radius: 0 20px 20px 20px;
    font-size: 14px;
    background: #fff;
    color: #4f515d;
    padding: 7px 46px 7px 7px;
    margin-bottom: 7px;
    height: 60px !important;
    max-width: 100%;
    outline: none !important;
    border: 1px solid rgba(0, 0, 0, 0.1);

}
.emoji-picker-container{
  &:hover .emoji-picker, &:focus .emoji-picker{
      visibility: visible;
      opacity: 0.5;
    }
}
.emoji-vue-textarea:focus {
    background: #e8f4ff;
}

.cb-input__changed .emoji-vue-textarea {
  background:#edf9f1 !important;
}

@media only screen and (max-width: $ipad) {
   .edit-content-wrapper{
    width: 100%;
  }
}

@media only screen and (max-width: $mobile) {
  .emoji-picker{
    display: none !important;
  }
}
</style>
<style lang="scss" scoped>
.edit-content__title, .edit-content__intro, .edit-content__submit {
  @include margin('down', 'md');
}

.edit-content__message-item{
position: relative;
}
.emoji-picker-handle {
  position: absolute;
  top: 10px;
  right: 10px;
}
.edit-content__message-item__emoji {
position: absolute;
  top: 36px;
  left: 37px;
  z-index: 100;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);

}

.edit-content {
  max-height: 310px;
  overflow: auto;
  margin-bottom: 20px;
}

  .edit-modal__footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

@media only screen and (max-width: $mobile) {

  .edit-modal__title {
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
  .edit-modal__forms {
    padding: 10px;
  }

}
</style>
<style lang="scss">

@media only screen and (max-width: $mobile){
  .edit-modal__footer{
    display: flex;
    position: absolute;
    bottom: 0px;
    flex: 1;
    left: 20px;
    right: 20px;

    .cb-button {
      flex: 1;
    }
  }

  .edit-modal__content {
      position: fixed;
      bottom: 70px;
      top: 100px;
      max-height: 100vh !important;
      left: 0;
      right: 0;
  }
  .edit-modal .modal__content {
    width: auto !important;
  }
}
.ti-input {
  flex:1
}

</style>
