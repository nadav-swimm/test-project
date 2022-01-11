/* eslint-disable no-debugger */

const google = {
  state: () => ({
    developerKey: 'AIzaSyA7NW2iuvyNlCwM3RNUbZPvmBpIGSMF3To',
    selectedFile: null,
    clientId: '828567624230-2diisafcohmr91c0ah00ob6o5t79lr8c.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive',
    pickerApi: null,
    user: null

  }),

  mutations: {
    setSelectedFile (state, file) {
      state.selectedFile = file
    },
    setPickerApi (state, picker) {
      state.pickerApi = picker.api
    },
    setCurrentUser (state, user) {
      state.user = user
    }

  },

  getters: {
    getGoogleClientId (state) {
      return state.clientId
    },
    developerKey (state) {
      return state.developerKey
    },
    getScopes (state) {
      return state.scope
    },
    pickerApi (state) {
      return state.pickerApi
    },
    getAuthenticatedUser (state) {
      return state.user
    }

  }
}

export default google
