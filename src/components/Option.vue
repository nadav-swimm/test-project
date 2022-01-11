<template>
  <div class="cb-option flex row">
    <label class="flex row flex-align-start">
      <input
        v-model="onoff"
        :value="checked"
        type="checkbox"
        @change="onClick"
      >
      <cb-text
        small

        nocursor
      >{{ text }}</cb-text>
    </label>
    <slot />
  </div>
</template>

<script>

export default {

  props: {
    text: {
      type: String,
      default: 'Option'
    },

    checked: Boolean

  },
  data: () => {
    return {
      show: true,
      onoff: null
    }
  },
  mounted () {
    this.onoff = this.checked
  },
  methods: {
    onClick (e) {
      this.$emit('checked', this.onoff)
    }
  }

}
</script>
<style lang="scss" scoped>
  .cb-option {
      display: flex;
      padding: 10px 0;
      margin-bottom: 0;
      border-radius: 10px;
    }
  label {
    align-items: flex-start;
    input {
      @include margin('right', 'md')
    }
  }
  .cb-option {
    font-size: 14px;

    .text {
      flex-basis: 1;
      flex-shrink: 0;
    }
  }

  @media only screen and (max-width: $mobile) {
    .cb-option {
      padding: 0;
      margin-bottom: 10px;
    }
    .cb-option:active {

      background: rgba(0,0,0,0.04);
    }

  }
</style>
