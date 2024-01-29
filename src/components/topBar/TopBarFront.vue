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
import CategoriesBtns from './CategoriesBtns.vue'
import MunuBtns from './MunuBtns.vue'
</script>
