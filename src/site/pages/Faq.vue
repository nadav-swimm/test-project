<template>
  <section class="faq wrapper cb-site-width">
    <cb-page-title text="Frequently Asked Questions" />
    <cb-faq-accordion :items="items" />
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import { FaqAccordion } from '@/site/parts/'

export default {
  components: {
    CbFaqAccordion: FaqAccordion
  },
  data () {
    return {
      items:
         [
           {
             question: 'What Is a Chat Form?',
             answer: `A Chat Form is a friendly <br> and intuitive way of filling forms, using a chat-like experience.
        Chat Forms works with Google forms. This way you can enjoy Google Forms functionality for editing your questions or your survey,
        but serving it in a interactive and Chat Bot.`
           },
           {
             question: 'How will my participants experience it?',
             answer: 'The participants of a Chat Form experience it as a chat bot is talking to them and collecting their replies.'
           },
           {
             question: 'Where can I see the participants replies?',
             answer: ` All the replies are applied to the Google Form the form has been originated from.<br>
        The answers are available in the Google Forms account.`
           },
           {
             question: 'How can I create a Chat Form?',
             answer: `Chat Forms are built on top of Google Forms, there are two options to create new Chat Form:<br>
                  <ol>
                    <li>
                      Using Chat Forms website on <a
                        href="http://www.chat-forms.com"
                        target="_blank"
                      >www.chat-forms.com</a>, paste a valid public Google Form address, click <strong>Next</strong> and select a language, click <strong>Next</strong> again to create the form.
                    </li>
                    <li>Chat Forms add-on inside Google Forms, select a language, click <strong>Next</strong> again to create the form.</li>
              </ol>`
           },
           {
             question: 'How to install Chat Forms add-on?',
             answer: `To install <b>Chat Forms</b> add-on, go to Google Forms, open an existing form or create new one, click on the side menu and Choose  <b>add-ons</b>. Search for <b>Chat Forms</b> and click on the <b>Free</b> button. Alternatively, go to
                  <a
                    href="https://gsuite.google.com/marketplace/app/chatforms/828567624230?pann=cwsdp&hl=en-GB"
                    target="_blank"
                  > Add-on </a> and Click on the <b>Free</b> button.`
           },
           {
             question: 'How to open Chat Forms add-on?',
             answer: 'after installing the add-on, you need to open it in order to use it. Click on the icon on the top menu ribbon and choose <b>Chat Forms</b> from the dropdown menu.<br><b>Note:</b> On mobile device the add-on will open on full screen, on desktop the add-on will open as a sidebar.'
           },

           {
             question: 'How can I share a Chat Form?',
             answer: 'There are two method of sharing our form:<br><ol><li>Using <b>Chat Forms</b> share tool. After you generated a Chat Form, click on the <b>Share</b> button and choose on of the available sharing options. You can share the form using email, social media, or a web link.<br><b>Note:</b> On mobile, the generic Share menu will open and provide more share options.</li><li>Browser link sharing. After you generated a Chat Form, open the form on the <b>Open</b> button, copy the address from the browser’s address bar and distribute it to your audience.</li></ol>'
           },

           {
             question: 'How much is cost to use Chat Forms?',
             answer: '<b>Chat Forms</b> is a free tool and we are not planning to charge our users for any action. In the future we may add extended features that will be available for additional cost.'
           },

           {
             question: 'How can I delete a Chat Form?',
             answer: '<b>Chat Forms</b> are being automatically deleted after 30 days. If you choose to share your Chat Form using our internal email sharing tool, a reminder email will be sent to you before the form if deleted with the option to postpone the deletion for 30 days. Unless communicated otherwise, you will be able to continue and postpone the deletion of your Chat Form every month up to two years.'
           },

           {
             question: ' How is behind chat Forms?',
             answer: `<b>Chat Forms</b> was developed as a side project by inter-act now ltd. Visit us on <a
          href="http://www.inter-act.io"
          target="_blank"
        >www.inter-act.io</a>`
           },

           {
             question: ' Can I leave Feedback or ask for features from Chat Forms team?',
             answer: `Sure! Just go to <a
          href="#/feedback"
          target="_self"
        >Feedback</a> and drop us a message. We always love to listen to what our users have to say.`
           }

         ]
    }
  },
  computed: {
    ...mapGetters(['plusIcon'])
  }

}
</script>
<style lang="scss" scoped>

@media only screen and (min-width: $mobile) {
  .faq.wrapper {
    padding-bottom: 80px;

  }

}
</style>
