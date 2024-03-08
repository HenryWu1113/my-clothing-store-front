<template>
  <div class="product-page myContainer min-h-screen">
    <div class="product-imgs-wrap">
      <div class="main-img-wrap">
        <img :src="productForm.selectedImage">
      </div>
      <div class="secondary-img-wrap">
        <img :src="imgSrc" v-for="imgSrc in product.images" :key="imgSrc">
      </div>
    </div>
    <div class="product-info-wrap">
      <div class="product-name"></div>
      <div class="product-price"></div>
      <div class="product-color"></div>
      <div class="product-size"></div>
      <n-input-number :min="1" v-model:value="productForm.quantity" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';

.product-page {
  display: flex;
  gap: 10px;

  .product-imgs-wrap {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    .main-img-wrap {
      >img {
        max-width: 100%;
      }
    }

    .secondary-img-wrap {
      display: flex;
      align-items: center;
      gap: 10px;

      >img {
        width: calc((100% - 20px)/3);
        object-fit: cover;
      }
    }
  }

  .product-info-wrap {
    width: 50%;
  }
}
</style>

<script setup lang="ts">
import { ref, computed, watch, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { api } from '@/plugins/axios'
import type { IProduct } from '@/types'

const message = useMessage()
const route = useRoute()
const router = useRouter()

/** 商品 */
const product: Ref<IProduct> = ref({
  clothingGender: 'male',
  clothingPart: 'shirts',
  colors: [],
  createdAt: '',
  description: '',
  discountRate: 0,
  images: [],
  name: '',
  price: 0,
  ratings: [],
  sell: true,
  sizes: [],
  soldQuantity: 0,
  stockQuantity: 0,
  tags: [],
  updatedAt: '',
  _id: ''
})

const productForm = ref({
  product: '',
  quantity: 1,
  color: '',
  size: '',
  selectedImage: ''
})

async function getProduct() {
  try {
    const { data } = await api().get(`/products/${route.params.id}`)
    console.log('商品資訊', data)
    product.value = data.result
    productForm.value.selectedImage = product.value.images[0]
  } catch (error) {
    message.error('找不到商品')
    console.log(error)
    router.go(-1)
  }
}

async function getRatings() {
  try {
    const { data } = await api().get(`/ratings/product/${route.params.id}`)
    console.log('商品所有評分', data)
  } catch (error) {
    message.error('找不到商品')
    console.log(error)
    router.go(-1)
  }
}

async function getRelatedOutfits() {
  try {
    const { data } = await api().get(`/outfits/related/${route.params.id}`)
    console.log('相關穿搭', data)
  } catch (error) {
    message.error('找不到商品')
    console.log(error)
    router.go(-1)
  }
}

watch(
  () => route.path,
  () => {
    getProduct()
    getRatings()
    getRelatedOutfits()
  },
  { immediate: true }
)
</script>
