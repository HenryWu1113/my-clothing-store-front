<template>
  <header>
    <div class="logo">H</div>
    <CategoriesBtns />
    <MunuBtns />
  </header>
  <RouterView />
  <FooterView />
</template>

<style lang="scss" scoped>
@import '@/styles/styles';

header {
  height: 72px;
  border-bottom: 1px solid $border-color;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: $bg-color;
  .logo {
    height: 70%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background: $text-color;
    display: flex;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: $bg-color;
  }
}
</style>

<script lang="ts" setup>
import { ref, reactive, type Ref } from 'vue'
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useMessage } from 'naive-ui'
import CategoriesBtns from './CategoriesBtns.vue'
import MunuBtns from './MunuBtns.vue'
import FooterView from '@/components/FooterView.vue'

// interface $messageType {
//   $message: any
// }

// // 使用类型断言初始化 window 变量
// let window = {} as Window & typeof globalThis & $messageType

// // 然后进行赋值
// window.$message = useMessage()
// console.log(window.$message)
</script>
