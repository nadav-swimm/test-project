<template>
  <router-link
    :to="to"
    exact
    exact-active-class="cb-active-link"
  >
    <slot />
    <cb-text
      small
      hoverlink
    >
      {{ name }}
    </cb-text>
  </router-link>
</template>

<script>

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
  }
}
</script>
