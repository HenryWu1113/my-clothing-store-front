<template>
  <header class="flex flex-row h-[72px] border border-b-black-500 px-4">
    <div class="flex flex-row cursor-pointer items-center" @click="$router.push('/')">
      <img class="h-4/5" src="/src/assets/images/logo_dark.png" />
      <n-gradient-text class="text-2xl ml-2 font-bold" type="info">STORE</n-gradient-text>
    </div>
    <CategoriesBtns />
    <MunuBtns />
  </header>
  <RouterView />
</template>
<style lang="scss" scoped></style>
<script lang="ts" setup>
import { ref, reactive, type Ref } from 'vue'
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useMessage } from 'naive-ui'
import CategoriesBtns from './CategoriesBtns.vue'
import MunuBtns from './MunuBtns.vue'

// interface $messageType {
//   $message: any
// }

// // 使用类型断言初始化 window 变量
// let window = {} as Window & typeof globalThis & $messageType

// // 然后进行赋值
// window.$message = useMessage()
// console.log(window.$message)
</script>
