<template>
  <section class="cb-footer wrapper">
    <div>
      <ul class="cb-footer__items flex col">
        <li>
          <cb-text small>
            @ {{ year }} Inter-act
          </cb-text>
        </li>

        <li>
          <cb-link
            to="/privacy-policy"
            name="Privacy Policy"
          />
          <span class="separator" />
          <cb-link
            to="/terms"
            name="Terms of Service"
          />
        </li>
        <li>
          <cb-external-link
            url="gsuite.google.com/marketplace/app/chatforms/828567624230?pann=cwsdp&hl=en-GB"
          >
            <cb-text
              small
              hoverlink
            >
              Get the Add-on
            </cb-text>
          </cb-external-link>
        </li>
        <li>
          <!-- share-by-social-media / -->
          <ul class="social-media-links flex flex-row">
            <li
              class="icon facebook"
            >
              <cb-social-media-link
                url="www.facebook.com/chatforms"
              >
                <img
                  :src="facebookIcon"
                >
              </cb-social-media-link>
            </li>
            <li
              class="twitter icon"
            >
              <cb-social-media-link
                url="www.twitter.com/inter_act_now"
              >
                <img
                  :src="twitterIcon"
                >
              </cb-social-media-link>
            </li>
            <li
              class="icon linkedin"
            >
              <cb-social-media-link
                url="www.linkedin.com/company/inter-act-now"
              >
                <img
                  :src="linkedinIcon"
                >
              </cb-social-media-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    to: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['puzzleIcon', 'chatBotUrl', 'linkedinIcon', 'facebookIcon', 'twitterIcon']),
    year () {
      const date = new Date()
      return date.getFullYear()
    }
  }
}
</script>

<style lang="scss">
.social-media-links {
  li {
    margin-right: 7px !important;
  }
}
.social-media-links img {
    width: 24px;
    height: auto;
    cursor: pointer;
  }
</style>

<style lang="scss" scoped>
.cb-footer {
  height: 63px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.cb-footer li {
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

// desktop
@media only screen and (min-width: $mobile) {
  .cb-footer {
    height: 63px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .cb-footer ul {
      display: flex;
      flex-direction: row;
      align-items: center;
  }
}
.separator {
  margin: 0 5px;
}

//  mobilex
@media only screen and (max-width: $mobile) {
  .cb-footer {
    border: none;
    height: 200px;
    display: flex;
    justify-content: center;
  }
  .cb-footer__items {
    flex-direction: column;
    align-items: center;
    flex-flow: column-reverse;
  }
  .separator {
    width: 1px;
    height: 10px;
    background: rgba(0,0,0,0.5);
    display: inline-block;
    margin: 0 10px;
  }
  .cb-footer li {
  margin-bottom: 10px;
}
}

</style>
