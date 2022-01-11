<template>
  <sharing-options-layout>
    <template v-slot:title>
      <cb-text
        prominent
        large
        bold
        block
      >
        Share it by Email!
      </cb-text>
      <cb-text
        class="cb-margin-bottom-md"
        small
        block
        center
      >
        Your audience will receive an email with a link <br>to the chatbot hosted in our servers
      </cb-text>
    </template>

    <template v-slot:left>
      <div
        class="share-by-email"
      >
        <!-- Send an email form -->
        <ul class="cb-std-form">
          <!-- FIELD: From -->
          <li class="share-by-email__field">
            <span
              v-show="isSenderEmailAddressValid"
              class="icon check share-by-email__success-indicator"
            />
            <span
              v-show="!isSenderEmailAddressValid"
              class="icon check share-by-email__error-indicator"
            />
            <input
              id="uuid-share-email"
              name="from-mail"
              autocomplete="off"
              class="cb-input"
              :value="senderEmail"
              type="email"
              placeholder="From (E-Mail)*"
              @input="setSenderEmail"
            >
          </li>

          <!-- FIELD: Recipients -->
          <li class="share-by-email__field">
            <span
              v-show="recipientsIsValid"
              class="icon check share-by-email__success-indicator"
            />
            <vue-tags-input
              id="uuid-share-recipient-email"
              v-model="tag"
              :tags="emailFields.to"
              class="flex flex-1"
              :add-on-key="codes"
              :separators="[';', ',']"
              :validation="emailValidation"
              placeholder="To (E-mail)*"
              @tags-changed="whenEmailListChange"
            />
          </li>

          <!-- FIELD: Email Message -->
          <li class="share-by-email__field">
            <textarea
              id="uuid-share-message-email"
              name="message-mail"
              class="cb-input"
              :value="emailFields.message"
              type="text"
              placeholder="Message"
              autocomplete="off"
              @input="setEmailMessage"
            />
          </li>
        </ul>

        <!-- Call to Action -->
        <section>
          <div
            id="share_recaptcha"
            ref="share_recaptcha"
          />
        </section>
      </div>
    </template>

    <template v-slot:right>
      <img
        class="share-banner share-banner__email"
        :src="shareEmailBanner"
      >
    </template>
    <template v-slot:cta>
      <cb-button
        secondary
        :on-click="cancelSharing"
        text="Cancel"
      />
      <cb-button
        id="uuid-share-send"
        class="share-by-email__send-button"
        primary
        :on-click="submit"
        text="Send"
        :disabled="!formIsValid"
      />
    </template>
  </sharing-options-layout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import VueTagsInput from '@johmun/vue-tags-input'
import renderRecaptcha from '@/services/recaptcha.js'
import _shareEmailBanner from '~/assets/email_illustration.svg'
import SharingOptionsLayout from '~/src/app/share/sharingOptionsLayout.vue'

const ASCII_ENTER = 13
const ASCII_SPACE = 32
export default {
  components: {
    VueTagsInput,
    SharingOptionsLayout

  },
  data () {
    return {
      // a single email tag state
      tag: '',

      // the list of email tags
      tags: [],

      // triggers to addd tags
      codes: [ASCII_SPACE, ASCII_ENTER],

      // email tag validation rules
      emailValidation: [{
        classes: 'invalid-email',
        rule: /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        disableAdd: true
      }],
      notification: ''
    }
  },
  computed: {
    ...mapGetters([
      'userEmail',
      'formIsValid',
      'isSenderEmailAddressValid',
      'emailErrors',
      'emailFields',
      'recipientsIsValid',
      'senderEmail',

      // Events
      'fireEventShareByEmail',
      'fireEventShareByEmailSuccess',
      'fireEventShareByEmailError'
    ]),
    shareEmailBanner () {
      return _shareEmailBanner
    }

  },
  mounted () {
    this.tags = this.emailFields.recipients
    renderRecaptcha(this.$refs.share_recaptcha, (token) => {
      this.sRecaptchaIsSet(!!token)
    })
  },
  updated () {
  },
  methods: {
    ...mapActions(['sendEmail']),
    ...mapMutations([
      'hideModal',
      'sSetRecipients',
      'sSetMessage',
      'sResetForm',
      'sSetSenderEmail',
      'sRecaptchaIsSet',
      'setShareOption'
    ]),

    whenEmailListChange (newTags) {
      this.tags = newTags
      this.sSetRecipients(newTags)
    },

    setEmailMessage (e) {
      const message = e.target.value
      this.sSetMessage(message)
    },

    setSenderEmail (e) {
      this.sSetSenderEmail(e.target.value)
    },

    submit () {
      this.fireEventShareByEmail()
      this.notification = this.$toast.open({
        message: 'Sending',
        type: 'default'
      })
      this.sendEmail().then(() => {
        this.fireEventShareByEmailSuccess(this.emailFields.recipients)
        this.sResetForm()
        this.tag = ''
        this.tags = []
        this.setShareOption('')
        this.notification.dismiss()
        this.notification = this.$toast.open({
          message: 'Email Sent!',
          type: 'success'
        })
        this.$modal.hide('popupModal')
      }).catch(() => {
        this.fireEventShareByEmailError(this.emailFields.recipients)
        this.notification.dismiss()
        this.notification = this.$toast.open({
          message: 'Error during sending Email',
          type: 'error'
        })
        this.$modal.hide('popupModal')
      })
    },
    cancelSharing () {
      this.$modal.hide('popupModal')
      this.setShareOption(null)
    }
  }
}
</script>

<style lang="scss" scoped>
#uuid-share-email {
    background: #ffff;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 5px;
    padding: 0 10px;
    min-height: 40px;
}

#uuid-share-recipient-email {
  background: #ffff;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 5px;
    padding: 0 10px;
    min-height: 40px;
}

#uuid-share-message-email {
    min-height: 80px;
    background: #fff;
    padding: 10px;
    border: 1px solid rgba(0,0,0,0.1);
}

.cb-success {
  .cb-input {
    color: $primary-color;
    border: 1px solid $primary-color;
    background: $primary-faded-color;
  }
}
.share-by-email__field {
  position: relative;
}

.share-by-email__error-indicator,
.share-by-email__success-indicator {
  position: absolute;
  right: 4px;
  top: 18px;
  z-index: 1;
}
.share-by-email__success-indicator {
  background: $success-background;
  @include svg-icon("check_only");
  margin-left: 3px;
  width: 18px;
  height: 18px;
}

.share-by-email__error-indicator {
  background: $error-color;
  @include svg-icon("warning");
  margin-left: 3px;
    width: 18px;
  height: 18px;
}

.share-by-email__footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 0 0 0;
}
.share-by-email__send-button {
    margin-left:5px;
}
</style>
<style lang="scss">

.vue-tags-input {
    width: 100%;
    max-width: 100% !important;

    .ti-input {
    width: 100%;
    border: none;
    box-shadow: none;
    display: flex;
    min-height: 40px;
    align-items: center;
    border: none;
    padding: 0;
    background: transparent !important;
    border-radius: 0;
    }
    .ti-new-tag-input {
      background: transparent !important;
    }
    .ti-new-tag-input-wrapper {
        margin: 0;
        padding: 0;
    }
}
 .share-by-email {
    text-align: left;
  }

@media only screen and (max-width: $ipad) {
   .share-by-email {
    width: 100%;
  }
}
@media only screen and (max-width: $mobile) {
  #send_email_title {
    display: none;
  }
  #share_recaptcha {
    overflow: hidden;
  }
  .share-by-email__footer {
    display: flex;

    .cb-button {
      flex: 1;
    }
  }
  .ti-input {
    min-height: auto;
  }

}
</style>
