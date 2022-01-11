<template>
  <div class="wrapper">
    <transition name="appear">
      <div
        v-show="visible(modalId)"
        class="overlay"
        @click="hide"
      />
    </transition>
    <div
      v-if="visible(modalId)"
      class="modal"
    >
      <div

        class="modal__content"
        :style="style"
      >
        <img
          :src="closeIcon"
          class="modal__close"
          @click="hide"
        >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    modalId: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: null
    },
    height: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapGetters([
      'visible', 'closeIcon'
    ]),
    style () {
      return {
        width: this.width || '90%',
        height: this.height || 'auto'
      }
    }
  },
  mounted () {
    this.registerModal(this.modalId)
  },
  methods: {
    ...mapMutations(['hideModal', 'registerModal']),
    hide () {
      this.$emit('closed')
      this.hideModal()
    }
  }
}
</script>
<style lang="scss" scoped>
@media only screen and (min-width: $mobile) {
    .modal__content {
    position: fixed;
    z-index: 999;
    background-color: #fff;
    box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    padding: 30px;
    border-radius: 10px;
    left: 50vw;
    transform: translate(-50%);
    top: 130px;

    > * {
      margin-bottom: 10px;
    }

  }
}
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

  .modal {
    position: relative;
    cursor: pointer;
  }
  .modal__handle {
    position: relative;
    color: $primary-color;
    font-weight: 600;
  }

  .appear-enter, .appear-leave-to {
    transition: all 1s ease;
    opacity: 0;
  }
  .appear-enter-active, .appear-leave-active {
  transition: opacity .5s;
}

@media only screen and (max-width: $mobile) {
    .modal__content {
    position: fixed;
    z-index: 999;
    background-color: #fff;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    padding: 0;
    border-radius: 3px;
    left: 10px;
    top: 10px;
    bottom: 10px;
    right: 10px;
    overflow: auto;
    > * {
      margin-bottom: 10px;
    }

  }

}
</style>
<style lang="scss">
.modal__close  {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 999;
    .icon{
      width: 20px;
      height: 20px;
    }
  }

</style>
