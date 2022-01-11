<script>
import '@/components/'
import { mapMutations } from 'vuex'
import Layout from '@/site/parts/Layout.vue'

export default {
  components: {
    Layout
  },

  methods: {
    ...mapMutations([
      'setLayout'
    ])
  }

}
</script>
<template>
  <layout />
</template>
<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
@import "../scss/base.scss";
@import "../scss/layout.scss";
@import "../scss/classes.scss";
@import "../scss/thirdPartyOverrides.scss";

</style>
