<template>
  <nav
    class="cb-app-back-navigation"
  >
    <cb-text
      small
      hoverlink
      nocursor
      class="back-navigation__back"
      :on-click="backStep"
    >
      <span class="back-button flex row">
        <img
          :src="chevronDownIcon"
          class="rotate-minus-90"
        >
        Back
      </span>
    </cb-text>
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
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
    ...mapGetters([
      'chevronDownIcon'
    ])
  },
  methods: {
    ...mapMutations([
      'backStep'

    ])
  }
}
</script>
<style lang="scss" scoped>
.cb-app-back-navigation {
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 20px;
}
.back-button img {

  margin-right: 5px;
}
  .rotate-minus-90{
    transform: rotate(90deg);
  }
</style>
