import httpService from '@/services/httpService.js'
import storage from '@/services/storageService.js'
/* eslint-disable no-debugger */
import utils from '@/services/utils.js'

export const initialState = {
  is_user_auth: false,
  /***************
  URLs
  ************** */
  rawGoogleFormUrl: storage.get('rawGoogleFormUrl'),
  chatbotUrl: '',
  chatBotProductionDir: '',

  /***************
  User Preference
  ************** */
  userEmail: '',
  isUserEmailValid: false,

  /***************
  States
  ************** */
  layout: 'site',
  appLoader: false,
  formSettingIsImportMode: true,
  formSettingIsVerbose: 0,
  ReceiveExpirationEmail: 0,
  flagProgressValue: 0,
  flagShowMotivationValue: 0,
  formEditBadge: false,

  /***************
  Validation
  ************** */
  error: '',
  formFieldsFromExistingChatbot: null

}

export const storeMutations = {
  setLayout (state, layout) {
    state.layout = layout
  },
  startAppLoader (state) {
    state.appLoader = true
  },
  stopAppLoader (state) {
    state.appLoader = false
  },
  setShareOption (state, option) {
    state.shareOption = option
  },

  setFormEditIndication (state, bool) {
    state.formEditBadge = bool
  },
  setAndValidateRawUrl (state, event) {
    const userInputUrl = event.target.value
    if (userInputUrl.length === 0 || utils.isUrlValid(userInputUrl)) {
      state.error = 'Invalid Google form URL'
    } else {
      state.error = ''
    }
    storage.set('rawGoogleFormUrl', userInputUrl)
    state.rawGoogleFormUrl = userInputUrl
  },
  setError (state, error) {
    state.error = error
  },
  clearError (state) {
    state.error = ''
  },

  setFlagReceiveExpirationEmail (state, flag) {
    state.ReceiveExpirationEmail = flag ? 1 : 0
  },
  setFlagProgressValue (state, flag) {
    state.flagProgressValue = flag ? 0 : 2
  },
  setFlagShowMotivationValue (state, flag) {
    state.flagShowMotivationValue = flag ? 0 : 1
  },

  setUserEmail (state, event) {
    const email = event.target.value
    if (utils.isEmpty(email) || utils.isValidEmailAddress(email)) {
      state.userEmailAddress = email
      state.isUserEmailValid = true
    } else {
      state.isUserEmailValid = false
    }
  },

  setChatBotProductionDir (state, dir) {
    console.log('dir', dir)
    state.chatBotProductionDir = dir
  },

  resetStepDefaults (state) {
    state.rawGoogleFormUrl = ''
    state.languages = []
    state.language = { code: 'en', name: 'English' }
    state.error = ''
    state.currentStep = 1
    state.chatBotProductionDir = ''
    state.loading = false
  },

  setFormFieldsFromExistingChatbot (state, data) {
    state.formFieldsFromExistingChatbot = data
    console.log(data)
  },

  // refactored from toggleFormInputMode
  toggleFormSettingIsImportMode (state) {
    state.formSettingIsImportMode = !state.formSettingIsImportMode
  },

  updateFormMessages (state, fields) {
    state.formFieldsFromExistingChatbot = fields
  },

  updateFormQuestions (state, data) {
    const { questionIndex, textIndex, newValue } = data
    state.formFieldsFromExistingChatbot.messages[questionIndex].message.text[textIndex] = newValue
  },

  updateFormQuestionsSubmit (state, data) {
    const { questionIndex, textIndex, newValue } = data
    state.formFieldsFromExistingChatbot.messages_submit[questionIndex].message.text[textIndex] = newValue
  }
}

export const storeGetters = {
  isAppLayout (state) {
    return state.layout === 'app'
  },

  isAppLoading (state) {
    return state.appLoader
  },
  showFormEditBadge (state) {
    return state.formEditBadge
  },
  isSiteLayout (state) {
    return state.layout === 'site'
  },
  rawGoogleFormUrlIsEmpty (state) {
    return utils.isEmpty(state.rawGoogleFormUrl)
  },
  rawGoogleFormUrl (state) {
    return state.rawGoogleFormUrl
  },

  isRawGoogleFormUrlValidForm (state, getters) {
    return getters.rawGoogleFormUrlIsEmpty || utils.isUrlValid(state.rawGoogleFormUrl)
  },

  isFormReady (state, getters) {
    return !getters.rawGoogleFormUrlIsEmpty && utils.isUrlValid(state.rawGoogleFormUrl)
  },

  isFormValid (state, getters) {
    if (getters.isRawGoogleFormUrlValidForm && !getters.hasErrors) {
      return true
    }
    getters.fireRawGoogleFormUrlInvalidEvent()
    return false
  },

  rawGoogleFormUrlValidationClass (state, getters) {
    return getters.rawGoogleFormUrlIsEmpty ? '' : getters.isFormValid ? 'cb-success' : 'cb-error'
  },
  error (state) {
    return state.error
  },
  hasErrors (state) {
    return !utils.isEmpty(state.errors)
  },
  isUserEmailValid (state) {
    return state.isUserEmailValid
  },

  chatBotUrl (state) {
    if (state.chatBotProductionDir === '') {
      return null
    }
    return `https://chat-forms.com/forms/${state.chatBotProductionDir}/?form`
  },
  chatBotEmbedUrl (state, getters) {
    if (state.chatBotProductionDir === '') {
      return null
    }
    return `<iframe src="${getters.chatBotUrl}?embedded=true" width="640" height="1065" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>`
  },
  chatBotProductionDir (state) {
    return state.chatBotProductionDir
  },

  emailList (state) {
    return state.shareEmailList
  },
  emailFrom (state) {
    return state.shareEmailFrom
  },
  emailSubject (state) {
    return state.shareEmailSubject
  },
  emailMessage (state) {
    return state.shareEmailMessage
  },

  formSettingIsImportMode (state) {
    return state.formSettingIsImportMode
  },

  webWidgetEmbedUrl (state, getters) {
    if (state.chatBotProductionDir === '') {
      return null
    }
    return `<script id="chat-forms-widget" type="text/javascript" charset="UTF-8" src="https://chat-forms.com/forms/widget/widget.js?cid=${state.chatBotProductionDir}"></script>`
  },

  // User Preference
  receiveExpirationEmail (state) {
    return state.ReceiveExpirationEmail
  },
  progressValue (state) {
    return state.flagProgressValue
  },
  showMotivationValue (state) {
    return state.flagShowMotivationValue
  },

  verboseLevel (state) {
    return Number(state.flagProgressValue) + Number(state.flagShowMotivationValue)
  },

  userEmail (state, getters) {
    if (state.userEmailAddress) {
      return state.userEmailAddress
    }
    if (getters.getAuthenticatedUser && getters.getAuthenticatedUser.email) {
      return getters.getAuthenticatedUser.email
    }
    return ''
  },

  formFieldsFromExistingChatbot (state) {
    return state.formFieldsFromExistingChatbot
  }

}

export const storeActions = {
  restartForm (context) {
    context.commit('resetStepDefaults')
  },
  backStep (context) {
    context.commit('backStep')
    context.commit('resetLanguages')
  },

  fetchAndSetRemoteChatbotFields ({ commit, getters }) {
    return httpService.getFormFields(getters.chatBotProductionDir).then((fields) => {
      commit('setFormFieldsFromExistingChatbot', fields)
      commit('setShareOption', 'edit')
    }).finally(() => {
      commit('stopAppLoader')
    })
  },
  fetchUserChatbotFields ({ commit, getters }, item) {
    var id = ''
    if (item !== undefined && item !== null) {
      id = item.formId
    }
    return httpService.getFormFields(id).then((fields) => {
      commit('setFormFieldsFromExistingChatbot', fields)
      commit('setShareOption', 'edit')
    }).finally(() => {
      commit('stopAppLoader')
    })
  },
  updateDeployedChatbotFields ({ commit, getters }) {
    return httpService.updateForm(
      getters.chatBotProductionDir,
      getters.formFieldsFromExistingChatbot,
      getters.rawGoogleFormUrl)
  },
  getUserChatBoats ({ commit, getters }, email) {
    return httpService.getUserChats(email)
  },

  createChatbot ({ commit, getters }) {
    return httpService
      .createBot(
        getters.rawGoogleFormUrl,
        getters.preferredLanguage.code)
      .catch((error) => {
        console.log('Catch: create bot failed', error)
        commit('setError', 'Oops, Something went wrong. Make sure you enter a valid Google Form link.')
      })
  },

  createDeploymentDirectory ({ commit, getters }) {
    return httpService
      // Get the form remote dir
      .createDeploymentDirectory(
        getters.rawGoogleFormUrl,
        getters.preferredLanguage.code,
        getters.userEmail,
        getters.verboseLevel)
      // Process the form remote dir
      .then((res) => {
        if (res.data.status === 'success') {
          commit('setChatBotProductionDir', res.data.output)
          return res
        } else {
          throw new TypeError(res?.data?.error)
        }
      })
      .catch((error) => {
        getters.fireEventChatCreationError(error)
        commit('setError', 'Oops, Something went wrong. Please try again. Make sure you enter a valid Google Form link.')
      })
  },

  deploy ({ commit, getters }) {
    return httpService
      .deploy(
        getters.rawGoogleFormUrl,
        getters.userEmail,
        getters.chatBotProductionDir)
      .then((res) => {
        if (res?.data?.status && res.data.status === 'success') {
          commit('setChatBotProductionDir', res.data.output)
          getters.fireEventChatCreated(this.chatBotProductionDir)
          commit('nextStep')
          return res
        } else {
          throw new TypeError(res.data.error)
        }
      })
      .catch((error) => {
        getters.fireEventChatCreationError(error)
        commit('setError', error)
      })
  }

}

const form = {
  state: () => (initialState),
  mutations: storeMutations,
  getters: storeGetters,
  actions: storeActions
}

export default form
