<template>
  <n-config-provider :locale="locale" :date-locale="dateLocale" :theme="isLight ? void 0 : darkTheme">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <n-back-top class="backTop" :right="20" :bottom="20" />
          <RouterView />
          <FooterView />
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { ref, reactive, watch, h } from 'vue'
import { RouterView } from 'vue-router'
import { darkTheme } from 'naive-ui'
import type { NLocale, NDateLocale } from 'naive-ui'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import useTheme from '@/composables/useTheme'
import _ from 'lodash'

import FooterView from './components/FooterView.vue'

const route = useRoute()
const { isLight } = useTheme()
const { getUser } = useUserStore()

const locale = ref(null as NLocale | null)
const dateLocale = ref(null as NDateLocale | null)

getUser()

watch(() => route.path, (n, o) => {
  if (n === o) return
  window.scrollTo({ top: 0 })
}, { deep: true })
</script>
