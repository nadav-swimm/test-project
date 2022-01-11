<template>
  <!-- ------------------------------------------------
    The main container for the chat form wizard
    ------------------------------------------------ -->
  <section class="chat-generator cb-app__content-max-width flex col">
    <!-- ------------------------------------------------
    Top Progress bar
    ------------------------------------------------ -->
    <nav class="wizard-navigation flex row">
      <cb-text
        v-for="step in steps"
        :key="step.number"
        faded
        normal
        :class="{
          'wizard-navigation-item': true,
          'cb-margin-right-lg': true,
          selected: isStep(step.number)
        }"
      >
        {{ step.text }}
      </cb-text>
    </nav>

    <!-- ------------------------------------------------
    Content
    ------------------------------------------------ -->
    <section class="wizard flex flex-align-center">
      <load v-if="isStep(1)" />
      <process v-if="isStep(2)" />
      <share v-if="isStep(3)" />
    </section>
  </section>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Load from '@/app/steps/Load.vue'
import Process from '@/app/steps/Process.vue'
import Share from '@/app/steps/Share.vue'

export default {
  components: {
    Load,
    Process,
    Share

  },
  data () {
    return {
      steps: [
        { number: 1, text: '1 import' },
        { number: 2, text: '2 Create' },
        { number: 3, text: '3 Share' }
      ]
    }
  },
  computed: {
    ...mapGetters(['isStep'])
  },

  mounted () {
    // For development purposes only
    // if (location.hostname === 'localhost') {
    //   this.initializeStab()
    // }
  },
  methods: {
    ...mapMutations([
      'stabChatFormData',
      'stabWizard',
      'toStep'
    ]),
    ...mapActions(['initializeStab'])

  }

}
</script>
<style lang="scss">
@import "./ChatForm.scss";
@import "./ChatForm.responsive.scss";
</style>
