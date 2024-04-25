<template>
  <div class="products-view myContainer min-h-screen">
    <div class="product-top">
      <img src="../assets/images/categoryTopImage.jpg" alt="" />
    </div>
    <div class="slogan">精選商品分類</div>
    <div class="product-filter-wrap">
      <div class="sort-btn-wrap">
        <div
          v-for="btnInfo in filterSortBtns"
          :class="['sort-btn', selectSortValue === btnInfo.value ? 'active' : '']"
          :key="btnInfo.value"
          @click="selectSort(btnInfo.value)"
        >
          <p>{{ btnInfo.text }}</p>
          <n-icon v-if="btnInfo.icon" :component="btnInfo.icon"></n-icon>
        </div>
      </div>
      <n-space align="center">
        <n-switch v-model:value="disabled" />
        <n-input-number
          class="price-input"
          v-model:value="priceRange.gte"
          :validator="(x: number) => x < priceRange.lte"
          :disabled="!disabled"
          :min="0"
        />
        <n-input-number
          class="price-input"
          v-model:value="priceRange.lte"
          :validator="(x: number) => x > priceRange.gte"
          :disabled="!disabled"
          :min="1"
        />
        <n-input
          class="query-input"
          v-model:value="keyword"
          type="text"
          placeholder="請輸入商品名"
          clearable
        />
        <n-button @click="advanceSearch()">確認</n-button>
      </n-space>
    </div>
    <div class="product-wrap">
      <template v-if="loading">
        <n-skeleton
          v-for="item in Array.from({ length: 20 }, (_, idx) => idx)"
          :key="item"
          :sharp="false"
          size="medium"
        />
      </template>
      <ProductCard
        v-else-if="!loading && products.length > 0"
        v-for="(product, idx) in products"
        :key="product._id"
        :idx="idx"
        :product="product"
        @click="$router.push(`product/${product._id}`)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';

.products-view {
  > .product-top {
    > img {
      width: 100%;
    }
  }

  .slogan {
    padding: 2rem;
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    color: $text-color;
  }

  .product-filter-wrap {
    border: 1px solid $border-color;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    @include xxl {
      flex-direction: column;
    }
    .sort-btn-wrap {
      display: flex;
      align-items: center;
      gap: 10px;

      .sort-btn {
        font-size: 1rem;
        color: $text-color;
        border: 1px solid $text-color;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;

        &.active {
          border: 1px solid rgb(122, 176, 194);
          font-weight: bold;
          //background: rgb(182, 205, 214);
          color: rgb(122, 176, 194);
        }
      }
    }

    .price-input {
      --n-font-size: 1rem !important;
      width: 120px;
    }
    .query-input {
      --n-font-size: 1rem !important;
      width: 150px;
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

      @include lg {
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
import { Filter } from '@vicons/fa'
import { useRouter, useRoute } from 'vue-router'
import type { IProduct } from '@/types'
import queryString from 'query-string'
import { ArrowUpOutlined, ArrowDownOutlined } from '@vicons/antd'
import _ from 'lodash'

import ProductCard from '@/components/cards/ProductCard.vue'

const message = useMessage()
const route = useRoute()
const router = useRouter()

const loading = ref(false)

const disabled = ref(false)
const keyword = ref('')
const priceRange = ref({
  gte: 0,
  lte: 1000
})

const sortBtnsInfo = shallowRef([
  {
    value: 'integrate',
    text: '綜合排序',
    icon: null
  },
  {
    value: 'latest',
    text: '新上市',
    icon: null
  },
  {
    value: 'price',
    text: '價格排序',
    icon: null
  },
  {
    value: 'LtoH',
    text: '價格由低至高',
    icon: ArrowUpOutlined
  },
  {
    value: 'HtoL',
    text: '價格由高至低',
    icon: ArrowDownOutlined
  }
])

const selectSortValue = ref('integrate')

const products: Ref<IProduct[]> = ref([])

/**
 * 取商品
 * @param queryObj
 */
async function getProducts(queryObj: Record<string, any>) {
  const str = queryString.stringify(queryObj)
  console.log(str)
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

/**
 * 選擇商品排序
 */
function selectSort(value: string) {
  if (value === 'price') selectSortValue.value = 'LtoH'
  else if (value === 'LtoH') selectSortValue.value = 'HtoL'
  else if (value === 'HtoL') selectSortValue.value = 'LtoH'
  else selectSortValue.value = value

  console.log(selectSortValue.value)
  const queryObj = {
    ...route.query,
    sort: selectSortValue.value
  }
  const str = queryString.stringify(queryObj)
  router.push(`/products?${str}`)
}

/**
 * 進階搜尋，價格區間及關鍵字查詢
 */
function advanceSearch() {
  const queryObj = {
    ...route.query
  }
  // 有關鍵字就加入 query 沒有則刪除
  if (keyword.value !== '') {
    queryObj.q = keyword.value
  } else {
    delete queryObj.q
  }
  // 允許價格區間就加入 query 沒有則刪除
  if (disabled.value) {
    queryObj.gte = String(priceRange.value.gte)
    queryObj.lte = String(priceRange.value.lte)
  } else {
    delete queryObj.gte
    delete queryObj.lte
  }
  const str = queryString.stringify(queryObj)
  router.push(`/products?${str}`)
}

function resetFilter() {
  priceRange.value = {
    gte: 0,
    lte: 1000
  }
  disabled.value = false
  keyword.value = ''
  selectSortValue.value = 'integrate'
}

/** 排序按鈕顯示情況 */
const filterSortBtns = computed(() => {
  return sortBtnsInfo.value.filter((item) => {
    if (['integrate', 'latest'].includes(item.value)) return true
    if (item.value === 'price' && !['LtoH', 'HtoL'].includes(selectSortValue.value)) return true
    if (item.value === 'LtoH' && selectSortValue.value === 'LtoH') return true
    if (item.value === 'HtoL' && selectSortValue.value === 'HtoL') return true
  })
})

watch(
  () => _.cloneDeep(route.query),
  (newVal, oldVal) => {
    console.log(newVal)

    if (newVal.clothingGender !== oldVal?.clothingGender) {
      resetFilter()
    }

    getProducts(newVal)
  },
  { immediate: true, deep: true }
)
</script>
