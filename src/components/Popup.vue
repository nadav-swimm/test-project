<template>
  <div class="wrapper">
    <transition name="appear">
      <div
        v-show="show"
        class="overlay"
        @click="show=!show"
      />
    </transition>
    <div class="popup">
      <div
        class="popup__handle"
        @click="show=!show"
      >
        <slot name="hidden" />
      </div>
      <div
        v-if="show"
        class="popup__content"
      >
        <div class="popup__dynamic-content">
          <slot name="show" />
        </div>
        <div class="popup_cta">
          <cb-button
            primary
            text="Done"
            :on-click="hide"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data: () => {
    return {
      show: false
    }
  },
  methods: {
    hide () {
      this.show = false
    }
  }

}
</script>
<style lang="scss" scoped>
.overlay {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  background: rgba(0,0,0,0.4);
  z-index: 999;
  overflow: hidden;
}
.icon {
  margin-right: 5px;
}

  .popup {
    position: relative;
    cursor: pointer;
  }
  .popup__handle {
    position: relative;
    color: $primary-color;
    font-weight: 600;
  }

  .popup__content {
    position: absolute;
    z-index: 999;
    right: 0;
    background-color: #fff;
    box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    min-width: 380px;
    padding: 30px;
    border-radius: 30px;
    width: calc(45vw);
    max-width: 490px;
    min-width: 350px;
    top: 40px;

    > * {
      margin-bottom: 10px;
    }

    &:before {
    content: '';
    width: 0;
    height: 0;
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
    border-bottom: 20px solid #fff;
    position: absolute;
    top: -10px;
    right: 191px;
  }
  }
  .appear-enter, .appear-leave-to {
    transition: all 1s ease;
    opacity: 0;
  }
  .appear-enter-active, .appear-leave-active {
  transition: opacity .5s;
}
@media only screen and (min-width: $mobile) {
  .popup_cta {
    display: none;
  }
}
@media only screen and (max-width: $mobile) {
  .popup_cta {
    display: flex;

    > button {
      flex: 1;
    }
  }

  .popup__content {
    left: 0;
    right: 0;
    width: auto;
    min-width: auto;
    max-width: none;
    position: fixed;
    bottom: 0;
    top: 0;
    border-radius: 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
