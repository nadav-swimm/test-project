<template>
  <div
    class="dropdownbox"
    tabindex="0"
    @focusout="onClickOutside"
  >
    <div

      @click="open=!open"
    >
      <span
        class="handle"
      />

      <input
        class="dropdownbox__input"
        type="text"
        :value="selected"
      >
    </div>
    <ul
      v-if="open"
      class="menu"
    >
      <li

        v-for="(option, index) in options"
        :key="index"
      >
        <cb-text
          nocursor
          small
        >
          {{ option.name }}
        </cb-text>
        <!-- {{ option }} -->
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {

    options: {
      type: Function,
      default: () => {
      }
    }
  },
  data () {
    return {
      open: false,
      selected: 'Select value for'
    }
  },
  methods: {
    onClickOutside (e) {
      this.open = false
    }
  }

}
</script>
<style lang="scss" scoped>
.dropdownbox {
  height: 32px;
  border: 1px solid rgba(0,0,0,0.2);
  display: inline-block;
  position: relative;
  min-width: 140px;
  border-radius: 50px;
  padding-right: 20px;

  .dropdownbox__input {
    border: 0;
    background: red;
    padding: 0;
    height: 30px;
    padding-left: 12px;
    margin-right: 20px;
  }

  .menu {
    position: absolute;
    max-height: 180px;
    min-width: 140px;
    overflow: auto;
    top: 40px;
    left: 0;
    border: 1px solid rgba(0,0,0,0.2);
    box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
    border-radius: 2px;
    z-index: 100;
    background: #fff;

    > li {
      padding: 6px;
      &:hover {
        background: #efefef;
      }
    }

  }

  .handle {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 7px 5px 0 5px;
    border-color: rgba(0,0,0,0.2) transparent transparent transparent;
    position: absolute;
    right: 10px;
    top: 12px;
  }
}
</style>
