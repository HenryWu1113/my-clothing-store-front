<template>
  <div class="stores-page myContainer min-h-screen">
    <div class="title">
      <p>店鋪資訊</p>
      <n-select v-model:value="position" :options="positionOptions" />
    </div>
    <div class="stores-wrap">
      <template v-if="loading">
        <n-skeleton
          v-for="item in Array.from({ length: 10 }, (_, idx) => idx)"
          :key="item"
          :sharp="false"
          size="medium"
        />
      </template>
      <StoreCard v-for="(store, idx) in filterStores" :key="store._id" :store="store" :idx="idx" />
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
    display: flex;
    justify-content: space-between;
    .n-select {
      width: 200px;
    }
  }

  .stores-wrap {
    padding: 2rem 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    > div {
      // width: calc((100% - 2rem) / 5);
      // aspect-ratio: 4/3 !important;
      // height: 200px;

      // @include xxxxl {
      //   width: calc((100% - 1rem) / 3);
      // }

      // @include xxxl {
      width: calc((100% - 1rem) / 2);
      // }

      @include sm {
        width: 100%;
      }

      &.n-skeleton {
        height: 200px !important;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref, reactive, computed, watch, type Ref } from 'vue'
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

const position = ref('全部')

const positionOptions = reactive([
  {
    label: '全部',
    value: '全部'
  },
  {
    label: '北',
    value: '北'
  },
  {
    label: '中',
    value: '中'
  },
  {
    label: '南',
    value: '南'
  },
  {
    label: '東',
    value: '東'
  }
])

/** 取所有店鋪 */
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

const filterStores = computed(() => {
  if (position.value === '全部') return stores.value
  return stores.value.filter((item) => item.position === position.value)
})
</script>
