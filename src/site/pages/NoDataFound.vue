<template>
  <sharing-options-layout class="custom-layout-noDataFound">
    <template v-slot:title>
      <img
        class="share-banner share-banner__default"
        :src="roboImage"
      >
      <cb-text
        prominent
        large
        bold
        block
      >
        It looks like you dont have any google forms
      </cb-text>
      <cb-text
        class="cb-margin-bottom-md"
        small
        block
        center
      >
        in order to create a chatbot, you need to first create your<br>
        Google form and then convert it to a chatform
      </cb-text>
      <cb-button
        primary
        class="edit-modal__update-button addChat-btn"
        minimal
        :on-click="redirectToForm"
        text="Create a new Google form"
      />
    </template>
    <template v-slot:cta />
  </sharing-options-layout>
</template>
<script>
import BlueRobo from '~/assets/blue_robo.png'
import SharingOptionsLayout from '~/src/app/share/sharingOptionsLayout.vue'
export default {
  components: {
    SharingOptionsLayout
  },
  computed: {
    roboImage () {
      return BlueRobo
    }
  },
  methods: {
    redirectToForm () {
      this.$router.push({ name: 'app' })
    }
  }
}
</script>

<style lang="scss" scoped>
.addChat-btn {
  max-width: fit-content !important;
}
.addChat-btn:before {
  font-family: "Font Awesome 5 Free";
  content: "+";
  display: inline-block;
  padding-right: 10px;
  vertical-align: middle;
  font-weight: 900;
  font-size: 1.5rem !important;
}
.wizard-step3__content {
  display: none !important;
}

</style>
