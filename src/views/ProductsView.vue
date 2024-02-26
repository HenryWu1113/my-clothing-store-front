<template>
  <div class="products-view myContainer min-h-screen">
    <div class="category-top">
      <img src="/src/assets/images/categoryTopImage.jpg" alt="" />
    </div>
    <div class="slogan">精選商品分類</div>
    <div class="product-filter-wrap">
      <n-select v-model:value="productSort" :options="productSortOptions" />
      <n-select v-model:value="productCategory" :options="productCategoryOptions" />
      <n-icon :component="Filter"></n-icon>
      <div class="price-range" v-if="false">
        <n-checkbox v-model:checked="usePriceRange">售價篩選</n-checkbox>
        <n-input-number v-model:value="priceRange.gte" />
        <n-input-number v-model:value="priceRange.lte" />
      </div>
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
      <ProductCard v-else v-for="product in products" :key="product._id" :product="product" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';
.products-view {
  > .category-top {
    > img {
      width: 100%;
    }
  }
  .slogan {
    padding: 2rem;
    text-align: center;
    font-weight: bold;
    font-size: 30px;
  }
  .product-filter-wrap {
    border: 1px solid $light1;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;
    > .n-icon {
      font-size: 1.5rem;
      cursor: pointer;
    }
    .price-range {
      display: flex;
      align-items: center;
      gap: 10px;
    }
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
import queryString from 'query-string'

import ProductCard from '@/components/cards/ProductCard.vue'

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

async function getProducts(queryObj: Record<string, any>) {
  const str = queryString.stringify(queryObj)
  // console.log(str)
  loading.value = true
  try {
    const { data } = await api().get(`/products?${str}`)
    console.log(data)
    products.value = [...data.result]
  } catch (error: any) {
    message.error(error.isAxiosError ? error.response.data.message : error.message)
  }
  loading.value = false
}

watch(
  () => route,
  (newVal) => {
    console.log(newVal.query)

    getProducts(newVal.query)
  },
  { immediate: true, deep: true }
)
</script>
