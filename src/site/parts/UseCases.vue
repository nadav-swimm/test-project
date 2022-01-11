<template>
  <section class="wrapper use-cases">
    <div class="flex-align-center cb-site-width">
      <div class="cb-app__content-max-width cb-content">
        <div class="cb-grid-row" />
        <cb-hp-section-title>
          Use Cases
        </cb-hp-section-title>
        <div class="cb-grid-row" />

        <ul class="use-cases-list flex col">
          <li class="flex row cb-margin-bottom-lg">
            <div class="use-cases-list__photo">
              <img :src="daniImage">
            </div>
            <div class="use-cases-list__description flex-1">
              <cb-text
                title
                bold
                large
                primary
                block
              >
                Dani A. Teacher,  high school
              </cb-text>
              <cb-text>
                As a math teacher, I wanted to give my students an assignment but in a <strong>fun way</strong> .
                I used chat-forms and my students were delighted!<br>
                <a
                  href="https://chat-forms.com/forms/1628887455569-nzi/?form"
                  target="_blank"
                >2020 student achievements survey</a>
              </cb-text>
            </div>
            <div class="use-cases-list__image">
              <img :src="example1">
            </div>
          </li>

          <li><div class="cb-grid-row" /></li>

          <li class="flex row">
            <div class="use-cases-list__photo">
              <img :src="prashantImage">
            </div>
            <div class="use-cases-list__description flex-1">
              <cb-text
                title
                bold
                block
                large
                primary
              >
                Prashant, government official - India
              </cb-text>
              <cb-text>
                Most people in my town are not responding to official forms. We create interactive <strong>Covid-19</strong> declaration from a google from and started collecting information.
                <br>
                <a
                  href="https://chat-forms.com/forms/1628966048441-ima/?form"
                  target="_blank"
                >Covid-19 Survey</a>
              </cb-text>
            </div>
            <div class="use-cases-list__image">
              <img :src="example2">
            </div>
          </li>

          <li><div class="cb-grid-row" /></li>

          <li class="flex row">
            <div class="use-cases-list__photo">
              <img :src="richardImage">
            </div>
            <div class="use-cases-list__description flex-1">
              <cb-text
                title
                bold
                large
                block
                primary
              >
                Richard - HR,  Tech Company
              </cb-text>
              <cb-text>
                As a recruiter, I wanted to reach to as many people as possible. With Chat-forms I sent a professional looking fun survey that brought me a lot of leads!
                <br>
                <a
                  href="https://chat-forms.com/forms/1628966890775-fuf/?form"
                  target="_blank"
                >Job application</a>
              </cb-text>
            </div>
            <div class="use-cases-list__image">
              <img :src="example3">
            </div>
          </li>
        </ul>
      </div>
      <div class="cb-grid-row" />
      <div class="cb-grid-row" />
    </div>
  </section>
</template>
<script>
import DaniImage from '~/assets/dani.png'
import PrashantImage from '~/assets/prashant.png'
import RichardImage from '~/assets/richard.png'
import Example1 from '~/assets/example_student_tech_achievements.png'
import Example2 from '~/assets/example_link_to_survey.png'
import Example3 from '~/assets/example_survey.png'

export default {
  computed: {
    daniImage () { return DaniImage },
    prashantImage () { return PrashantImage },
    richardImage () { return RichardImage },
    example1 () { return Example1 },
    example2 () { return Example2 },
    example3 () { return Example3 }

  }
}
</script>

<style lang="scss" scoped>
.use-cases {
  background: $light-blue;
}

.use-cases li:last-child {
  border-bottom: none;
}

.use-cases-list__photo {
  width: 225px;
  height: 225px;
  border-radius: 100%;
}
.use-cases-list__description {
  padding: 0 40px;
}
.use-cases-list__image {
  width: 300px;
  text-align: center;
  display: flex;
  justify-content: center;
  img {
    width: 290px;
    height: 286px;
  }
}
   @media only screen and (max-width: $ipad) {
     .use-cases-list{
       .row {
         flex-direction: column;
       }
     }
     .use-cases-list__image {
        display: none;
      }
      .use-cases-list__photo {
        width: 48px;
        height: 48px;
        border-radius: 100%;
      }
      .use-cases-list__description {
        padding: 15px;
      }
   }
</style>
