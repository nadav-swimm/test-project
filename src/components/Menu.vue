<template>
  <div class="cb-menu">
    <div
      class="sharing-option__create sharing-options__item flex row"
      @click="onCreateNewChat"
    >
      <img
        :src="plusIcon"
      ><cb-text
        hoverlink
        small
        nocursor
      >
        Create another
      </cb-text>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    options: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {

    }
  },

  methods: {
    onClick (e) {

    }

  }

}
</script>
<style lang="scss" scoped>
.sharing-option__create {
  @include margin('down', 'md');
  img {
    @include margin('right', 'sm');
  }
}
</style>
