<template>
  <div class="products-view myContainer min-h-screen">
    <div class="title">
      <p>我的收藏</p>
    </div>
    <div class="product-wrap">
      <template v-if="loading">
        <n-skeleton
          v-for="item in Array.from({ length: 20 }, (value, idx) => idx)"
          :key="item"
          :sharp="false"
          size="medium"
        />
      </template>
      <ProductCard
        v-else
        v-for="(product, idx) in products"
        :idx="idx"
        :key="product._id"
        :product="product"
        @click="$router.push(`product/${product._id}`)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';
.products-view {
  .title {
    font-size: 2rem;
    font-weight: bold;
    color: $text-color;
    border-bottom: 1px solid $border-color;
    padding: 2rem 0 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .product-wrap {
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
import { ref, reactive, watch, type Ref } from 'vue'
import { useMessage } from 'naive-ui'
import { api } from '@/plugins/axios'
import { Filter } from '@vicons/fa'
import { useRouter, useRoute } from 'vue-router'
import type { IProduct } from '@/types'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

import ProductCard from '@/components/cards/ProductCard.vue'

const { getFav } = useUserStore()
const { favorites } = storeToRefs(useUserStore())

const message = useMessage()
const route = useRoute()
const router = useRouter()

const loading = ref(false)
const productSort = ref('newToOld')
const productCategory = ref('All')
const usePriceRange = ref(true)
const priceRange = ref({
  gte: 0,
  lte: 1000
})

const products: Ref<IProduct[]> = ref([])

/** 商品排序 */
const productSortOptions = reactive([
  {
    label: '由新至舊',
    value: 'newToOld'
  },
  {
    label: '由舊至新',
    value: 'oldToNew'
  }
])
/** 商品分類(資料庫讀取目前有什麼分類 product.clothingPart) */
const productCategoryOptions = reactive([
  {
    label: '全部',
    value: 'All'
  },
  {
    label: '上衣',
    value: 'shirts'
  },
  {
    label: '褲子',
    value: 'pants'
  }
])

async function getFavorites() {
  loading.value = true
  try {
    const data = await getFav()
    console.log(data)
    products.value = [...data.result]
  } catch (error: any) {
    message.error(error.isAxiosError ? error.response.data.message : error.message)
  }
  loading.value = false
}

getFavorites()
</script>
