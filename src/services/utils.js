
const utils = {
  isUrlValid: function (url) {
    var formUrl = url || ''
    formUrl = formUrl.trim()
    return (formUrl.length > 6) && (formUrl.indexOf('.') > 1) && (formUrl.indexOf(' ') === -1)
  },

  isEmpty: function (str) {
    return !str || str.length === 0
  },

  isValidEmailAddress (email) {
    if (email && email.trim() === '') {
      return true
    }
    const mailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return mailformat.test(email)
  },

  scrollToTop () {
    window.scrollTo(0, 0)
  },

  fbShare: function (url) {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' +
        url + '&amp;src=sdkpreparse', 'sharer', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
    return false
  },

  tweet: function (url) {
    window.open('https://twitter.com/share?url=' + url, 'sharer', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
    return false
  },

  linkedInShare: function (url) {
    window.open('https://www.linkedin.com/shareArticle?mini=true&url=' +
        url, 'sharer', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
    return false
  },

  copyTextToClipboard: function (text) {
    var textArea = document.createElement('textarea')
    textArea.value = text

    // Avoid scrolling to bottom
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      var successful = document.execCommand('copy')
      var msg = successful ? 'successful' : 'unsuccessful'
      console.log('Fallback: Copying text command was ' + msg)
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err)
    }

    document.body.removeChild(textArea)
  }

}

export default utils
