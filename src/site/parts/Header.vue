<template>
  <!-------------------------------------
    Header for the website.
    For the app, look at AppHeader.vue
  --------------------------------------->
  <header>
    <nav class="cb-site-width">
      <div
        class="flex row chat-forms-logo noselect"
        @click="restartForm"
      >
        <img :src="robotIcon">
        <h1 class="chat-forms-logo__text">
          Chat Forms
        </h1>
      </div>

      <div
        class="cb-mobile-only authMenu"
        @click="openAuthDrawer=true"
      >
        <div class="imgContent">
          <img v-if="getProfileImage" :src="userAvatar" class="avatarImg">
          <img v-else :src="authIcon">
        </div>
      </div>
      <div
        class="cb-mobile-only "
        @click="openDrawer=true"
      >
        <img :src="kababIcon">
      </div>

      <section
        :key="componentKeyHeader"
        :class="{
          drawer: true,
          secondary : true,
          'main-navigation' : true,
          open: openDrawer}"
      >
        <nav class="cb-mobile-only flex row drawer__header">
          <div
            class="flex row chat-forms-logo noselect"
            @click="restartForm"
          >
            <img :src="robotWhiteIcon">
            <h1 class="chat-forms-logo__text">
              Chat Forms
            </h1>
          </div>

          <div
            class="cb-mobile-only"
            @click="openDrawer=false"
          >
            <img :src="closeWhiteIcon">
          </div>
        </nav>
        <div class="navbarContent">
          <!-- <cb-link
            v-if="userAuth == true"
            to="/dashboard"
            class="cb-mobile-only"
            name="Dashboard"
          />
          <cb-nav-separator /> -->
          <cb-link
            to="/faq"
            name="FAQ"
            @click.native="showDropdown = false"
          />
          <cb-nav-separator />
          <cb-external-link
            url="gsuite.google.com/marketplace/app/chatforms/828567624230?pann=cwsdp&hl=en-GB"
          >
            <cb-text
              small
              primary
              hoverlink
              @click.native="showDropdown = false"
            >
              Get the Add-on
            </cb-text>
          </cb-external-link>
          <cb-nav-separator />
          <cb-link
            to="/feedback"
            name="Feedback"
            @click.native="showDropdown = false"
          />
        </div>
        <cb-nav-separator />
        <span
          v-if="isAccessToken === ''"
          class="cb-mobile-only signin-bold"
        >Sign-in to your account</span>
        <div
          v-if="userAuth == true && this.windowWidth <= 780"
          class="authforMobile"
        >
          <div class="google-btn" role="button" @click="logoutUser">
            <div class="google-btn-wrap">
              <div class="google-icon-wrapper">
                <img class="google-icon" :src="signoutIcon"/>
              </div>
              <p class="btn-text text-danger">Sign out</p>
            </div>
          </div>
        </div>
        <label
          v-else-if="userAuth == true && this.windowWidth > 780"
          class="dropdown"  v-click-outside="closedd"
        >
          <div class="dd-button test" @click="collapseContent">
            <div class="imgContent">
              <img
                :src="avatarImg"
                class="avatarImg"
                alt=""
              >
            </div>
            <div class="textContent">
              <p> {{ userName }} </p>
            </div>
          </div>
          <input
            id="test"
            type="checkbox"
            class="dd-input"
          >
          <ul
            class="dd-menu"
            v-if="dropDownVisible"
          >
            <li>
              <a
                href="#"
                @click="logoutUser"
              >Signout</a>
            </li>
          </ul>
        </label>
        <div v-else class="google-btn" role="button" @click="googleSignIn">
          <div class="google-btn-wrap">
            <div class="google-icon-wrapper">
              <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
            </div>
            <p class="btn-text">Sign in with Google</p>
          </div>
        </div>
      </section>
      <section
        :key="componentKey"
        class="cb-mobile-only"
        :class="{
          drawer: true,
          secondary : true,
          'main-navigation' : true,
          open: openAuthDrawer}"
      >
        <nav class="cb-mobile-only flex row drawer__header">
          <div
            class="flex row chat-forms-logo noselect"
            @click="restartForm"
          >
            <img :src="robotWhiteIcon">
            <h1 class="chat-forms-logo__text">
              Chat Forms
            </h1>
          </div>

          <div
            class="cb-mobile-only"
            @click="openAuthDrawer=false"
          >
            <img :src="closeWhiteIcon">
          </div>
        </nav>
        <cb-nav-separator />
        <div class="authforMobile">
          <span
            v-if="isAccessToken === ''"
            class="cb-mobile-only signin-bold"
          >Sign-in to your account</span>
          <div v-if="isAccessToken === ''" class="google-btn" role="button" @click="googleSignIn">
            <div class="google-btn-wrap">
              <div class="google-icon-wrapper">
                <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
              </div>
              <p class="btn-text">Sign in with Google</p>
            </div>
          </div>
          <div v-else class="google-btn" role="button" @click="logoutUser">
            <div class="google-btn-wrap">
              <div class="google-icon-wrapper">
                <img class="google-icon" :src="signoutIcon"/>
              </div>
              <p class="btn-text text-danger">Sign out</p>
            </div>
          </div>
        </div>
      </section>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import avatar from '~/assets/avatar.jpg'
export default {
  data () {
    return {
      openDrawer: false,
      openAuthDrawer: false,
      userAuth: false,
      userName: '',
      userAvatar: '',
      visible: false,
      showDropdown: false,
      componentKey: 0,
      componentKeyHeader: 2,
      screenWidth: 0,
      isAccessToken: '',
      windowWidth: window.innerWidth
    }
  },
  computed: {
    ...mapGetters([
      // Analytics
      'fireEventNavigatedToHomepage',

      // Icons
      'robotIcon',
      'robotWhiteIcon',
      'kababIcon',
      'signoutIcon',
      'authIcon',
      'closeWhiteIcon',
      'externalLinkIcon',

      'getDeveloperKey',
      'developerKey',
      'pickerApi',
      'googleFormsIcon'
    ]),
    avatarImg () {
      if (this.userAvatar !== '' && this.userAvatar !== null && this.userAvatar !== undefined) {
        return this.userAvatar
      } else {
        return avatar
      }
    },
    getProfileImage () {
      if (this.userAuth === true) {
        return true
      } else {
        return false
      }
    },
    showOnBgScreen () {
      if (this.windowWidth >= 780) {
        return true
      } else {
        return false
      }
    },
    dropDownVisible () {
      if (this.showDropdown === true) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    $route (to, from) {
      // if the user navigates from one route to another
      // the drawer will be closed automatically
      this.openDrawer = false
    },
    visible (newValue) {
      this.visible = newValue
    },
    screenWidth (newValue) {
      this.screenWidth = newValue
    },
    windowWidth (newValue) {
      this.componentKey += 1
      this.componentKeyHeader += 2
    }
  },
  mounted () {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
      this.userAvatar = localStorage.getItem('user_avatar') || ''
    }
  },
  created () {
    this.isAccessToken = localStorage.getItem('access_token') || ''
    this.userName = localStorage.getItem('user_name') || ''
    this.userAvatar = localStorage.getItem('user_avatar') || ''
    // this.userAuth = this.$gAuth.isAuthorized
    this.userAuth = (localStorage.getItem('is_user_auth') === 'true')
  },
  methods: {
    ...mapMutations([
      'setCurrentUser',
      'setUserEmail'
    ]),
    closedd: function (event) {
      this.showDropdown = false
    },
    redirectToDashboard () {
      this.$router.push({ path: '/dashboard' })
    },
    restartForm () {
      this.openDrawer = false
      this.fireEventNavigatedToHomepage()
      this.$store.dispatch('restartForm')
      if (localStorage.getItem('access_token') === null || localStorage.getItem('access_token') === '') {
        this.$router.push({ path: '/' }).catch(error => {
          if (error.name !== 'NavigationDuplicated') {
            throw error
          }
        })
      } else {
        this.$router.push({ path: '/dashboard' }).catch(error => {
          if (error.name !== 'NavigationDuplicated') {
            throw error
          }
        })
      }
    }, /*
    signIn () {
      this.$analytics.track('Google SignIn Button', 'SignIn')
      if (this.$gAuth.isAuthorized) {
        this.$gAuth.signOut()
          .then(() => {
            console.log('User disconnected.')
            this.googleSignIn()
          })
      } else {
        this.googleSignIn()
      }
    }, */
    collapseContent () {
      this.showDropdown = !this.showDropdown
    },
    googleSignIn () {
      this.$gAuth.signIn()
        .then(user => {
          // this.userAuth = this.$gAuth.getAuthCode()
          this.userAuth = this.$gAuth.isAuthorized
          const userProfile = user.getBasicProfile()
          const authCode = user.getAuthResponse()
          console.log('authToken', authCode)
          console.log('user id: ' + userProfile.getId())
          console.log('user name: ' + userProfile.getName())
          console.log('given name: ' + userProfile.getGivenName())
          console.log('family name: ' + userProfile.getFamilyName())
          console.log('image url: ' + userProfile.getImageUrl())
          console.log('email: ' + userProfile.getEmail())
          // will print response of user data account
          console.log('user data=>', user)
          this.userName = userProfile.getName()
          this.userAvatar = userProfile.getImageUrl()
          this.setUserEmail({ target: { value: userProfile.getEmail() } })
          this.setCurrentUser(user)
          // Manage using local storage
          localStorage.setItem('user_name', userProfile.getName())
          localStorage.setItem('user_avatar', userProfile.getImageUrl())
          localStorage.setItem('user_profile', JSON.stringify(userProfile))
          localStorage.setItem('access_token', authCode.access_token)
          localStorage.setItem('id_token', authCode.id_token)
          localStorage.setItem('email', userProfile.getEmail())
          localStorage.setItem('logged_in_user', JSON.stringify(user))
          localStorage.setItem('logged_in_user_email', userProfile.getEmail())
          localStorage.setItem('is_user_auth', 'true')
          this.$analytics && this.$analytics.track('Google SignIn Button', 'SignIn Success')
          // now user should need to redirect to dashboard
          this.$router.push({ name: 'user-dashboard' })
          location.reload()
        })
        .catch(err => {
          this.$analytics && this.$analytics.track('Google SignIn Button', 'SignIn failed')
          this.userAuth = this.$gAuth.isAuthorized
          localStorage.setItem('is_user_auth', 'false')
          localStorage.setItem('access_token', '')
          localStorage.setItem('id_token', '')

          console.error('Not signed in: %s', err.error)
          // if not logged then userm much need to redirect => home
          this.$router.push('/')
        })
    },
    logoutUser () {
      console.log('User disconnected.')
      localStorage.setItem('is_user_auth', 'false')
      localStorage.setItem('user_name', '')
      localStorage.setItem('user_avatar', '')
      localStorage.setItem('user_profile', '')
      localStorage.setItem('access_token', '')
      localStorage.setItem('id_token', '')
      localStorage.setItem('email', '')
      this.setUserEmail({ target: { value: '' } })
      if (this.$gAuth.isAuthorized) {
        this.$gAuth.signOut()
          .then(() => {
            this.$analytics && this.$analytics.track('Google Signout Button', 'Sign-out success')
            console.log('user signed out')
          })
          .catch(err => {
            this.$analytics && this.$analytics.track('Google Signout Button', 'Sign-out failed')
            console.log('error signing out.' + err)
          })
      }
      this.$router.push('/')
      location.reload()
    },
    toggleDropdown () {
      this.visible = !this.visible
      console.log('-->', this.visible)
    }
  }
}
</script>
<style lang="scss">
header {
height: $grid-line-height;
border-bottom: 1px solid $border-color-gray;
align-items: center;
display: flex;
position: fixed;
width: 100%;
left: 0;
background: #f9fafa;
z-index: $max-z-index;
top: 0;
}
nav {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;

  a {
    color: $title-color;
  }

}

.chat-forms-logo {
  cursor: pointer;
}
.chat-forms-logo__text {
  font-weight: 600;
  color: $primary-color;
  margin-left: 5px;
  font-size: 18px;
}

.cb-nav-separator {
  margin: 0 10px;
  visibility: hidden;
}

.cb-active-link {
  color: $primary-color;
}

@media only screen and (max-device-width: $mobileforHeader), (max-device-height: $mobileforHeader) {

      .main-navigation {
        position:fixed;
        left: -100%;
        top: 0;
        width: 100%;
        bottom: 0;
        background: #005AC8;
        transition: left 0.2s linear ;

        * {
          color: #fff !important;
          font-size: 18px !important;
          line-height: 40px;
        }

        .cb-nav-separator {
          display: none;
        }

        a {
          display: block;
          text-align: left;
          padding-left: 10px;
          font-size: 18px;
          font-weight: bold;
        }
      }
      .drawer__header {
        display: flex;
        flex-direction: row;
        height: $grid-line-height;
      }

      .main-navigation.open {
        left: 0;
      }

    }

  a {
    text-decoration: none;
    color: #000000;
  }

  a:hover {
    color: #222222
  }

  /* Dropdown */

  .dropdown {
    display: inline-block;
    position: relative;
    font-size: 16px;
    line-height: 20px;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
  }

  .dd-button {
    display: flex;
    align-items: center;
    // border: 1px solid gray;
    border-radius: 4px;
    padding: 10px 30px 10px 20px;
    cursor: pointer;
    white-space: nowrap;
  }

  .dd-menu {
    width: 100%;
  }

  /* .dd-button:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid black;
  } */
  .dd-button:after,.dd-button:before{
    content: "";
      position: absolute;
      top: 50%;
      width: 9px;
      height: 1px;
      background-color: #848484;
      border-radius: 10px;
  }
  .dd-button:after{
      right: 7px;
      transform: rotate(-45deg);
  }
  .dd-button:before{
      right: 13px;
      transform: rotate(45deg);
  }

  .dd-input {
    display: none;
  }

  .dd-menu {
    position: absolute;
    top: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0;
    margin: 2px 0 0 0;
    box-shadow: 0 0 6px 0 rgba(0,0,0,0.1);
    background-color: #ffffff;
    list-style-type: none;
  }

  // .dd-input + .dd-menu {
  //   display: none;
  // }

  .dd-input:checked + .dd-menu {
    display: block;
  }

  .dd-menu li {
    padding: 10px 20px;
    cursor: pointer;
    white-space: nowrap;
  }

  .dd-menu li a {
    display: block;
    margin: -10px -20px;
    padding: 10px 20px;
  }

  .dd-menu li.divider{
    padding: 0;
    border-bottom: 1px solid #cccccc;
  }
  .imgContent {
    width: fit-content;
    .avatarImg {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  .textContent {
    margin-left: 1rem;
  }
  .main-navigation {
    display: flex;
    align-items: center;
  }

  .authMenu {
    margin-left: auto !important;
    padding-right: 1rem !important;
  }

  .authforMobile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: auto;
  }

// google button css
$white: #fff;
$google-blue: #4285f4;
$button-active-blue: #1669F2;

.google-btn {
  cursor: pointer !important;
  width: 180px;
  height: 42px;
  background-color: $white;
  border-radius: 2px;
  box-shadow: 0 -1px 0 rgb(0 0 0 / 4%), 0 1px 1px rgb(0 0 0 / 25%) !important;
  .google-icon-wrapper {
    // position: absolute;
    margin-top: 1px;
    // margin-left: 1px;
    width: 40px;
    height: 40px;
    border-radius: 2px;
    background-color: $white;
  }
  .google-icon {
    // position: absolute;
    margin-top: 11px;
    // margin-left: 11px;
    width: 18px;
    height: 18px;
  }
  .btn-text {
    color: #757575 !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    line-height: 20px !important;
    float: right;
    margin: 11px 0px 0 0;
    letter-spacing: 0.2px;
    font-family: "Roboto";
  }
  .text-danger {
    color: #FE584E !important;
  }
  .google-btn-wrap {
    display: flex;
    justify-content: center;
    text-align: center;
  }
}

@import url(https://fonts.googleapis.com/css?family=Roboto:500);

@media (max-width: 319.98px) {
  // account login css
  .dropdown {
    margin-bottom: 29rem !important;
    .dd-menu li a {
      color: #222222 !important;
      margin: 0rem !important;
      padding: 0rem !important;
      text-align: center !important;
    }
  }
  .main-navigation {
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
    align-items: baseline !important;
    a {
      margin: 1rem 1rem !important;
    }
  }
  .login-with-google-btn {
    width: 80% !important;
    margin-left: auto !important;
    margin-right: auto !important;
    margin-bottom: 2rem !important;
    margin-top: 1rem !important;
    span {
      color: #222222 !important;
    }
  }
  .hoverlink {
    font-weight: 600 !important;
    font-size: 20px !important;
    margin-top: 2rem !important;
  }
  .navbarContent {
    margin-top: 5rem !important;
    margin-bottom: auto !important;
    a {
      .hoverlink {
        font-weight: 600 !important;
        line-height: 20px !important;
        font-size: 20px !important;
      }
    }
  }
  .signin-bold {
    font-weight: 600 !important;
    font-size: 20px !important;
    color: #ffffff !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
}

@media (max-width: 575.98px) {
  // account login css
  .dropdown {
    margin-bottom: 29rem !important;
    .dd-menu li a {
      color: #222222 !important;
      margin: 0rem !important;
      padding: 0rem !important;
      text-align: center !important;
    }
  }
  // account login css
  .dropdown {
    margin-bottom: 29rem !important;
    .dd-menu li a {
      color: #222222 !important;
      margin: 0rem !important;
      padding: 0rem !important;
      text-align: center !important;
    }
  }
  .main-navigation {
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
    align-items: baseline !important;
    a {
      margin: 1rem 1rem !important;
    }
  }
  .login-with-google-btn {
    width: 80% !important;
    margin-left: auto !important;
    margin-right: auto !important;
    margin-bottom: 2rem !important;
    margin-top: 1rem !important;
    span {
      color: #222222 !important;
    }
  }
  .hoverlink {
    font-weight: 600 !important;
    font-size: 20px !important;
    margin-top: 2rem !important;
  }
  .navbarContent {
    margin-top: 5rem !important;
    margin-bottom: auto !important;
    a {
      .hoverlink {
        font-weight: 600 !important;
        line-height: 20px !important;
        font-size: 20px !important;
      }
    }
  }
  .signin-bold {
    font-weight: 600 !important;
    font-size: 20px !important;
    color: #ffffff !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
}

@media (max-width: 767.98px) {
  // account login css
  .dropdown {
    margin-bottom: 29rem !important;
    .dd-menu li a {
      color: #222222 !important;
      margin: 0rem !important;
      padding: 0rem !important;
      text-align: center !important;
    }
  }
  // account login css
  .dropdown {
    margin-bottom: 29rem !important;
    .dd-menu li a {
      color: #222222 !important;
      margin: 0rem !important;
      padding: 0rem !important;
      text-align: center !important;
    }
  }
  .main-navigation {
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
    align-items: baseline !important;
    a {
      margin: 1rem 1rem !important;
    }
  }
  .login-with-google-btn {
    width: 80% !important;
    margin-left: auto !important;
    margin-right: auto !important;
    margin-bottom: 2rem !important;
    margin-top: 1rem !important;
    background-position: 100px 24px !important;
    span {
      color: #222222 !important;
    }
  }
  .hoverlink {
    font-weight: 600 !important;
    font-size: 22px !important;
  }
  .navbarContent {
    margin-top: 5rem !important;
    margin-bottom: auto !important;
    a {
      .hoverlink {
        font-weight: 600 !important;
        line-height: 20px !important;
        font-size: 20px !important;
      }
    }
  }
  .signin-bold {
    font-weight: 600 !important;
    font-size: 20px !important;
    color: #ffffff !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
}

// google image position
@media (max-width: 300.98px) {
  .google-btn {
    margin-left: auto !important;
    margin-right: auto !important;
    margin-bottom: 3rem !important;
    margin-top: 1rem !important;
  }
}
@media (max-width: 575.98px) {
  .google-btn {
    margin-left: auto !important;
    margin-right: auto !important;
    margin-bottom: 3rem !important;
    margin-top: 1rem !important;
  }
}
@media (max-width: 767.98px) {
  .google-btn {
    margin-left: auto !important;
    margin-right: auto !important;
    margin-bottom: 3rem !important;
    margin-top: 1rem !important;
  }
}
@media (min-width: 576px) and (max-width: 767.98px) {
  .google-btn {
    margin-left: auto !important;
    margin-right: auto !important;
    margin-bottom: 3rem !important;
    margin-top: 1rem !important;
  }
}

// ipad
@media only screen and (max-device-width: 780px), (max-device-height: 780px) {
  // account login css
  .dropdown {
    margin-bottom: 29rem !important;
    .dd-menu li a {
      color: #222222 !important;
      margin: 0rem !important;
      padding: 0rem !important;
      text-align: center !important;
    }
  }
  .main-navigation {
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
    align-items: baseline !important;
    a {
      margin: 1rem 1rem !important;
    }
  }
  .login-with-google-btn {
    width: 80% !important;
    margin-left: auto !important;
    margin-right: auto !important;
    margin-bottom: 2rem !important;
    margin-top: 1rem !important;
    background-position: 100px 24px !important;
    span {
      color: #222222 !important;
    }
  }
  .hoverlink {
    font-weight: 600 !important;
    font-size: 22px !important;
  }
  .navbarContent {
    margin-top: 5rem !important;
    margin-bottom: auto !important;
    a {
      .hoverlink {
        font-weight: 600 !important;
        line-height: 20px !important;
        font-size: 20px !important;
      }
    }
  }
  .signin-bold {
    font-weight: 600 !important;
    font-size: 20px !important;
    color: #ffffff !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
  .google-btn {
    width: 80%;
    margin-left: auto !important;
    margin-right: auto !important;
    margin-bottom: 3rem !important;
    margin-top: 1rem !important;
  }
  .google-btn-wrap {
    display: flex;
    justify-content: center;
    text-align: center;
  }
}

</style>
