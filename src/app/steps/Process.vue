
<template>
  <section class="wizard-step__container wizard-step2 flex col">
    <section
      v-if="loading"
      class="cb-component-overlay flex col"
    >
      <cb-text
        class="wizard-step2__loading-message"
        normal
        bold
        nocursor
      >
        {{ loadingMessage }}
      </cb-text>
    </section>

    <!--------------------------------
      Step submit - Error handling
    -------------------------------->
    <process-error
      v-if="error"
      :on-retry="create"
      :on-restart-form="resetStepDefaults"
      :on-restart-step="clearError"
    />

    <section
      v-if="!error"
      class="flex-align-start wizard-step2__content-wrapper flex-1"
    >
      <!--------------------------------
      Languages Management
    -------------------------------->
      <process-language-options />
      <div class="cb-horizontal-separator cb-margin-top-lg cb-margin-bottom-lg" />

      <!--------------------------------
      Advanced Options
      -------------------------------->
      <process-advanced-options />

      <!--------------------------------
      Step Actions
      -------------------------------->
      <div class="flex-1">
        <div class="cta flex row">
          <cb-text
            small
            nocursor
            block
            hoverlink
            class="cb-margin-right-md button-stat-over"
            :on-click="startOver"
          >
            Start Over
          </cb-text>
          <cb-button
            class="create-chat-button"
            primary
            :on-click="create"
            :icon="robotWhiteIcon"
            text="Create a chat"
          />
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ProcessError from '@/app/process/ProcessError.vue'
import ProcessAdvancedOptions from '@/app/process/ProcessAdvancedOptions.vue'
import ProcessLanguageOptions from '@/app/process/ProcessLanguageOptions.vue'

export default {
  components: {
    ProcessError,
    ProcessAdvancedOptions,
    ProcessLanguageOptions
  },

  data () {
    return {
      loading: false,
      loadingMessage: '',
      showAdvancedOptions: false
    }
  },
  computed: {
    ...mapGetters([
      // Icons
      'robotWhiteIcon',

      // Validation
      'error',

      // Settings for processing the form
      'chatBotProductionDir',

      // Analytics
      'fireEventFormAdvancedOptions',
      'fireEventChatCreated',
      'fireEventChatCreationError',
      'fireImpressionStep2'
    ])
  },

  mounted () {
    this.fireImpressionStep2()
  },

  methods: {
    ...mapMutations([
      'clearError',
      'resetStepDefaults',
      'backStep'

    ]),
    ...mapActions([
      'createDeploymentDirectory',
      'createChatbot',
      'deploy'
    ]),

    startOver () {
      this.resetStepDefaults()
      this.$router.push('/chatbot')
    },

    create () {
      this.loading = true
      this.loadingMessage = 'Preparing...'
      this.fireEventFormAdvancedOptions()
      this.createChatbot()
        //
        // Prepare the deployment Directory
        //
        .then(() => {
          this.loadingMessage = 'Processing...'
          return this.createDeploymentDirectory()
        })
        //
        // Deploy the chatbot
        //
        .then(() => {
          this.loadingMessage = 'Creating...'
          this.fireEventChatCreated()
          return this.deploy()
        })
        //
        // Success
        //
        .then(() => {
          this.loadingMessage = ''
          this.loading = false
          this.showConfetti()
          this.$router.push({ path: `/chatbot-results/${this.chatBotProductionDir}` })
        })
        .catch(() => {
          this.fireEventChatCreationError()
          this.loading = false
        })
    },

    showConfetti () {
      this.$confetti.start({
        defaultSize: 4,
        defaultDropRate: 8,
        windSpeedMax: 0,
        particles: 2
      })
      setTimeout(() => {
        this.$confetti.stop()
      }, 3000)
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
.wizard-step2 {
  position: relative;
}
.wizard-step2__content-wrapper {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.wizard-step2__loading-message {
  position: relative;
  top: -60px;
}

@media only screen and (max-width: $mobile) {
  .small.title {
    font-size: 16px;
  }
  .fill-space {
    flex: 1;
  }
}
/* Landscape phone */
@media only screen and (min-width: $mobile) and (max-width: $small-screens) {
  .small.title {
    font-size: 16px;
  }
}
</style>
