<template>
  <!-- eslint-disable vue/no-v-html -->
  <section class="faq-accordion">
    <div class="cb-grid-row" />
    <cb-accordion
      v-for="item in items"
      :key="item.question"
    >
      <template v-slot:question>
        {{ item.question }}
      </template>
      <template v-slot:answer>
        <cb-text
          normal
          v-html="item.answer"
        />
      </template>
    </cb-accordion>
    <div class="cb-grid-row" />
  </section>
</template>

<script>
/* eslint-disable vue/no-v-html */
export default {

  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
<style lang="scss">
.question {
    border-bottom: 1px solid $light-blue;
    color: $primary-color;
    padding: 5px;
}
.answer {
    padding: 30px !important;
}
</style>
<style lang="scss" scoped>
.faq-accordion {
    box-sizing: border-box;
    border: 1px solid #E2E5EB;
    border-radius: 16px;
    background: #fff;
}

</style>
