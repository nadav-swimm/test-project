<template>
  <div
    class="loader"
    :style="`width: ${size}px; height: ${size}px`"
  />
</template>
<script>

export default {
  props: {

    size: {
      type: Number,
      default: 32
    }

  }
}
</script>

<style lang="scss" scoped>

////////
.loader{
  border-radius: 50%;

}
.loader {
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 3px solid rgba(0, 0, 0, 0.1);
  border-right: 3px solid rgba(0, 0, 0, 0.1);
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  border-left: 3px solid $primary-color;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>
