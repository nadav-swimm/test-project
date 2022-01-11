
<template>
  <section v-if="error">
    <cb-text error>
      {{ error }}
    </cb-text>

    <!--Form -->
    <!------------------------------>
    <div class="flex-1">
      <!--CTA -->
      <!------------------------------>
      <div class="cta flex row">
        <cb-button
          secondary
          class="cb-margin-right-md"
          :on-click="_onRestartForm"
          text="Start Over"
          over-
        />

        <cb-button
          secondary
          class="cb-margin-right-md"
          :on-click="_onRestartStep"
          text="Back to Edit"
        />

        <cb-button
          secondary
          :on-click="_onRetry"
          text="Retry"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {

  props: {
    onRetry: {
      type: Function,
      default: () => {}
    },
    onRestartForm: {
      type: Function,
      default: () => {}
    },
    onRestartStep: {
      type: Function,
      default: () => {}
    }
  },

  computed: {
    ...mapGetters([
      // Validation
      'error',

      // Settings
      'rawGoogleFormUrl',
      'preferredLanguage',

      // Analytics
      'fireEventFormProcessingFailed',
      'fireEventActionAfterError'
    ])
  },
  mounted () {
    this.fireEventFormProcessingFailed()
  },
  methods: {
    ...mapMutations([
      'clearError',
      'resetStepDefaults'
    ]),

    setGeneralError () {
      this.setError('Sorry, Something went wrong...')
    },

    _onRestartForm () {
      this.fireEventActionAfterError('restart form')
      this.onRestartForm()
    },
    _onRestartStep () {
      this.fireEventActionAfterError('restart step')
      this.onRestartStep()
    },
    _onRetry () {
      this.fireEventActionAfterError('retry submit')
      this.onRetry()
    }
  }
}
</script>

<style lang="scss" scoped>
.cta {
  justify-content: center;
  margin-top: 20px;
  align-items: center;
}

@media only screen and (max-width: $mobile) {}
/* Landscape phone */
@media screen and (max-height: 400px) and (orientation: landscape) {}
@media only screen and (max-width: $ipad), (max-device-height: $mobile) {}
</style>
