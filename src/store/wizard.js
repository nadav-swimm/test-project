export const defaults = {

  // The current step in the wizard
  currentStep: 1,

  // General purpose loading state
  loading: false,
  // the list of email addresses to share a bot
  shareMethod: 1,
  shareMethods: {
    SHARE_BY_EMAIL: 1,
    SHARE_BY_LINK: 2,
    SHARE_EMBEDDING: 3,
    SHARE_WIDGET: 4
  },
  shareOption: null
}

export const storeMutations = {
  nextStep (state) {
    state.currentStep += 1
  },

  backStep (state) {
    state.currentStep -= 1
  },

  toStep (state, step) {
    state.currentStep = step
  },
  showLoader (state) {
    state.loading = true
  },

  hideLoader (state) {
    state.loading = false
  },
  setShareMethod (state, method) {
    state.shareMethod = method
  },
  setShareByEmail (state) {
    state.shareMethod = state.shareMethods.SHARE_BY_EMAIL
  },
  setShareByLink (state) {
    state.shareMethod = state.shareMethods.SHARE_BY_LINK
  },
  setShareByEmbed (state) {
    state.shareMethod = state.shareMethods.SHARE_EMBEDDING
  },
  setShareByWidget (state) {
    state.shareMethod = state.shareMethods.SHARE_WIDGET
  },
  setShareOption (state, option) {
    state.shareOption = option
  },
  resetStepDefaults (state) {
    state.currentStep = 1
    state.loading = false
  }
}

export const storeGetters = {
  isStep (state) {
    return (step) => {
      return step === state.currentStep
    }
  },
  isLoading (state) {
    return state.loading
  },
  isShareCtaVisible (state) {
    return state.shareOption !== null
  },
  isShareByEmail (state) {
    return state.shareMethod === state.shareMethods.SHARE_BY_EMAIL
  },
  isShareByLink (state) {
    return state.shareMethod === state.shareMethods.SHARE_BY_LINK
  },
  isShareEmbedded (state) {
    return state.shareMethod === state.shareMethods.SHARE_EMBEDDING
  },
  isShareByWidget (state) {
    return state.shareMethod === state.shareMethods.SHARE_WIDGET
  },
  shareOption (state) {
    return state.shareOption
  }
}

const wizard = {
  state: () => (defaults),
  mutations: storeMutations,
  getters: storeGetters
}

export default wizard
