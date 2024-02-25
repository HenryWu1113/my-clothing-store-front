<template>
  <div class="product-card">
    <div class="product-img-wrap">
      <img :src="product.images[0]" alt="" />
      <n-icon v-if="isFavorite" :component="HeartSharp"></n-icon>
      <n-icon v-else :component="HeartOutline"></n-icon>
    </div>
    <div class="product-info">
      <div class="product-colors">
        <div
          v-for="color in product.colors"
          :key="color"
          :style="{ background: color, border: color === 'white' ? '1px solid black' : '' }"
        ></div>
      </div>
      <div class="product-name">{{ product.name }}</div>
      <div class="product-price">NT. {{ numberToCommaString(product.price) }}</div>
      <div class="product-rate">
        <n-rate readonly :value="rateValue" />
        <p>({{ product.ratings.length }})</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';
.product-card {
  border-radius: 3px;
  border: 1px solid $light1;
  cursor: pointer;
  .product-img-wrap {
    position: relative;
    height: 75%;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    > .n-icon {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
      color: red;
      font-size: 1.8rem;
    }
  }
  .product-info {
    height: 25%;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    gap: 0.2rem;
    overflow-y: auto;
    .product-colors {
      display: flex;
      gap: 0.5rem;
      > div {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: violet;
      }
    }
    .product-name {
      font-size: 1.2rem;
      font-weight: bold;
    }
    .product-price {
      font-size: 1.2rem;
    }
    .product-rate {
      display: flex;
      align-items: center;
      > p {
        padding-top: 2px;
        margin-left: 0.5rem;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref, computed, watch, type Ref } from 'vue'
import { useMessage } from 'naive-ui'
import { HeartOutline, HeartSharp } from '@vicons/ionicons5'
import { Filter } from '@vicons/fa'
import { useRouter, useRoute } from 'vue-router'
import type { IProduct } from '@/types'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { numberToCommaString } from '@/composables/index'

const { favorites } = storeToRefs(useUserStore())

const props = defineProps({
  product: {
    type: Object as () => IProduct,
    required: true
  }
})

const rateValue = computed(() => {
  return props.product.ratings.reduce((acc: any, curr: number) => acc + curr, 0)
})

const isFavorite = computed(() => {
  return favorites.value.findIndex((item: any) => item._id === props.product._id) !== -1
})

console.log(props.product)
</script>
