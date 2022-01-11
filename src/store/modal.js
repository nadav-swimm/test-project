/* eslint-disable no-debugger */

const modal = {
  state: () => ({
    modals: {},
    current: null
  }),

  mutations: {
    hideModal (state) {
      for (var modalId in state.modals) {
        state.modals = Object.assign({ ...state.modals, [modalId]: false })
        console.log(state.modals)
      }
    },
    showModal (state, modalId) {
      state.current = modalId
      state.modals = Object.assign({ ...state.modals, [modalId]: true })
    },
    registerModal (state, modalId) {
      state.modals[modalId] = false
    }
  },

  getters: {
    visible (state) {
      return function (modalId) {
        return state.modals[modalId]
      }
    }
  }
}

export default modal
