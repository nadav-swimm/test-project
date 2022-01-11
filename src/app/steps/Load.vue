<template>
  <section class="wizard-step__container wizard-step1 flex col">
    <!--

        #####################################################
        Mode - Manual
        #####################################################
       -->
    <section
      v-if="!formSettingIsImportMode"
      class="wizard-step1__content flex flex-align-center col"
    >
      <!-- URL Input (Form) -->
      <!------------------------------>
      <div
        id="form-to-chat__form"
        :class="`flex-1 flex row ${rawGoogleFormUrlValidationClass}`"
      >
        <div class="cb-form-input__wrapper">
          <cb-button
            v-if="rawGoogleFormUrl"
            class="form-to-chat__form-clear-input-button"
            :icon="subtractIcon"
            :on-click="restartForm"
          />
          <input
            ref="cbFormInput"
            :value="rawGoogleFormUrl"
            name="link"
            placeholder="Google Form link"
            aria-label="Google form link"
            class="cb-form-input"
            @keyup="setAndValidateRawUrl"
            @paste="setAndValidateRawUrl"
            @input="setAndValidateRawUrl"
          >
        </div>

        <cb-button
          text-id="c"
          class="cb-form-submit cb-margin-left-md"
          :on-click="submit"
          :loader="isLoading"
          primary
          text="Create chat"
          :disabled="!isFormReady || isLoading"
        />
      </div>

      <!--
        #####################################################
        Toggle between modes
        #####################################################
       -->
      <cb-text
        class="cb-margin-top-md toggle-to-import-mode"
        small
        hoverlink
        underline
        nocursor
        :on-click="toggleFormInputMode"
      >
        Or import your form from Google Forms
      </cb-text>
    </section>

    <!--
        #####################################################
        Mode - Import
        #####################################################
       -->
    <section
      v-else
      class="wizard-step1__content flex col flex-align-center"
    >
      <google-docs-import-button
        @selected="submit"
      />
      <!--
        #####################################################
        Toggle between modes
        #####################################################
       -->
      <cb-text
        class="cb-margin-top-md toggle-to-manual-mode"
        small
        hoverlink
        underline
        nocursor
        :on-click="toggleFormInputMode"
      >
        Or type in your Google Forms form link
      </cb-text>
    </section>

    <!-- InValid URL Message-->
    <!------------------------------>

    <div
      :class="{
        'form-error-troubleshooting': true,
        'open': !isFormValid
      }"
    >
      <cb-text
        class="cb-form-input__error-message"
        small
        error
      >
        {{ error }}
      </cb-text>
      <cb-text small>
        ☝🏾 Having troubles?
      </cb-text><br>

      <cb-text small>
        ❗️ Make sure that you paste a google form valid URL<br>
        ❗️ Google form URL example: <cb-text
          small
          highlight
        >
          https://docs.google.com/forms/d/1CKb.../edit
        </cb-text><br>
        ❗️ Make sure that you the form is set for sharing publicly
      </cb-text>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import GoogleDocsImportButton from '@/components/GoogleDocsImportButton'
import storage from '@/services/storageService.js'

export default {

  components: {
    GoogleDocsImportButton
  },

  computed: {
    ...mapGetters([
      // Icons
      'subtractIcon',

      // error handling
      'rawGoogleFormUrlValidationClass', 'isFormValid', 'isFormReady', 'error', 'hasErrors',

      // form
      'rawGoogleFormUrl', 'formSettingIsImportMode', 'isLoading',

      // analytics
      'fireSubmitGoogleFormUrl', 'fireImpressionStep1'
    ])
  },

  mounted () {
    this.fireImpressionStep1()
    storage.set('rawGoogleFormUrl', '')
    storage.set('language', '')
  },

  methods: {
    ...mapMutations([
      // validation
      'clearError', 'setAndValidateRawUrl',

      // settings
      'toggleFormSettingIsImportMode',

      // states
      'showLoader'
    ]),

    ...mapActions([
      'restartForm',
      'fetchAndSetFormLanguages'
    ]),

    toggleFormInputMode () {
      this.restartForm()
      this.toggleFormSettingIsImportMode()
    },

    submit () {
      this.fireSubmitGoogleFormUrl()
      this.clearError()
      this.showLoader()
      this.fetchAndSetFormLanguages().then(() => {
        this.$router.push('/process')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wizard-step1  {
  min-height: 250px;
  padding: 35px 0;
}

.wizard-step1__content {
  width: 100%;

}

.form-to-chat__instructions {
  height: 198px;
  .title.small {
    margin-top: 20px;
  }
}

.icon {
  height:16px;
}

#form-to-chat__form {
  width: 100%;
  padding: 0 40px;
}

.cb-form-input__wrapper {
  width: 100%;
  position: relative;
}

.cb-form-submit {
  width: 200px;
}

.google-forms-button {
  position: absolute;
  right: 10px;
  top: 10px;
  display: inline-block;
    background: #764dbe;
    border-radius: 15px;
    font-size: 14px;
    color: #fff;
    font-weight: 600;
    padding: 0 10px;
    margin-bottom: 5px;
    cursor: default;

    &:active {
    background: #5f34a9;
    }
}

.form-error-troubleshooting {
    height: 0;
    overflow: hidden;
    align-self: flex-start;
    padding-left: 40px;
    transition: height 0.3s;

    ul {
      padding:0;
      margin:0;
      margin-bottom: 10px;
      li {
        list-style: none;
      }
    }

    &.open {
      margin-top: 20px;
      height: 130px;
    }
}

.cb-error {
  input {
    color: $error-color !important;
    border: 1px solid $error-color !important;
    background:  $error-background !important;

  }
  .cb-button{
    background-color: #E82451 !important;
  }

}

.cb-success {
  input {
    color: $primary-color;
    border: 1px solid $primary-color;
    background: $primary-faded-color;
  }
}

.form-instruction-title {

  align-items: center;
  line-height: 25px;
  margin-bottom: 8px;

  strong {
    margin-right: 3px;
  }

  img {
    display: inline-block;
    margin: 0 3px;
  }
}

.form-to-chat__sub-title {
  max-width: 480px;
  display: block;
}

.form-to-chat__form-clear-input-button {
  position: absolute;
  right:8px;
  top: 11px;
  padding: 0 !important;
  background: transparent;
}

/* Landscape phone */
@media screen
  and (max-height: 400px)
  and (orientation: landscape) {
    .form-to-chat__sub-title {
      font-size: 18px !important;
      line-height: 18px;
      max-width: 100%;
    }
    .form-to-chat__instructions {
      height: auto !important;
      .title.small{
        margin-top: 0;
      }
    }
}

@media screen and (max-width: $ipad) {
  #form-to-chat__form {
    flex-direction: column !important;
    justify-content: flex-end;
  }
  .cb-form-submit {
    width: 100%;
    margin-top: 15px;
    margin-left: 0;
  }
  .form-error-troubleshooting {
    text-align: left;
    width: 90%;
    padding-left: 20px;
    padding-right: 20px;
    word-break: break-word;

    &.open {
      height: 200px;
      border-top: 1px solid rgba(0,0,0,0.1);
      align-self: center;
      padding-top: 20px;
    }
  }
}
@media only screen and (max-width: $ipad), (max-device-height: $mobile) {

  .form-to-chat__instructions {
    height: 180px;
    text-align: left;
  }

  .small.title {
    font-size: 16px;
  }

  .form-to-chat__title{
    flex-direction: column;
    font-size: 30px;
  }

  .form-instruction-title {
    font-size: 18px;
  }
}
</style>
