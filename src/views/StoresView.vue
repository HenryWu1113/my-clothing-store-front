<template>
  <div class="stores-page myContainer min-h-screen">
    <div class="title">店鋪資訊</div>
    <div class="stores-wrap">
      <template v-if="loading">
        <n-skeleton v-for="item in Array.from({ length: 20 }, (_, idx) => idx)" :key="item" :sharp="false"
          size="medium" />
        <StoreCard v-for="(store, idx) in stores" :key="store._id" :store="store" :idx="idx" />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';

.stores-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .title {
    font-size: 2rem;
    font-weight: bold;
    color: $text-color;
    border-bottom: 1px solid $border-color;
    padding: 2rem 0 10px 0;
  }

  .stores-wrap {
    padding: 2rem 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    >div {
      width: calc((100% - 2rem) / 3);
      aspect-ratio: 4/3 !important;

      &.store-card {
        background: yellow;
      }

      @include xxxl {
        width: calc((100% - 1rem) / 2);
      }

      @include lg {
        width: 100%;
      }

      &.n-skeleton {
        height: auto !important;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref, shallowRef, computed, watch, type Ref } from 'vue'
import { useMessage } from 'naive-ui'
import { api } from '@/plugins/axios'
import type { IStore } from '@/types'
import { useRouter, useRoute } from 'vue-router'

import StoreCard from '@/components/cards/StoreCard.vue'

const message = useMessage()
const route = useRoute()
const router = useRouter()

const loading = ref(false)

const stores = ref<IStore[]>([])

/** 取所有穿搭 */
async function getStores() {
  loading.value = true
  try {
    const { data } = await api().get('/stores')
    console.log(data)
    stores.value = [...data.result]
  } catch (error: any) {
    message.error(error.isAxiosError ? error.response.data.message : error.message)
  }
  loading.value = false
}

getStores()
</script>
