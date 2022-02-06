var mixpanel = require('mixpanel-browser')
mixpanel.init('62d838de26fe0ec401f437fb36606c9d')
const Analytics = function () {
  return {
    track: function (category, name, payload,newparam) {
      console.log(payload)
      // const userEmail = localStorage.getItem('logged_in_user_email') || localStorage.getItem('currentUserEmail')
      // if (userEmail) {
      //   mixpanel.identify(userEmail)
      // }
      if (mixpanel) {
        mixpanel.track(`${category} : ${name}`, payload)
      }
      if (window.ga) {
        window.ga('send', 'event', category, name, JSON.stringify(payload))
      }
    }
  }
}
export default Analytics
