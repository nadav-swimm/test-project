
<template>
  <!--------------------------------
      Languages management
    -------------------------------->
  <section class="wrapper flex col">
    <cb-text
      normal
      primary
      bold
      nocursor
    >
      We've detected your form is in {{ unchangedDetectedLanguage.name }}
    </cb-text>
    <ul class="language-options-list">
      <li>
        <input
          id="language-options-auto"
          type="radio"
          name="language-options"
          value=""
          :checked="manualDetectionLanguageSetup"
          @click="onManualLanguageSetup"
        >
        <label for="language-options-auto">
          <cb-text
            small
            primary
            nocursor
            class="cb-margin-left-md"
          >Yes, use {{ unchangedDetectedLanguage.name }}</cb-text></label>
      </li>
      <li>
        <input
          id="language-options-manual"
          type="radio"
          name="language-options"
          value="I will set my chatbot language manually"
          :checked="!manualDetectionLanguageSetup"
          @click="onAutoDetectionLanguageSetup"
        >
        <div class="flex flex-row-to-mobile-col">
          <label
            for="language-options-manual"
          >
            <cb-text
              small
              class="cb-margin-left-md"
              nocursor
              primary
            >I will set the language manually</cb-text>
          </label>

          <!--Langauge Selector  -->
          <!------------------------------>
          <v-select
            v-if="languages && !manualDetectionLanguageSetup"
            :value="preferredLanguage"
            :clearable="false"
            label="name"
            class="language-selector cb-margin-left-md"
            :options="languages"
            @input="setPreferredLanguage"
          >
            <template #option="{ name, detected }">
              <div>
                <cb-text
                  small
                >
                  {{ name }}
                </cb-text>

                <cb-text
                  v-if="detected"
                  small
                  emphasis
                >
                  (Detected)
                </cb-text>
              </div>
            </template>
          </v-select>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {

  data () {
    return {
      unchangedDetectedLanguage: {},
      manualDetectionLanguageSetup: true
    }
  },
  computed: {
    ...mapGetters([

      // Settings
      'preferredLanguage', 'languages'

    ])
  },

  mounted () {
    this.unchangedDetectedLanguage = Object.assign({}, this.preferredLanguage)
    console.log(this.languages)
    if (!this.languages) {
      this.resetStepDefaults()
      this.$router.push('/chatbot')
    }
  },

  methods: {
    ...mapMutations([
      'setPreferredLanguage',
      'resetStepDefaults'

    ]),

    onManualLanguageSetup () {
      this.manualDetectionLanguageSetup = true
      this.setPreferredLanguage(this.unchangedDetectedLanguage)
    },

    onAutoDetectionLanguageSetup () {
      this.manualDetectionLanguageSetup = false
    }

  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 140px;
  justify-content: flex-start;
  background: url('~/assets/languages.svg') center right no-repeat;
  background-size: contain;
}
.language-selector {
  font-size: 14px;
  min-width: 120px;
  border: 1px solid $gray-light;
  border-radius: 30px;
  }

.language-options-list > li{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 0 0 0;
    min-height: 20px;
}

@media only screen and (max-width: $mobile) {
  .language-options-list {
    input {
      margin-top: 6px;
    }
    label {
      text-align: left;

    }
    .language-selector {
      min-width: 100%;
      margin-top: 5px;
    }
    > li{
        margin: 10px 0 0 0;
        align-items: flex-start;
    }
  }
  .wrapper {
  height: auto;
  }
}
/* ipad and below */
@media only screen and (max-width: $ipad-landscape) {
  .wrapper {
  background: none;
  justify-content: flex-start;
  height: auto;
  }
}
/* small screens only */
@media only screen and (min-width: $mobile) and (max-width: $small-screens) {

}
</style>
