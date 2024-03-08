<template>
  <div class="product-page myContainer">
    <div class="product-selection-wrap">
      <div class="product-imgs-wrap">
        <div class="secondary-img-wrap">
          <div
            class="img-wrap"
            v-for="imgSrc in product.images"
            :key="imgSrc"
            @click="productForm.selectedImage = imgSrc"
          >
            <img :src="imgSrc" />
          </div>
        </div>
        <div class="main-img-wrap">
          <img :src="productForm.selectedImage" />
        </div>
      </div>
      <div class="product-info-wrap">
        <div class="product-tags">
          <div v-for="tag in product.tags" :key="tag">#{{ tag }}</div>
        </div>
        <div class="product-name">{{ product.name }}</div>
        <div class="product-price">NT$ {{ numberToCommaString(product.price) }}</div>
        <div class="product-color">
          <div class="title">顏色 : {{ productForm.color }}</div>
          <n-radio-group v-model:value="productForm.color" name="color">
            <n-radio
              :style="radioStyle(productForm.color)"
              v-for="color in product.colors"
              :key="color"
              :value="color"
              :label="color"
            />
          </n-radio-group>
        </div>
        <div class="product-size">
          <div class="title">尺寸 : {{ productForm.size }}</div>
          <n-radio-group v-model:value="productForm.size" name="size">
            <n-radio v-for="size in filterSizeSort()" :key="size" :value="size" :label="size" />
          </n-radio-group>
        </div>
        <div class="product-quantity">
          <n-select v-model:value="productForm.quantity" :options="quantityArr" />
        </div>
        <div class="add-cart-wrap">
          <n-button type="warning" :loading="productForm.loading" ghost @click="addCart()"
            >加入購物車</n-button
          >
        </div>
        <div class="go-back-btn" @click="$router.go(-1)">
          <n-icon :component="ArrowUndoOutline"></n-icon>
        </div>
      </div>
    </div>
    <div class="product-outfits-wrap">
      <div class="outfit-title">店員穿搭</div>
      <swiper
        :slidesPerView="3"
        :spaceBetween="20"
        :navigation="true"
        :pagination="{
          clickable: true
        }"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide v-for="outfit in outfits" :key="outfit._id">
          <div class="outfit-card">
            <img :src="outfit.images[0]" alt="" />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';
.product-page {
  display: flex;
  flex-direction: column;
  gap: 5rem;
  .product-selection-wrap {
    display: flex;
    gap: 10px;

    .product-imgs-wrap {
      width: 60%;
      display: flex;
      gap: 10px;

      .secondary-img-wrap {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-direction: column;
        width: 150px;
        .img-wrap {
          width: 150px;
          height: 150px;
          cursor: pointer;
          > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
      .main-img-wrap {
        width: calc(100% - 150px);
        display: flex;
        justify-content: center;
        align-items: flex-start;
        > img {
          width: 100%;
          object-fit: contain;
        }
      }
    }

    .product-info-wrap {
      width: 40%;
      padding-left: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding-top: 1rem;
      position: relative;
      .product-tags {
        display: flex;
        color: $text-color;
        gap: 5px;
        pointer-events: none;
        > div {
          padding: 2px 10px;
          border: 1px solid $border-color;
          border-radius: 3px;
        }
      }
      .product-name {
        font-size: 2rem;
        color: $text-color;
      }
      .product-price {
        font-size: 2rem;
        color: $text-color;
        font-weight: bolder;
      }
      .product-color {
        margin-top: 2rem;
      }
      .product-color,
      .product-size {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        .title {
          color: $text-color;
          font-size: 1rem;
        }

        .n-radio {
          --n-font-size: 18px !important;
          --n-radio-size: 20px !important;
        }
      }
      .product-quantity {
        :deep(.n-select) {
          > .n-base-selection {
            --n-font-size: 1rem !important;
            --n-height: 40px !important;
            width: 250px;
          }
        }
      }

      .add-cart-wrap {
        > .n-button {
          width: 100%;
          --n-font-size: 18px !important;
          --n-height: 50px !important;
        }
      }
      .go-back-btn {
        position: absolute;
        top: 0;
        right: 0;
        color: $text-color;
        font-size: 2rem;
        cursor: pointer;
      }
    }
  }
  .product-outfits-wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .outfit-title {
      font-size: 18px;
      color: $text-color;
      font-weight: bold;
    }
    .mySwiper {
      width: 480px;
      // height: 300px;
      margin: 0;
      .swiper-slide {
        padding-bottom: 2rem;
        .outfit-card {
          border: 1px solid $text-color;
          height: 240px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref, reactive, computed, watch, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { api } from '@/plugins/axios'
import type { IProduct, IOutfit } from '@/types'
import { numberToCommaString } from '@/composables'
import { useUserStore } from '@/stores/user'
import { ArrowUndoOutline } from '@vicons/ionicons5'

import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'

const modules = [Pagination, Navigation]

const user = useUserStore()
const message = useMessage()
const route = useRoute()
const router = useRouter()

/** radio style */
const radioStyle = (color: string) => {
  return `--n-box-shadow-active: inset 0 0 0 1px ${color}; --n-dot-color-active: ${color};--n-box-shadow-hover:inset 0 0 0 1px ${color};
  --n-box-shadow-focus:inset 0 0 0 1px ${color}, 0 0 0 2px rgba(24, 160, 88, 0.2)`
}

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

/** 穿搭 */
const outfits: Ref<IOutfit[]> = ref([])

const productForm = ref({
  quantity: 1,
  color: '',
  size: '',
  selectedImage: '',
  loading: false
})

/** 商品可選擇的數量 */
const quantityArr = Array.from({ length: 10 }, (value: any, idx: number) => ({
  label: String(idx + 1),
  value: idx + 1
}))

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
    outfits.value = data.result
  } catch (error) {
    message.error('找不到商品')
    console.log(error)
    router.go(-1)
  }
}

/** 避免 sizes 當初勾選的順序不一 */
const filterSizeSort = () => {
  return product.value.sizes.sort((a: any, b: any) => {
    const sortArr = ['XS', 'S', 'M', 'L', 'XL']
    if (sortArr.indexOf(a) > sortArr.indexOf(b)) return 1
    else return -1
  })
}

/** 加入購物車 */
async function addCart() {
  if (productForm.value.color === '') {
    return message.warning('未選擇顏色')
  }
  if (productForm.value.size === '') {
    return message.warning('未選擇尺寸')
  }

  const query = {
    product: product.value._id,
    quantity: productForm.value.quantity,
    color: productForm.value.color,
    size: productForm.value.size
  }

  try {
    productForm.value.loading = true
    await user.addCart(query)
    message.success('已加入購物車')
  } catch (error) {
    console.log(error)
    message.error('加入購物車失敗')
  }
  productForm.value.loading = false
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
