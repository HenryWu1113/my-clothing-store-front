<template>
  <div class="myContainer min-h-screen">
    <div class="product-imgs-wrap">
      <div class="main-img-wrap"></div>
      <div class="secondary-img-wrap"></div>
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

<style scoped lang="scss"></style>

<script setup lang="ts">
import { ref, computed, watch, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { api } from '@/plugins/axios'

const message = useMessage()
const route = useRoute()
const router = useRouter()

const productForm = ref({
  product: '',
  quantity: 1,
  color: '',
  size: ''
})

async function getProduct() {
  try {
    const { data } = await api().get(`/products/${route.params.id}`)
    console.log('商品資訊', data)
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
