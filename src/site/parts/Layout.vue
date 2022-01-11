<template>
  <section class="full-height">
    <div
      v-if="isSiteLayout"
      class="site full-height"
    >
      <cb-header />
      <router-view />
    </div>

    <div
      v-if="isAppLayout"
      class="app full-height"
    >
      <cb-app-header />
      <div class="cb-content cb-site-width full-height">
        <router-view />
      </div>
    </div>
  </section>
</template>
<script>
import CbHeader from '@/site/parts/Header.vue'
import CbAppHeader from '@/site/parts/AppHeader.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    CbHeader,
    CbAppHeader
  },
  computed: {
    ...mapGetters([
      'isAppLayout',
      'isSiteLayout'
    ])
  }
}
</script>
<style lang="scss" scoped>

</style>
