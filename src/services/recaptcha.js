const recaptcha = function (el, cb) {
  const sitekey = '6Ld14psaAAAAAAduw8RmXo5FSq73QUsOOmgoDq3p'
  if (window.widgetId) {
    window.grecaptcha.enterprise.reset(window.widgetId)
    delete window.token
  }
  // generate a recaptcha widget ID
  console.log(el)
  window.widgetId = window.grecaptcha.enterprise.render(el, {
    sitekey: sitekey,
    action: 'SHARE',
    callback: (token) => {
      window.token = token
      cb(window.token)
    }
  })
}

export default recaptcha
