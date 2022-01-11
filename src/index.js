import 'vue-toast-notification/dist/theme-sugar.css'

import Analytics from './services/analytics.js'
import AnalyticsModule from './store/analytics.js'
import App from './App.vue'
import ChatForm from './app/ChatForm.vue'
import ChatFormModule from './store/chatform.js'
import Faq from './site/pages/Faq.vue'
import Feedback from './site/pages/Feedback.vue'
import Dashboard from './site/pages/Dashboard.vue'
import NoDataFound from './site/pages/NoDataFound.vue'
import FormLanguagesModule from './store/formLanguage'
// import FormModule from './store/form'
import GAuth from 'vue-google-oauth2'
import GoogleModule from './store/google.js'
import Home from './site/pages/Home.vue'
import IconsModule from './store/icons'
import ModalModule from './store/modal'
import PrivacyPolicy from './site/pages/PrivacyPolicy.vue'
import Share from './store/share'
import StabModule from './store/stab'
import Terms from './site/pages/Terms.vue'
import Vue from 'vue'
import VueConfetti from 'vue-confetti'
import VueGoogleApi from 'vue-google-api'
import VueRouter from 'vue-router'
import VueToast from 'vue-toast-notification'
import Vuex from 'vuex'
import WizardModule from './store/wizard'
import underscore from 'vue-underscore'
import vSelect from 'vue-select'
import vuescroll from 'vuescroll'
import VueCookies from 'vue-cookies'
import vmodal from 'vue-js-modal'

var VueScrollTo = require('vue-scrollto')

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueConfetti)
Vue.use(underscore)
Vue.use(VueToast, { position: 'top' })
Vue.use(VueCookies)
Vue.use(vmodal)

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.eventSetDrag = function () {
      el.setAttribute('data-dragging', 'yes')
    }
    el.eventClearDrag = function () {
      el.removeAttribute('data-dragging')
    }
    el.eventOnClick = function (event) {
      var dragging = el.getAttribute('data-dragging')
      if (!(el === event.target || el.contains(event.target)) && !dragging) {
        vnode.context[binding.expression](event)
      }
    }
    document.addEventListener('touchstart', el.eventClearDrag)
    document.addEventListener('touchmove', el.eventSetDrag)
    document.addEventListener('click', el.eventOnClick)
    document.addEventListener('touchend', el.eventOnClick)
  },
  unbind: function (el) {
    document.removeEventListener('touchstart', el.eventClearDrag)
    document.removeEventListener('touchmove', el.eventSetDrag)
    document.removeEventListener('click', el.eventOnClick)
    document.removeEventListener('touchend', el.eventOnClick)
    el.removeAttribute('data-dragging')
  }
})

Vue.use(VueScrollTo, {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})
Vue.component('v-select', vSelect)
Vue.prototype.$analytics = Analytics() || {}

const store = new Vuex.Store({
  modules: {
    wizard: WizardModule,
    chatform: ChatFormModule,
    modal: ModalModule,
    email: Share,
    google: GoogleModule,
    icons: IconsModule,
    analytics: AnalyticsModule,
    formLanguages: FormLanguagesModule,
    stab: StabModule
  }
})

const config = {
  clientId: store.getters.getGoogleClientId,
  scope: store.getters.getScopes
  // discoveryDocs: [ list_of_discoverydocs_urls ]
}
Vue.use(VueGoogleApi, config)

const gauthOption = {
  clientId: store.getters.getGoogleClientId,
  scope: store.getters.getScopes,
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
Vue.use(vuescroll, {
  ops: {
    // The global config
  },
  name: 'myScroll' // customize component name, default -> vueScroll
})

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  // mode: 'history',
  routes: [
    { path: '/chatbot-results/:dir', component: ChatForm, name: 'app-results' },
    { path: '/chatbot', component: ChatForm, name: 'app' },
    { path: '/process', component: ChatForm, name: 'app-process' },
    { path: '/privacy-policy', component: PrivacyPolicy, name: 'site-privacy' },
    { path: '/terms', component: Terms, name: 'site-terms' },
    { path: '/faq', component: Faq, name: 'site-faq' },
    { path: '/feedback', component: Feedback, name: 'site-feedback' },
    { path: '/dashboard', component: Dashboard, name: 'user-dashboard' },
    { path: '/no-data', component: NoDataFound, name: 'no-data' },
    { path: '/', component: Home, name: 'site' },
    { path: '/:catchAll(.*)', component: Home, name: 'NotFound' }
  ]
})

// configure cookies for 30 days
Vue.$cookies.config('30d')

router.beforeEach((to, from, next) => {
  //
  // Set the layout for the app / site
  //
  if (to.name === 'app' || to.name === 'app-results' || to.name === 'app-process') {
    store.commit('setLayout', 'app')
    if (to.name === 'app') {
      store.commit('toStep', 1)
    } else if (to.name === 'app-process') {
      store.commit('toStep', 2)
    } else if (to.name === 'app-results') {
      store.commit('toStep', 3)
      store.commit('setChatBotProductionDir', to.params.dir)
    }
  } else {
    store.commit('setLayout', 'site')
  }

  if (to.name === 'user-dashboard' || to.name === 'no-data') {
    if (localStorage.getItem('access_token') === '' || localStorage.getItem('access_token') === null) {
      router.app.$router.push({ name: 'site' }).catch(error => {
        if (error.name !== 'NavigationDuplicated') {
          throw error
        }
      })
    } else {
      // next()
    }
  } else {
    // next() // make sure to always call next()!
  }

  window.scrollTo(0, 0)
  next()
})

// router.beforeEach((to, from, next) => {
//   console.log('')
// })

/* eslint-disable-next-line no-new */
new Vue({
  router,
  store: store,
  el: '#app',
  render: h => h(App)
})
