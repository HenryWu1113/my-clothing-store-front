<template>
  <div class="product-card">
    <div class="product-img-wrap">
      <img :src="product.images[0]" alt="" />
    </div>
    <div class="product-info">
      <div class="product-colors">
        <div
          v-for="color in product.colors"
          :key="color"
          :style="{ background: color, border: color === 'white' ? '1px solid black' : '' }"
        >
          <div :style="{ background: color }"></div>
        </div>
      </div>
      <div class="product-name">{{ product.name }}</div>
      <div class="product-price">NT. {{ numberToCommaString(product.price) }}</div>
      <div class="product-rate">
        <n-rate readonly :title="rateValue" allow-half :value="rateValue" />
        <p>({{ product.ratings.length }})</p>
        <n-icon
          @click.stop="editFavorite(product._id)"
          v-if="isFavorite"
          :component="HeartSharp"
        ></n-icon>
        <n-icon @click.stop="editFavorite(product._id)" v-else :component="HeartOutline"></n-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';
.product-card {
  border-radius: 10px;
  // border: 1px solid $border-color;
  box-shadow: 0px 0px 5px $border-color;
  overflow: hidden;
  cursor: pointer;
  .product-img-wrap {
    position: relative;
    height: calc(100% - 160px);
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .product-info {
    height: 160px;
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
        position: relative;
        &::before {
          content: '';
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: $bg-color;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        > div {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .product-name {
      height: 60px;
      font-size: 1.2rem;
      font-weight: bold;
      color: $text-color;
    }
    .product-price {
      font-size: 1.2rem;
      color: $text-color;
    }
    .product-rate {
      display: flex;
      align-items: center;
      > p {
        padding-top: 2px;
        margin-left: 0.5rem;
        margin-right: auto;
        color: $text-color;
      }
      > .n-icon {
        color: red;
        font-size: 1.5rem;
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
import { api } from '@/plugins/axios'

const message = useMessage()
const { favorites } = storeToRefs(useUserStore())
const { editFav } = useUserStore()

const props = defineProps({
  product: {
    type: Object as () => IProduct,
    required: true
  }
})

async function editFavorite(product_Id: string) {
  try {
    const data = await editFav(product_Id)
    message.success(data?.message)
  } catch (error: any) {
    message.error(error.isAxiosError ? error.response.data.message : error.message)
  }
}

const rateValue = computed(() => {
  console.log(
    props.product.ratings.reduce((acc: any, curr: any) => acc + curr.score, 0) /
      props.product.ratings.length
  )
  return (
    props.product.ratings.reduce((acc: any, curr: any) => acc + curr.score, 0) /
    props.product.ratings.length
  )
})

const isFavorite = computed(() => {
  return favorites.value.includes(props.product._id)
})

console.log(props.product)
</script>
