<template>
  <div :class="`${opened ? 'cb-accordion-opened': 'cb-accordion-closed'} item`">
    <div
      class="question"
      @click="clicked"
    >
      <img
        :src="chevronDownIcon"
        class="chevron"
      >
      <cb-text
        normal
        primary
        hoverlink
      >
        <slot name="question" />
      </cb-text>
    </div>
    <div class="answer">
      <slot name="answer" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: function () {
    return {
      opened: false
    }
  },
  computed: {
    ...mapGetters(['chevronDownIcon'])

  },
  methods: {
    clicked: function (e) {
      this.opened = !this.opened
    }
  }
}
</script>

<style lang="scss" scoped>

.question{
  font-weight: 400;
  cursor: pointer;
  display: flex;
  text-align: left;
  padding: 20px;

  .chevron {
    transform: rotate(0deg);
    margin-right: 5px;
  }
}
.answer {
  color: #596D81;
  padding: 10px 20px;
  text-align: left;
  background: #F9F9F9;
}

.cb-accordion-closed {
  .answer {
    display: none;
  }

  .chevron {
    transform: rotate(-90deg);
  }

}
</style>"
