
<template>
  <section>
    <!--------------------------------
      Advanced Options - Toggle
    -------------------------------->
    <cb-text
      small
      nocursor
      hoverlink
      bold
      class="flex row cb-margin-bottom-lg text-dblue"
      :on-click="()=>{showAdvancedOptions = !showAdvancedOptions}"
    >
      Advanced options
      <img
        :src="chevronDownIcon"
        :class="{
          'advanced-options-icon': true,
          'advanced-options-icon-reversed': showAdvancedOptions
        }"
      >
    </cb-text>

    <!--------------------------------
      Advanced Options - Options
    -------------------------------->
    <section
      :class="{
        'advanced-options': true,
        'cb-margin-bottom-lg': true,
        'open': showAdvancedOptions
      }"
    >
      <cb-option
        :checked="!!receiveExpirationEmail"
        text="Send me notification email before the chat expires"
        @checked="setFlagReceiveExpirationEmail"
      />

      <!--------------------------------
      User Email
      -------------------------------->
      <div
        v-if="receiveExpirationEmail"
        class="form-generator-preference__expiration-email"
      >
        <input
          value=""
          :class="{
            'cb-invalid-input': !isUserEmailValid,
          }"
          type="email"
          placeholder="Email Address"
          @input="setUserEmail"
        >
        <div
          v-if="!isUserEmailValid"
          class="error-message"
        >
          <cb-text
            nocursor
            small
            error
          >
            Please enter a valid Email address
          </cb-text>
        </div>
      </div>

      <!--------------------------------
      Enable/Disable Progress Feedback Messages
      -------------------------------->
      <cb-option
        :checked="!!progressValue"
        text="Show progress feedback messages"
        @checked="setFlagProgressValue"
      />

      <!--------------------------------
      Enable/Disable Motivational feedback messages
      -------------------------------->
      <cb-option
        :checked="!!showMotivationValue"
        text="Show motivation feedback messages"
        @checked="setFlagShowMotivationValue"
      />
    </section>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {

  data () {
    return {
      showAdvancedOptions: false
    }
  },
  computed: {
    ...mapGetters([
      // Icons
      'chevronDownIcon',

      // Settings
      'userEmail',
      'verboseLevel',
      'isUserEmailValid',
      'receiveExpirationEmail',
      'progressValue',
      'showMotivationValue'
    ])
  },

  mounted () {
  },

  methods: {
    ...mapMutations([
      'setUserEmail',
      'setError',
      'clearError',
      'setFlagReceiveExpirationEmail',
      'setFlagProgressValue',
      'setFlagShowMotivationValue',
      'setChatBotProductionDir'
    ])

  }
}
</script>

<style lang="scss" scoped>

.advanced-options {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s;
  text-align: left;
}

.advanced-options.open{
    max-height: 220px;
    height: auto;
}

.advanced-options-icon {
  margin-left: 3px;
}

.advanced-options-icon-reversed {
  transform: rotate(180deg);
}

.counter {
  font-size: 12px;
  font-weight: normal;
  display: inline-block;
  margin-left: 3px;
}

 .form-generator-preference__expiration-email {
    margin: 0 20px;
    max-width: 360px;
  }

  .text-dblue {
    color: #0069E6 !important;
  }

@media only screen and (max-width: $mobile) {
  .form-generator-preference__expiration-email {
    margin-bottom: 20px;
  }
}
/* Landscape phone */
@media screen and (max-height: 400px) and (orientation: landscape) {}
@media only screen and (max-width: $ipad), (max-device-height: $mobile) {}
</style>
