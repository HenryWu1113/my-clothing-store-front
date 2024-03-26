<template>
  <div :class="['order-page', 'myContainer', pageHeight]">
    <div class="title">
      <p>訂單查詢</p>
      <div v-if="page === PAGE.detail" class="go-back-btn" @click="$router.go(-1)">
        <n-icon :component="ArrowUndoOutline"></n-icon>
      </div>
    </div>
    <MydataTable
      v-if="page === PAGE.overview"
      :tableData="orders"
      :tableMinWidth="tableSetting.tableMinWidth"
      :tableSetting="tableSetting.tableSetting"
      :tableColumnWidth="tableSetting.tableColumnWidth"
      :loading="tableSetting.isLoading"
      :tdHeight="60"
    >
      <template #td3="{ value }">
        <div>NT. {{ value }}</div>
      </template>
      <template #td4="{ value }">
        <div>{{ formatTime(value) }}</div>
      </template>
      <template #td5="{ value }">
        <div>
          <n-button class="detail-btn" ghost @click="goOrderDetail(value)">訂單資訊</n-button>
        </div>
      </template>
    </MydataTable>

    <template v-else-if="page === PAGE.detail">
      <n-skeleton v-if="loading" :sharp="false" size="medium" />
      <div class="order-detail-wrap" v-else>
        <div class="order-info-wrap">
          <div class="order-title">訂單資訊</div>
          <div class="order-info">
            <p>訂單編號</p>
            <p>{{ currentOrder._id }}</p>
          </div>
          <div class="order-info">
            <p>訂單日期</p>
            <p>{{ formatTime(currentOrder.createdAt) }}</p>
          </div>
          <div class="order-info">
            <p>訂單狀態</p>
            <p>{{ currentOrder.orderStatus }}</p>
          </div>
          <div class="order-info">
            <p>取貨方式</p>
            <p>{{ currentOrder.deliveryMethod }}</p>
          </div>
        </div>
        <div class="product-lists-wrap">
          <div
            class="product-list"
            v-for="(product, idx) in currentOrder.products"
            :key="product._id"
            @click="$router.push(`/product/${product.product._id}`)"
            :style="amimationDelay(idx)"
          >
            <div class="img-wrap">
              <img :src="firstProductImg(product.product)" />
            </div>
            <div class="product-info">
              <div class="name">{{ product.product.name }}</div>
              <div class="size">尺寸 : {{ product.size }}</div>
              <div class="color">顏色 : {{ product.color }}</div>
              <div class="color">數量 : {{ product.quantity }}</div>
              <div class="price">NT. {{ numberToCommaString(product.price) }}</div>
            </div>
          </div>
        </div>
        <div class="order-info-wrap">
          <div class="order-title">收貨人資訊</div>
          <div class="order-info">
            <p>姓名</p>
            <p>{{ currentOrder.recipientName }}</p>
          </div>
          <div class="order-info">
            <p>電話</p>
            <p>{{ currentOrder.recipientPhone }}</p>
          </div>
          <div class="order-info">
            <p>地址</p>
            <p>{{ currentOrder.recipientAddress }}</p>
          </div>
          <div v-if="currentOrder.recipientEmail" class="order-info">
            <p>信箱</p>
            <p>{{ currentOrder.recipientEmail }}</p>
          </div>
        </div>
        <div class="order-info-wrap">
          <div class="order-title">付款資訊</div>
          <div class="order-info">
            <p>付款方式</p>
            <p>{{ currentOrder.payMethod }}</p>
          </div>
          <div class="order-info">
            <p>商品金額</p>
            <p>
              NT. {{ numberToCommaString(currentOrder.totalAmount - currentOrder.deliveryFee) }}
            </p>
          </div>
          <div v-if="currentOrder.deliveryFee !== 0" class="order-info">
            <p>運費</p>
            <p>NT. {{ numberToCommaString(currentOrder.deliveryFee) }}</p>
          </div>
          <div class="order-info total-amount">
            <p>總價</p>
            <p>NT. {{ numberToCommaString(currentOrder.totalAmount) }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';

.order-page {
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
    align-items: center;
    .n-icon {
      cursor: pointer;
    }
  }

  .detail-btn {
    --n-font-size: 1rem !important;
  }

  .order-detail-wrap {
    border: 1px solid $border-color;
    padding: 0 1rem;
    > div:not(:first-child) {
      border-top: 1px solid $border-color;
    }
    .order-info-wrap {
      display: flex;
      flex-direction: column;
      gap: 5px;
      color: $text-color;
      padding: 1rem 0;
      .order-title {
        font-size: 1.5rem;
        font-weight: bold;
      }
      .order-info {
        display: flex;
        align-items: center;
        gap: 10px;
        > p {
          &:first-child {
            font-weight: bold;
            width: 150px;
            font-size: 1.1rem;
          }
          &:last-child {
            font-size: 1rem;
          }
        }
        &.total-amount {
          > p:last-child {
            color: red;
            font-weight: bold;
            font-size: 1.2rem;
          }
        }
      }
    }

    .product-lists-wrap {
      display: flex;
      flex-direction: column;
      .product-list {
        display: flex;
        padding: 1rem 0;
        cursor: pointer;
        gap: 1rem;
        @extend %AshowEffect;
        &:not(:first-child) {
          border-top: 1px solid $border-color;
        }
        .img-wrap {
          width: 180px;
          height: 180px;
          > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .product-info {
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: calc(100% - 180px - 1rem);
          .name {
            font-size: 1.2rem;
            font-weight: bold;
            color: $text-color;
          }
          .size,
          .color {
            font-size: 1rem;
            font-weight: bold;
            color: $text-color2;
          }
          .price {
            margin-top: auto;
            font-size: 1.1rem;
            font-weight: bold;
            color: $text-color;
            align-self: flex-end;
          }
        }
      }
    }
  }

  .n-skeleton {
    height: 70vh !important;
  }
}
</style>

<script setup lang="ts">
import { ref, reactive, computed, watch, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { api } from '@/plugins/axios'
import { numberToCommaString, compareObjects, formatTime } from '@/composables'
import type { IOrder } from '@/types'
import { ArrowUndoOutline, Pencil, EllipsisVerticalSharp } from '@vicons/ionicons5'

import MydataTable from '@/components/dataTable/dataTable.vue'

const message = useMessage()
const route = useRoute()
const router = useRouter()

enum PAGE {
  overview = 1,
  detail = 2
}

const orders = ref<IOrder[]>([])
const page = ref(PAGE.overview)

const loading = ref(false)

const currentOrder = ref<IOrder>({
  _id: '',
  user: '',
  deliveryFee: 0,
  deliveryMethod: '',
  orderStatus: '',
  payMethod: '',
  payStatus: '',
  products: [],
  recipientAddress: '',
  recipientName: '',
  recipientPhone: '',
  sendStatus: '',
  totalAmount: 0,
  updatedAt: '',
  createdAt: ''
})

/** 生成圖表框架的設定 */
const tableSetting: Ref<{
  isLoading: boolean
  tableMinWidth: number
  tableColumnWidth: number[]
  tableSetting: { order: number; key: string; title: string; sortable: boolean }[]
}> = ref({
  isLoading: false,
  tableMinWidth: 800,
  tableColumnWidth: [],
  tableSetting: [
    {
      order: 1,
      key: '_id',
      title: '訂單編號',
      sortable: false
    },
    {
      order: 2,
      key: 'orderStatus',
      title: '訂單狀態',
      sortable: true
    },
    {
      order: 3,
      key: 'totalAmount',
      title: '訂單金額',
      sortable: true
    },
    {
      order: 4,
      key: 'createdAt',
      title: '訂單日期',
      sortable: true
    },
    {
      order: 5,
      key: '_id',
      title: '詳細資訊',
      sortable: false
    }
  ]
})

function goOrderDetail(id: string) {
  router.push(`/order/${id}`)
  page.value = PAGE.detail
}

async function getOrders() {
  try {
    const { data } = await api('auth').get('/orders')
    orders.value = data.result
    console.log(data)
  } catch (error: any) {
    message.error(error.isAxiosError ? error.response.data.message : error.message)
  }
}

async function getOrder() {
  try {
    loading.value = true
    const { data } = await api('auth').get(`/orders/user/${route.params.id}`)
    currentOrder.value = data.result
    console.log(currentOrder.value)
  } catch (error: any) {
    message.error(error.isAxiosError ? error.response.data.message : error.message)
  }
  loading.value = false
}

/** 回傳商品第一張圖(不知為什麼定義好 type 還找不到型別...) */
function firstProductImg(product: any) {
  return product.images[0]
}

function amimationDelay(idx: number) {
  return { animationDelay: `${idx * 0.1}s` }
}

watch(
  route,
  () => {
    if (route.path === '/order') {
      getOrders()
      currentOrder.value = {
        _id: '',
        user: '',
        deliveryFee: 0,
        deliveryMethod: '',
        orderStatus: '',
        payMethod: '',
        payStatus: '',
        products: [],
        recipientAddress: '',
        recipientName: '',
        recipientPhone: '',
        sendStatus: '',
        totalAmount: 0,
        updatedAt: '',
        createdAt: ''
      }
      page.value = PAGE.overview
    } else {
      page.value = PAGE.detail
      getOrder()
    }
  },
  { immediate: true }
)

const pageHeight = computed(() => {
  if (page.value === PAGE.overview) return 'h-screen'
  else if (page.value === PAGE.detail) return 'min-h-screen'
  else return ''
})
</script>
