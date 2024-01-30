<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-mask">
      <div class="modal">
        <div class="modal-title">
          <p>註冊</p>
          <n-icon :component="Times" @click="onClose('register')"></n-icon>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
@import '@/styles/styles';
.modal-mask {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: $light;
    border-radius: 10px;
    width: 40%;
    @include lg {
      width: 50%;
    }
    @include md {
      width: 60%;
    }
    @include sm {
      width: 100%;
      height: 100%;
    }
    .modal-title {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 1rem;
      font-size: 18px;
      font-weight: bold;
      > p {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      > .n-icon {
        cursor: pointer;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { Times } from '@vicons/fa'
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  onClose: {
    type: Function as (modalType: string) => void,
    require: true
  }
})
</script>
