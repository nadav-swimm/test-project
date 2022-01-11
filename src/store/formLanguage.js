import httpService from '@/services/httpService.js'
/* eslint-disable no-debugger */
import storage from '@/services/storageService.js'

export const initialState = {
  /***************
  User Preference
  ************** */
  language: storage.get('language') ? JSON.parse(storage.get('language')) : { code: 'en', name: 'English' },
  languages: storage.get('languages') ? JSON.parse(storage.get('languages')) : null

}

export const storeMutations = {

  setLanguages (state, languages) {
    console.log('Set languages', languages)

    state.languages = languages
  },

  setPreferredLanguage (state, language) {
    if (language) {
      storage.set('language', JSON.stringify(language))
      state.language = language
    }
  },

  resetLanguages (state) {
    state.languages = []
    storage.set('languages', '')
  },

  processFormLanguageResponse (state, res) {
    state.error = ''
    if (res?.data?.status === 'success') {
      const output = res?.data?.output
      const languageList = output.supported
      const detectedLanguage = languageList.find((l) => {
        return l.code === (output.detected === 'iw' ? 'he' : output.detected)
      })

      console.log('Success: detected language', languageList, detectedLanguage)
      state.languages = languageList
      state.language = detectedLanguage
      state.language.detected = true
      storage.set('languages', JSON.stringify(languageList))
    } else {
      console.log('Error: detected language', res?.data?.error)
      state.error = res?.data?.error || 'Oops, issues with the form language'
    }
  }

}

export const storeGetters = {

  languages (state) {
    return state.languages
  },
  preferredLanguage (state) {
    return state.language
  }

}

export const storeActions = {

  setupLanguages (context, { languages, detected }) {
    context.commit('clearError')
    context.commit('toStep', 2)
    context.commit('setLanguages', languages)
    console.log('setting up detected', detected)
    context.commit('setPreferredLanguage', detected)
  },

  fetchAndSetFormLanguages ({ commit, getters }) {
    console.log('fetchAndSetFormLanguages')
    return httpService
      .getLanguages(getters.rawGoogleFormUrl)
      .then((res) => {
        commit('processFormLanguageResponse', res)
        commit('hideLoader')
      })
      .catch((error) => {
        console.log('Catch: get languages failed', error)
        commit('setError', 'Oops, Something went wrong. Make sure you enter a valid Google Form link.')
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
