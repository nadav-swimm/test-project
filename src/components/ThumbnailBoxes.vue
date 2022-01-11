<template>
  <ul class="cb-thumbnail-boxes">
    <li
      v-for="item in items"
      :key="item.title"
      class="cb-thumbnail-item"
    >
      <a
        v-if="item.url"
        class="cb-thumbnail-link"
        @click.prevent="navigate(item)"
      >
        <div class="cb-thumbnail-img">
          <img :src="item.icon">
        </div>
        <p class="cb-thumbnail-text">{{ item.title }}</p>
      </a>
      <div v-else>
        <div class="cb-thumbnail-img">
          <img :src="item.icon">
        </div>
        <p class="cb-thumbnail-text">
          {{ item.title }}
        </p>
      </div>
    </li>
    <slot />
  </ul>
</template>
<script>
export default {

  props: {
    items: {
      type: Array,
      default: () => { return [] }
    }
  },
  methods: {
    navigate (item) {
      this.$analytics.track('Examples', 'Select Example', { example: item })
      window.open(item.url, '_blank').focus()
    }
  }
}
</script>

<style lang="scss">
.cb-thumbnail-boxes {
  display: flex;
  justify-content: space-between;
  flex: 1;
    @media only screen and (max-width: $mobile), (max-device-height: $mobile) {
      flex-wrap: wrap;
  }
}
.cb-thumbnail-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
  .cb-thumbnail-link {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .cb-thumbnail-text {
    margin-top: 15px;
  }
</style>
