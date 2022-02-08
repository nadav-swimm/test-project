import Analytics from '@/services/analytics.js'
const analyticsService = new Analytics()

// forgot a comment here
export const storeGetter = {
  fireRawGoogleFormUrlInvalidEvent (state, getters) {
    return function () {
      analyticsService.track('Wizard Step 1', 'Invalid Url', {
        url: getters.rawGoogleFormUrl,
        error: getters.error
      })
    }
  },
  fireSubmitGoogleFormUrl (state, getters) {
    return function () {
      analyticsService.track('Wizard Step 1', 'Submit url', { url: getters.rawGoogleFormUrl })
    }
  },
  fireImpressionStep1 (state, getters) {
    return function () {
      analyticsService.track('Wizard Step 1', 'Start')
    }
  },

  fireEventFormAdvancedOptions (state, getters) {
    return function () {
      analyticsService.track('Wizard Step 2', 'Language', {
        'preferred language bla': getters.preferredLanguage,
        'send me notifications (default: true)': getters.receiveExpirationEmail,
        'show progress feedback (default: true)': getters.progressValue,
        'show motivation feedback (default false)': getters.showMotivationValue
      })
    }
  },
  fireEventChatCreated (state, getters) {
    return function (dir) {
      analyticsService.track('Chat generation', 'deployment success', { dir: dir })
    }
  },
  fireEventChatCreationError (state, getters) {
    return function (error) {
      analyticsService.track('Chat generation', 'deployment error', error)
    }
  },
  fireImpressionStep2 (state, getters) {
    return function () {
      analyticsService.track('Wizard Step 2', 'page view')
    }
  },
  fireImpressionStep3 (state, getters) {
    return function () {
      analyticsService.track('Wizard Step 3', 'page view')
    }
  },
  fireEventFormProcessingFailed (state, getters) {
    return function () {
      analyticsService.track('Wizard Step 2', 'form processing failed', {
        dir: getters.chatBotProductionDir,
        url: getters.rawGoogleFormUrl,
        language: getters.preferredLanguage.name,
        isImportMode: getters.formSettingIsImportMode,
        error: getters.error
      })
    }
  },
  fireEventActionAfterError (state, getters) {
    return function (actionType) {
      analyticsService.track('Wizard Step 2', 'form processing action after error', {
        error: getters.error,
        actionType: actionType
      })
    }
  },
  fireEventShareByEmail (state, getters) {
    return function (recipients) {
      analyticsService.track('Share', 'By Email', {
        url: getters.rawGoogleFormUrl,
        language: getters.preferredLanguage.name,
        status: 'pending'
      })
    }
  },
  fireEventShareByEmailSuccess (state, getters) {
    return function (recipients) {
      analyticsService.track('Share', 'By Email', {
        url: getters.rawGoogleFormUrl,
        language: getters.preferredLanguage.name,
        recipients: recipients,
        status: 'success'
      })
    }
  },
  fireEventShareByEmailError (state, getters) {
    return function (recipients) {
      analyticsService.track('Share', 'By Email', {
        url: getters.rawGoogleFormUrl,
        language: getters.preferredLanguage.name,
        recipients: recipients,
        status: 'error'
      })
    }
  },
  fireEventOpenChat (state, getters) {
    return function () {
      analyticsService.track('Wizard Step 3', 'Open chat', {
        'chat bot url': 'https://chat-forms.com/forms/' + getters.chatBotProductionDir + '/?form'
      })
    }
  },
  fireEventNavigatedToHomepage (state, getters) {
    return function () {
      analyticsService.track('Navigation', 'Home')
    }
  },
  fireEventOpenEditDialog (state, getters) {
    return function () {
      analyticsService.track('Wizard Step 3', 'Open edit chat')
    }
  },
  // edit open dialog functions
  formOpenEditDialog (state, getters) {
    return function () {
      analyticsService.track('Wizard Step 3', 'Open edit chat')
    }
  },
  fireEventOpenShareOptions (state, getters) {
    return function () {
      analyticsService.track('Wizard Step 3', 'Open share options')
    }
  },
  fireEventCreateAnotherChat (state, getters) {
    return function () {
      analyticsService.track('Wizard Step 3', 'Create another chat')
    }
  }

}

const analytics = {
  state: () => ({}),
  getters: storeGetters
}

export default analytics
