<template>
  <div class="container">
    <div :class="{one: animate, phrase: true}">
      Job applications
    </div>
    <div :class="{two: animate, phrase: true}">
      Registration forms
    </div>
    <div :class="{three: animate, phrase: true}">
      Surveys
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      animate: true
    }
  },
  mounted () {
    setInterval(() => {
      this.animate = false
      setTimeout(() => {
        this.animate = true
      }, 300)
    }, 7000)
  }
}
</script>

<style lang="scss" scoped>
.cb-page-title {
  padding: 20px 0 30px 0;
}
.container {
  display: inline-block;
  overflow: hidden;
  position: relative;
  height: 50px;
  width: 400px;
  margin-bottom: -12px;
}
.phrase {
  position: absolute;
  top: 45px;
  opacity: 1;
}
.one {
  animation-name: slide-and-fade;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-delay: 0s;
}
.two {
  animation-name: slide-and-fade;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-delay: 2.5s;
}
.three {
  animation-name: slide-and-fade;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-delay: 4.5s;
  animation-fill-mode: forwards;
}

@keyframes slide {
  0% {top: 45px; }
  20% {top: 0; }
  60% {top: 0; }
  100% {top: 0; }
}
@keyframes slide-and-fade {
  0% {top: 45px; opacity: 1}
  20% {top: 0; opacity: 1}
  60% {top: 0; opacity: 1}
  100% {top: 0; opacity: 0}
}

@media only screen and (max-width: $mobile) {
  .container {
      height: 31px;
      width: 220px;
      margin-bottom: -8px;
  }
}
@media only screen and (max-width: $ipad) {
  .container {
     height: 32px;
    width: 250px;
    margin-bottom: -8px;

}
}

@media only screen and (min-width: $ipad) and (max-width: $small-screens) {
  .container {
      height: 50px;
    width: 450px;
    margin-bottom: -12px;
}
}
</style>"
