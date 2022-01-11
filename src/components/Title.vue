<template>
  <h2
    :class="{
      'title': true,
      'large': titleStyle == 'large',
      'small': titleStyle == 'small',
      'small light': titleStyle == 'small-light',
      'normal': titleStyle == 'normal'
    }"
  >
    <cb-text

      v-if="titleStyle=='small-light'"
      title
      secondary
    >
      <slot />
    </cb-text>

    <cb-text
      v-if="titleStyle=='small'"
      large
      title
      secondary
    >
      <slot />
    </cb-text>

    <cb-text
      v-if="titleStyle=='normal'"
      larger
      title
      bold
      primary
    >
      <slot />
    </cb-text>

    <cb-text
      v-if="titleStyle=='large'"
      huge
      title
      bold
      primary
    >
      <slot />
    </cb-text>
  </h2>
</template>
<script>
export default {
  props: {
    titleStyle: {
      type: String,
      validator: (val) => {
        return ['large', 'small', 'small-light', 'normal'].includes(val)
      },
      default: 'normal'
    }
  }
}
</script>

<style lang="scss" scoped>

@media only screen and (max-width: $mobile) {

}
</style>"
