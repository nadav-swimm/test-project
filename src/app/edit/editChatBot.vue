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
            v-if="fields.messages"
            class="edit-content__list"
          >
            <div
              v-for="(item, qIndex) in fields.messages"
              :key="`messages_${qIndex}`"
              class="flex col"
            >
              <div
                v-for="(textMessage, tIndex) in item.message.text"
                :key="tIndex"
                class="flex col edit-content__message-item"
              >
                <textarea
                  :ref="`${qIndex}, ${tIndex}`"
                  v-model="fields.messages[qIndex].message.text[tIndex]"
                  class="bot-message-field"
                  placeholder="add multiple lines"
                  @keyup="onMessageChange(qIndex, tIndex)"
                />
              </div>
            </div>
          </div>
        </section>

        <section class="edit-content">
          <cb-text
            small
            block
            primary
            class="edit-content__title"
          >
            Submission Text
          </cb-text>
          <div
            v-if="fields.messages_submit"
            class="edit-content__list"
          >
            <div
              v-for="(item, qIndex) in fields.messages_submit"
              :key="`messages_subit_${qIndex}`"
              class="flex col"
            >
              <div
                v-for="(textMessage, tIndex) in item.message.text"
                :key="tIndex"
                class="flex col edit-content__message-item"
              >
                <textarea
                  :ref="`submit_${qIndex}, ${tIndex}`"
                  v-model="fields.messages_submit[qIndex].message.text[tIndex]"
                  class="bot-message-field"
                  placeholder="add multiple lines"
                  @keyup="onSubmitMessageChange(qIndex, tIndex)"
                />
              </div>
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
        :on-click="setSharingOption"
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
        text="Publish"
      />
    </template>
  </sharing-options-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import _editBanner from '~/assets/edit_illustration.svg'
import SharingOptionsLayout from '~/src/app/share/sharingOptionsLayout.vue'

//
// Bot-Sharing Modal
//
export default {
  components: {
    SharingOptionsLayout
  },
  data () {
    return {
      changeTracker: {},
      errorsTracker: {},
      fields: [],
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
    this.originalMessage = JSON.parse(JSON.stringify(this.formFieldsFromExistingChatbot))
    this.fields = this.formFieldsFromExistingChatbot
    console.log(this.fields)
    // this.submitMessages = this.formFieldsFromExistingChatbot.messages_submit
  },

  methods: {
    ...mapMutations([
      'updateFormMessages',
      'updateFormQuestions',
      'updateFormQuestionsSubmit',
      'hideModal',
      'setShareOption',
      'setFormEditIndication'
    ]),
    ...mapActions([
      'updateDeployedChatbotFields'
    ]),

    onMessageChange (qIndex, tIndex) {
      const index = `${qIndex}, ${tIndex}`
      const original = this.originalMessage.messages[qIndex].message.text[tIndex]
      console.log(this.fields.messages)
      const updated = this.fields.messages[qIndex].message.text[tIndex]
      const element = this.$refs[index][0]

      // Detect a change in a specific message
      if (original !== updated && updated !== '') {
        this.changeTracker[index] = 1
        element.classList.add('cb-input__changed')
      } else {
        this.changeTracker[index] = 0
        element.classList.remove('cb-input__changed')
      }

      if (updated === '') {
        element.classList.add('cb-input__error')
        this.errorsTracker[index] = 1
      } else {
        this.errorsTracker[index] = 0
        element.classList.remove('cb-input__error')
      }

      // Detect total changes
      let sumOfChanges = 0
      for (const ii in this.changeTracker) {
        sumOfChanges += this.changeTracker[ii]
      }

      // Detect total changes
      let sumOfErrors = 0
      for (const ii in this.errorsTracker) {
        sumOfErrors += this.errorsTracker[ii]
      }

      this.editDisabled = (sumOfChanges === 0 || sumOfErrors !== 0)
    },

    onSubmitMessageChange (qIndex, tIndex) {
      const index = `submit_${qIndex}, ${tIndex}`
      console.log(index, this.originalMessage)
      const original = this.originalMessage.messages_submit[qIndex].message.text[tIndex]
      console.log(this.fields.messages_submit)
      const updated = this.fields.messages_submit[qIndex].message.text[tIndex]
      const element = this.$refs[index][0]

      // Detect a change in a specific message
      if (original !== updated && updated !== '') {
        this.changeTracker[index] = 1
        element.classList.add('cb-input__changed')
      } else {
        this.changeTracker[index] = 0
        element.classList.remove('cb-input__changed')
      }

      if (updated === '') {
        element.classList.add('cb-input__error')
        this.errorsTracker[index] = 1
      } else {
        this.errorsTracker[index] = 0
        element.classList.remove('cb-input__error')
      }

      // Detect total changes
      let sumOfChanges = 0
      for (const ii in this.changeTracker) {
        sumOfChanges += this.changeTracker[ii]
      }

      // Detect total changes
      let sumOfErrors = 0
      for (const ii in this.errorsTracker) {
        sumOfErrors += this.errorsTracker[ii]
      }

      this.editDisabled = (sumOfChanges === 0 || sumOfErrors !== 0)
    },

    updateForm () {
      this.updateFormMessages(this.fields)
      // show processing.
      this.loading = true
      this.updateDeployedChatbotFields().then((res) => {
        this.loading = false
        if ((res.data.status) === 'success') {
          this.hideModal('chat-bot-editor-modal')
          this.setShareOption(null)
          this.setFormEditIndication(true)
          this.$modal.hide('popupModal')
          this.fields = []
        } else {
          this.formEditError = 'Something went wrong. Please try again.'
          this.$modal.hide('popupModal')
          this.fields = []
        }
      })
    },
    setSharingOption () {
      this.setShareOption(null)
      this.$modal.hide('popupModal')
      this.fields = []
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
    height: 67px;
    border-radius: 0 20px 20px 20px;
    font-size: 14px;
    background: #fff;
    color: #4f515d;
    padding: 10px 46px 10px 7px;
    margin-bottom: 7px;
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

.cb-input__error {
  background: #ffeaea !important;
}

.cb-input__changed  {
  background:#edf9f1 !important;
}

.cb-input__changed .emoji-vue-textarea {
  background:#edf9f1 !important;
}
.edit-content-wrapper{
    width: 100%;
    max-height: 350px;
    overflow: auto;
  }
@media only screen and (max-width: $ipad) {

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
