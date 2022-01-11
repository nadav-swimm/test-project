<template>
  <div>
    <cb-button
      class="cb-google-docs-button"
      :on-click="signIn"
      :icon="googleFormsIcon"
      text="Import from Google Forms"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      userAuth: false
    }
  },
  computed: {
    ...mapGetters([
      'getDeveloperKey', 'developerKey', 'pickerApi', 'googleFormsIcon'
    ])
  },
  created () {
    this.userAuth = (localStorage.getItem('is_user_auth') === 'true')
  },
  methods: {
    ...mapMutations([
      'setUserEmail', 'setAndValidateRawUrl', 'setSelectedFile', 'setPickerApi', 'setCurrentUser'
    ]),
    createView: function () {
      return new this.pickerApi.DocsView(this.pickerApi.ViewId.FORMS)
    },

    createPicker: function (pickerView) {
      return new this.pickerApi.PickerBuilder()
        .addView(pickerView)
        .setTitle('Select a Form')
        .enableFeature(this.pickerApi.Feature.NAV_HIDDEN)
        .enableFeature(this.pickerApi.Feature.SUPPORT_DRIVES)
        .setOAuthToken(this.accessObject.getToken().access_token)
        .setDeveloperKey(this.developerKey)
        .setCallback((res) => {
          if (res && res.docs && res.docs[0]) {
            this.$analytics.track('Google Import Button', 'File selected', { url: res.docs[0].url })
            this.setAndValidateRawUrl({ target: { value: res.docs[0].url } })
            this.setSelectedFile(res.docs[0])
            this.$emit('selected')
          }
        })
        .build()
    },
    authcreatePicker: function (pickerView) {
      return new this.pickerApi.PickerBuilder()
        .addView(pickerView)
        .setTitle('Select a Form')
        .enableFeature(this.pickerApi.Feature.NAV_HIDDEN)
        .enableFeature(this.pickerApi.Feature.SUPPORT_DRIVES)
        .setOAuthToken(localStorage.getItem('access_token'))
        .setDeveloperKey(this.developerKey)
        .setCallback((res) => {
          if (res && res.docs && res.docs[0]) {
            this.$analytics.track('Google Import Button', 'File selected', { url: res.docs[0].url })
            this.setAndValidateRawUrl({ target: { value: res.docs[0].url } })
            this.setSelectedFile(res.docs[0])
            this.$emit('selected')
          }
        })
        .build()
    },
    loadPicker: function () {
      this.$gapi._libraryLoad('client').then((obj) => {
        this.accessObject = obj
        this.$gapi._libraryLoad('picker')
          .then(api => {
            this.$analytics.track('Google Import Button', 'File picker loaded')
            this.setPickerApi(api)
            const pickerView = this.createView()
            this.createPicker(pickerView).setVisible(true)
          })
          .catch(err => {
            this.$analytics.track('Google Import Button', 'Load Drive Picker fail')
            console.error('Driver Picker load fail: %s', err.error)
          })
      })
    },
    googleSignIn: function () {
      this.$gAuth.signIn()
        .then(user => {
          console.log('user', user)
          this.setCurrentUser(user)
          this.setUserEmail({ target: { value: user.getBasicProfile().getEmail() } })
          if (localStorage) {
            localStorage.setItem('logged_in_user', JSON.stringify(user))
            localStorage.setItem('logged_in_user_email', JSON.stringify(user.email))
            localStorage.setItem('email', user.getBasicProfile().getEmail())
          }
          this.$analytics.track('Google Import Button', 'SignIn Success')
          this.loadPicker()
        })
        .catch(err => {
          this.$analytics.track('Google Import Button', 'SignIn failed')
          console.error('Not signed in: %s', err.error)
        })
    },

    signIn () {
      if (!this.userAuth) {
        this.$analytics.track('Google Import Button', 'SignIn')
        if (this.$gAuth.isAuthorized) {
          this.setUserEmail({ target: { value: '' } })
          this.$gAuth.signOut()
            .then(() => {
              console.log('User disconnected.')
              this.googleSignIn()
            })
        } else {
          this.googleSignIn()
        }
      } else {
        this.loadPicker()
      }
    }
  }
}
</script>
<style lang="scss">
.cb-google-docs-button.cb-button {
  background: $google-forms-color;
  color: #fff;
  padding: 0 32px !important;
  font-size: 14px;
  cursor: pointer;
  .icon {
    height: 16px !important;
  }
  &:hover {
    background: $google-forms-color-light;
    color: #fff;
  }
}

@media (max-width: 319.98px) {
  .hoverlink {
    font-weight: 400 !important;
    font-size: 20px !important;
    margin-top: 0.7rem !important;
  }
}

@media (max-width: 575.98px) {
  .hoverlink {
    font-weight: 400 !important;
    font-size: 20px !important;
    margin-top: 0.7rem !important;
  }
}

@media (max-width: 767.98px) {
  .hoverlink {
    font-weight: 400 !important;
    font-size: 20px !important;
    margin-top: 0.7rem !important;
  }
}

@media only screen and (max-device-width: 780px), (max-device-height: 780px) {
  .hoverlink {
    font-weight: 400 !important;
    font-size: 14px !important;
    margin-top: 0.7rem !important;
  }
}
</style>
