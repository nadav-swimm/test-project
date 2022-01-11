import axios from 'axios'
const SERVER_URL = 'https://chat-forms.com'
const API_GET_PREFERRED_LANGUAGE = SERVER_URL + '/api/cache/google-form'
const API_PREPARE_FORM = SERVER_URL + '/api/cache/google-form'
const API_SUBMIT_FORM = SERVER_URL + '/api/exec/deploy-form'
const API_GRUNT_DIR = SERVER_URL + '/api/exec/grunt-dir'
const API_UPDATE_FORM = SERVER_URL + '/api/exec/update-form'
const API_EMAIL = SERVER_URL + '/api/share/email'
const API_FORM_FIELDS = SERVER_URL + '/forms'
const API_FOR_CHATBOATS = SERVER_URL + '/api/exec/user-forms'
const getLanguages = (submittedUrl) => {
  return axios.post(API_GET_PREFERRED_LANGUAGE, {
    checkResponseReceipts: true,
    url: submittedUrl
  })
}

const createBot = (submittedUrl, preferredLanguage) => {
  return axios.post(API_PREPARE_FORM, {
    preferredLn: preferredLanguage,
    url: submittedUrl
  })
}

const createDeploymentDirectory = (url, selectedLanguage, email, verbose) => {
  return axios.post(API_GRUNT_DIR, {
    verbose,
    email,
    preferredLn: selectedLanguage,
    url: url
  })
}
const deploy = (submittedUrl, email, dir) => {
  return axios.post(API_SUBMIT_FORM, {
    email: email,
    name: dir,
    url: submittedUrl
  })
}

const sendEmail = (from, recipients, message, formUrl, botUrl) => {
  recipients = recipients.map((recipient) => {
    return recipient.text
  }).join(' ')

  return axios.post(API_EMAIL, {
    url: formUrl,
    mail_to_list: recipients,
    mail_from: from,
    mail_msg: message,
    token: window.token,
    token_type: 'check',
    conversation_link: botUrl,
    g_form: {
      form_path: formUrl
    }
  })
}

const getFormFields = (formId, id) => {
  var url = ''
  if (id) {
    url = `${API_FORM_FIELDS}/${id}/dialog.js?_=${Date.now()}`
  } else {
    url = `${API_FORM_FIELDS}/${formId}/dialog.js?_=${Date.now()}`
  }
  return axios.get(url).then((res) => {
    let contents = res.data.replace(/var Dialog = /, '')
    contents = contents.replace(/};/, '}')

    const parsed = JSON.parse(contents)
    parsed.messages.map((item) => {
      if (!Array.isArray(item.message.text)) {
        item.message.text = [item.message.text]
      }
    })
    return parsed
  })
}

const updateForm = (formId, fields, url) => {
  console.log('formid', formId)
  return axios.post(API_UPDATE_FORM, {
    name: formId,
    dialog: fields,
    email: '',
    url: fields.FormId
  })
}

const getUserChats = (email) => {
  // 'yiftach.haramati@gmail.com' test email)
  return axios.post(API_FOR_CHATBOATS, {
    // email: 'yiftach.haramati@gmail.com'
    email: email
  })
}

const httpService = {
  getLanguages,
  createBot,
  deploy,
  createDeploymentDirectory,
  sendEmail,
  getFormFields,
  updateForm,
  getUserChats
}

export default httpService
