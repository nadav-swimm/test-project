<template>
  <!-------------------------------------
    Header for the App.
    For the website, look at Header.vue
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
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  computed: {
    ...mapGetters([
      'robotIcon',
      'robotWhiteIcon',
      'fireEventNavigatedToHomepage'
    ])

  },

  methods: {
    restartForm () {
      this.fireEventNavigatedToHomepage()
      this.$store.dispatch('restartForm')
      if (localStorage.getItem('access_token') !== null && localStorage.getItem('access_token') !== '') {
        this.$router.push({ path: '/dashboard' }).catch(error => {
          if (error.name !== 'NavigationDuplicated') {
            throw error
          }
        })
      } else {
        this.$router.push({ path: '/' }).catch(error => {
          if (error.name !== 'NavigationDuplicated') {
            throw error
          }
        })
      }
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

.cb-active-link {
  color: $primary-color;
}

</style>
