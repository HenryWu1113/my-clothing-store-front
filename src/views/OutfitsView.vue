<template>
  <div class="outfits-page myContainer min-h-screen">
    <div class="title">穿搭展示</div>
    <div class="outfits-wrap">
      <template v-if="loading">
        <n-skeleton
          v-for="item in Array.from({ length: 20 }, (_, idx) => idx)"
          :key="item"
          :sharp="false"
          size="medium"
        />
      </template>
      <OutfitCard v-for="(outfit, idx) in outfits" :outfit="outfit" :idx="idx" :key="outfit._id" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';
.outfits-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .title {
    font-size: 2rem;
    font-weight: bold;
    color: $text-color;
    border-bottom: 1px solid $border-color;
    padding-bottom: 10px;
  }
  .outfits-wrap {
    padding: 2rem 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    > div {
      width: calc((100% - 4rem) / 5);
      aspect-ratio: 2/3 !important;

      @include xxxxl {
        width: calc((100% - 3rem) / 4);
      }

      @include xxxl {
        width: calc((100% - 2rem) / 3);
      }

      @include md {
        width: calc((100% - 1rem) / 2);
      }

      @include sm {
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
import type { IOutfit } from '@/types'
import { useRouter, useRoute } from 'vue-router'

import OutfitCard from '@/components/cards/OutfitCard.vue'

const message = useMessage()
const route = useRoute()
const router = useRouter()

const loading = ref(false)

const outfits = ref<IOutfit[]>([])

/**
 * 取商品
 * @param queryObj
 */
async function getOutfits() {
  loading.value = true
  try {
    const { data } = await api().get('/outfits')
    console.log(data)
    outfits.value = [...data.result]
  } catch (error: any) {
    message.error(error.isAxiosError ? error.response.data.message : error.message)
  }
  loading.value = false
}

getOutfits()
</script>
