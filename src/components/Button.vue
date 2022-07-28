<template>
  <button
    :class="{
      'text-icon-button': icon && true,
      'icon-button': icon && !text,
      'disabled': disabled,
      'cb-button': true,
      'snd-button': secondary,
      'primary-button': primary,
      'minimal-button': false,
      'small': small
    }"
    type="button"
    :disabled="false"
    @click="onClick"
  >
    <img
      v-if="icon && !secondary"
      :class="`icon ${loader ? 'spin' : ''}`"
      :src="icon"
    >
    <span v-if="text">{{ text }}</span>
  </button>
</template>

<script>

export default {
  props: {

    icon: {
      type: String,
      default: ''
    },

    text: {
      type: String,
      default: ''
    },
    onClick: {
      type: Function,
      default: () => {},
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },

    // Animate and spin the button's icon
    loader: {
      type: Boolean,
      default: false
    },

    //
    // Button Styles
    //
    primary: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    secondary: {
      type: Boolean,
      default: false
    },
    minimal: {
      type: Boolean,
      default: false
    }

  }
}
</script>

<style lang="scss" scoped>
.cb-button {
  border: none;
  outline: none;
  border-radius: 40px;
  padding: 0 40px;
  font-size:16px;
  font-weight: 600;
  height: 48px;
  display: flex;
  min-width: 100px;
  flex-grow: 0;
  flex-basis: 1;
  align-items: center;
  justify-content: center;
  text-align:center;
  white-space: nowrap;

  &.minimal-button {
    border: none;
    background: none;
    color: $primary-color;
  }

  &.primary-button {
    background: $primary-color;
    color: #fff;
    cursor: pointer;
  }

  &.small {
    height: 35px;
  }

  &.secondary-button {
    background: #fff;
    color: $gray;
    border: 1px solid $gray;
    cursor: pointer;
  }
    &.secondary-button:hover {
    border: 1px solid $primary-color;
    color: $primary-color !important;
  }

  &.primary-button:hover:not(.disabled) {
    background-color: darken($primary-color, 10);
  }
  &.primary-button:active:not(.disabled) {
    background-color: lighten($primary-color, 3)
  }
  &.secondary-button:hover:not(.disabled) {
    border: 1px solid darken($primary-color, 10)
  }
  &.secondary-button:active:not(.disabled) {
    border: 1px solid lighten($primary-color, 3)
  }
  &.disabled {
    opacity: 0.3;
  }
}
.icon {
  margin-right: 4px;
}

.icon-button {
    min-width: auto;
    padding: 8px !important;
    width: 26px;
    height: 26px;
    background: rgba(0,0,0,0.04);

    .icon {
      margin: 0;
    }
  }
.text-icon-button {
  padding: 8px 12px 8px 6px !important;
}
</style>
