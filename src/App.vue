<template>
  <n-config-provider :locale="locale" :date-locale="dateLocale" :theme="undefined">
    <n-message-provider>
      <n-dialog-provider>
        <n-back-top class="backTop" :right="20" :bottom="20" />
        <RouterView />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { ref, reactive, shallowRef, h } from 'vue'
import { RouterView } from 'vue-router'
import { darkTheme } from 'naive-ui'
import type { NLocale, NDateLocale } from 'naive-ui'

const locale = ref(null as NLocale | null)
const dateLocale = ref(null as NDateLocale | null)
</script>
