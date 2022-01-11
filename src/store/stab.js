/* eslint-disable no-debugger */

export const initialState = {}

export const storeMutations = {}

export const storeGetters = {}

export const storeActions = {

  initializeStab (context) {
    context.commit('setAndValidateRawUrl', { target: { value: 'https://docs.google.com/forms/d/e/FAIpQLSev_kM4B8ll3zaAncGKNjYP3Y9fYJFlXmrzI0lG6EavrVCK4g/edit' } })
    context.commit('setLanguages', [{ code: 'af', name: 'Afrikaans', isPreferred: false }, { code: 'am', name: 'Amharic', isPreferred: false }, { code: 'ar', name: 'Arabic', isPreferred: false }, { code: 'zh', name: 'Chinese', isPreferred: false }, { code: 'cz', name: 'Czech', isPreferred: false }, { code: 'da', name: 'Danish', isPreferred: false }, { code: 'nl', name: 'Dutch', isPreferred: false }, { code: 'en', name: 'English', isPreferred: true }, { code: 'fil', name: 'Filipino', isPreferred: false }, { code: 'fr', name: 'French', isPreferred: false }, { code: 'de', name: 'German', isPreferred: false }, { code: 'el', name: 'Greek', isPreferred: false }, { code: 'he', name: 'Hebrew', isPreferred: false }, { code: 'hi', name: 'Hindi', isPreferred: false }, { code: 'hu', name: 'Hungarian', isPreferred: false }, { code: 'id', name: 'Indonesian', isPreferred: false }, { code: 'it', name: 'Italian', isPreferred: false }, { code: 'ja', name: 'Japanese', isPreferred: false }, { code: 'jv', name: 'Javanese', isPreferred: false }, { code: 'ko', name: 'Korean', isPreferred: false }, { code: 'ms', name: 'Malay', isPreferred: false }, { code: 'nb', name: 'Norwegian Bokmål', isPreferred: false }, { code: 'fa', name: 'Persian', isPreferred: false }, { code: 'pl', name: 'Polish', isPreferred: false }, { code: 'pt', name: 'Portuguese', isPreferred: false }, { code: 'ro', name: 'Romanian', isPreferred: false }, { code: 'ru', name: 'Russian', isPreferred: false }, { code: 'es', name: 'Spanish', isPreferred: false }, { code: 'sv', name: 'Swedish', isPreferred: false }, { code: 'th', name: 'Thai', isPreferred: false }, { code: 'tr', name: 'Turkish', isPreferred: false }, { code: 'uk', name: 'Ukrainian', isPreferred: false }, { code: 'vi', name: 'Vietnamese', isPreferred: false }])
    context.commit('setPreferredLanguage', { code: 'en', name: 'English' })
    context.commit('setError', '')
    context.commit('setChatBotProductionDir', '1605356344913-2xf')
    context.commit('toStep', 2)
    context.commit('setShareOption', '')
    context.commit('setFormFieldsFromExistingChatbot', {
      FormId: 'https://docs.google.com/forms/d/e/1FAIpQLSfumcna--W8QVAD6a9ElZ1Ygd9coE0z7lda6hH2TmXSiAJOOw/viewform?usp=embed_facebook',
      messages: [
        {
          message: {
            text: ['Hi', 'Welcome to סקר בחירות']
          }
        }, {
          message: {
            quick_replies: [
              { content_type: 'text', title: 'Get started', payload: 'Get started', edit: false }],
            text: ['Ready for a few questions?']
          }
        }, { message: { payload: 1860190623, text: ['מה דעתך, הבחירות הנוכחיות, היו צריכות להתקיים?'], quick_replies: [{ content_type: 'text', title: 'לא היו צריכות להתקיים' }, { content_type: 'text', title: 'חובה' }, { content_type: 'text', title: 'חבל שממשלת האחדות לא ממשיכה' }, { content_type: 'text', title: 'מיותר' }, { content_type: 'skip', title: 'Skip', payload: '' }] } }, { message: { text: [':clap::clap::clap:'] } }, { message: { payload: 2028420713, text: ['מה דעתך על המפלגות החדשות?'], quick_replies: [{ content_type: 'text', title: 'מפתיעות' }, { content_type: 'text', title: 'משעממות' }, { content_type: 'text', title: 'אין חדש תחת השמש' }, { content_type: 'text', title: 'מקווים לשינוי' }, { content_type: 'skip', title: 'Skip', payload: '' }] } }, { message: { text: ['Way to go!'] } }, { message: { payload: 491645111, text: ['איפה בעיקר היית רוצה לראות שינוי אחרי הבחירות?'], quick_replies: [{ content_type: 'text', title: 'חינוך' }, { content_type: 'text', title: 'ביטחון' }, { content_type: 'text', title: 'כלכלה' }, { content_type: 'text', title: 'לא משנה העיקר החלפת השלטון' }, { content_type: 'skip', title: 'Skip', payload: '' }] } }, { message: { text: ['Moving on to next question'] } }, { message: { payload: 1840558641, text: ['האם למגפת קורונה יש חלק חשוב בבחירה שלך?'], quick_replies: [{ content_type: 'text', title: 'זה לא שינה את עמדתי' }, { content_type: 'text', title: 'היתה השפעה קטנה' }, { content_type: 'text', title: 'זה חלק משמעותי בגיבוש החלטתי' }, { content_type: 'text', title: 'אני לא הולך להצביע' }, { content_type: 'skip', title: 'Skip', payload: '' }], script: '[%messages_submit%]' } }],
      messages_submit: [{ message: { quick_replies: [{ content_type: 'submit-form', title: 'Submit', submit_url: 'https://docs.google.com/forms/d/e/1FAIpQLSfumcna--W8QVAD6a9ElZ1Ygd9coE0z7lda6hH2TmXSiAJOOw/formResponse', payload: '' }] } },
        { message: { text: ['Thank you!'], last: false } },
        {
          message: {
            text: ['Want to create your own chat?'],
            quick_replies: [
              { content_type: 'link', title: 'Create a Chat Form', url: 'https://chat-forms.com/?utm_source=chat-forms&utm_medium=chat&utm_campaign=cta&utm_content=chat-end', image_url: 'bot_120x120.gif' }
            ]
          }
        }
      ]

    })
  }
}

export default {
  state: () => (initialState),
  mutations: storeMutations,
  getters: storeGetters,
  actions: storeActions
}
