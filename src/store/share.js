import { _ } from 'vue-underscore'
import httpService from '@/services/httpService.js'
/* eslint-disable no-debugger */
import utils from '@/services/utils.js'

const shareByEmail = {
  state: () => ({
    recipients: [],
    from: '',
    message: 'I would like to share a Chat-Form with you',
    errors: [],
    recaptcha: false
  }),

  mutations: {
    sSetRecipients (state, value) {
      state.recipients = value
    },
    sSetSenderEmail (state, value) {
      state.from = value
    },
    sSetMessage (state, value) {
      state.message = value
    },
    sResetForm (state) {
      state.recipients = []
      state.from = ''
      state.message = ''
      state.errors = []
      state.recaptcha = false
    },

    sRecaptchaIsSet (state, value) {
      state.recaptcha = value
    }

  },

  getters: {
    senderEmail (state) {
      return state.from
    },
    recipients (state) {
      return state.recipients
    },
    message (state) {
      return state.message
    },
    emailFields (state, getters) {
      return {
        recipients: state.recipients,
        from: state.from || getters.userEmail,
        message: state.message
      }
    },

    emailErrors (state) {
      return state.errors
    },

    formIsValid (state, getters) {
      console.log('getters.recipientsIsValid', getters.recipientsIsValid)
      console.log('getters.isSenderEmailAddressValid', getters.isSenderEmailAddressValid)
      console.log('state.recaptcha', state.recaptcha)
      if (getters.recipientsIsValid &&
        getters.isSenderEmailAddressValid &&
        state.recaptcha) {
        return true
      }
      return false
    },

    isSenderEmailAddressValid (state) {
      return utils.isValidEmailAddress(state.from)
    },

    recipientsIsValid (state) {
      if (!_.isEmpty(state.recipients)) {
        return true
      }
      return false
    }
  },

  actions: {
    sendEmail ({ state, getters }) {
      return httpService.sendEmail(
        getters.senderEmail,
        state.recipients,
        state.message,
        getters.url,
        getters.chatBotUrl
      )
    }

  }
}

export default shareByEmail
