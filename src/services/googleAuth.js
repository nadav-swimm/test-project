// // const userProfile = {}

// /********************************************************************
//      ********************************************************************
//      **                                                                **
//      **                Globals Section                                 **
//      **                                                                **
//      ********************************************************************
//      *******************************************************************/
// // The Browser API key obtained from the Google API Console.
// // Replace with your own Browser API key, or your own key.
// var developerKey = 'AIzaSyBMhwDPwdq8tDi8vvjFLWkaX-e4eyJ1Qus'

// // The Client ID obtained from the Google API Console. Replace with your own Client ID.
// var clientId = ''
// if (window.location.hostname.indexOf('chat-forms.com') > -1) {
//   clientId = '828567624230-2diisafcohmr91c0ah00ob6o5t79lr8c.apps.googleusercontent.com'
// } else if (window.location.hostname.indexOf('talking-ads.com') > -1) {
//   clientId = '828567624230-h93if7l9rf700n468plgaljqc48ckebk.apps.googleusercontent.com'
// }

// console.log(clientId)

// // Replace with your own project number from console.developers.google.com.
// // See "Project number" under "IAM & Admin" > "Settings"
// var appId = '828567624230'

// // Scope to use to access user's Drive items.
// // var scope = ['https://www.googleapis.com/auth/drive.file'];
// var scope = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/drive']

// var pickerApiLoaded = false
// var oauthToken
// var userProfile = {}

// console.log(scope, userProfile)

// function showDriveFormPicker (url) {
//   loadPicker(function (url) {

//   })
// }

// // Use the window.Google API Loader script to load the window.google.picker script.
// function loadPicker (callbackFn) {
//   console.log(window)
//   if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
//     window.gapi.auth2.getAuthInstance().signOut().then(function () {
//       authSignin(createPicker, callbackFn)
//     })
//   } else {
//     authSignin(createPicker, callbackFn)
//   }
// }

// function authSignin (callbackFn, callbackParam) {
//   window.gapi.auth2.getAuthInstance().signIn({
//     prompt: 'select_account'
//   }).then(function (response) {
//     var authResponse = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true)

//     if (authResponse && !authResponse.error) {
//       oauthToken = authResponse.access_token
//       callbackFn && callbackFn(callbackParam)
//     }
//   }, function (error) {
//     // If window.Google OAuth 2 occured error
//     console.warn('signin error: ' + error)
//   })
// };

// // Create and render a Picker object for searching images.
// function createPicker (callbackFn) {
//   if (pickerApiLoaded && oauthToken) {
//     var view = new window.google.picker.DocsView(window.google.picker.ViewId.FORMS)
//       .setMode(window.google.picker.DocsViewMode.LIST)
//       .setOwnedByMe(false)
//       .setIncludeFolders(false)
//     var picker = new window.google.picker.PickerBuilder()
//       .setTitle('Select Form')
//       .enableFeature(window.google.picker.Feature.NAV_HIDDEN)
//       .enableFeature(window.google.picker.Feature.SUPPORT_DRIVES)
//       .setAppId(appId)
//       .addView(view)
//       .setOAuthToken(oauthToken)
//       .setDeveloperKey(developerKey)
//       .setCallback(function (data) {
//         if (data && data.action === window.google.picker.Action.PICKED) {
//           callbackFn && callbackFn(data.docs[0].url)
//         }
//       })
//       .setOrigin(window.location.protocol + '//' + window.location.host)
//       .setSize(566, 420)
//       .hideTitleBar()
//       .build()
//     picker.setVisible(true)
//   }
// }

// // function clearUserProfile () {
// //   userProfile.email = ''
// //   userProfile.name = ''
// //   userProfile.imageUrl = ''
// //   userProfile.isSignedIn = false
// // }

// // function updateCurrentUserChange (user) {
// //   // When signedin user is changes, this function is called.
// //   // If the signin user is changed to new user, we make an API call.
// //   if (user) {
// //     var profile = user.getBasicProfile()
// //     userProfile.email = profile.getEmail()
// //     userProfile.name = profile.getName()
// //     userProfile.imageUrl = profile.getImageUrl()
// //     userProfile.isSignedIn = true
// //     userProfile.token = profile.getId()
// //     userProfile.id_token = user.getAuthResponse(true) ? user.getAuthResponse(true).id_token : ''
// //     userProfile.getGivenName = profile.getGivenName()
// //     userProfile.getFamilyName = profile.getFamilyName()
// //   } else {
// //     clearUserProfile()
// //   }
// // }

// // function updateSigninStatus (isSignedIn) {
// //   // When signin status changes, this function is called.
// //   // If the signin status is changed to signedIn, we make an API call.
// //   if (isSignedIn) {
// //     var user = window.gapi.auth2.getAuthInstance().currentUser.get()
// //     var profile = user.getBasicProfile()
// //     userProfile.email = profile.getEmail()
// //     userProfile.name = profile.getName()
// //     userProfile.imageUrl = profile.getImageUrl()
// //     userProfile.isSignedIn = true
// //   } else {
// //     clearUserProfile()
// //   }
// // }

// export default showDriveFormPicker
