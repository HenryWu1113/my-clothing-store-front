<template>
  <div class="outfit-page myContainer min-h-screen">
    <div class="outfit-imgs-wrap">
      <div class="secondary-img-wrap">
        <div
          class="img-wrap"
          v-for="(imgSrc, idx) in outfit.images"
          :key="imgSrc"
          @click="selectedImage = imgSrc"
          :style="amimationDelay(idx)"
        >
          <img :src="imgSrc" />
        </div>
      </div>
      <div class="main-img-wrap">
        <img :src="selectedImage" />
      </div>
    </div>
    <div class="outfit-info-wrap">
      <div class="clerk-info-wrap" @click="$router.push(`/outfits/${outfit.clerk._id}`)">
        <div class="img-wrap">
          <img v-if="outfit.clerk.avatar" :src="outfit.clerk.avatar" />
          <img v-else :src="`https://source.boringavatars.com/beam/160/${outfit.clerk._id}`" />
        </div>
        <div class="clerk-info">
          <div class="name">{{ outfit.clerk.name }}</div>
          <div class="store" @click.stop="$router.push(`/store/${outfit.clerk.store._id}`)">
            {{ outfit.clerk.store.name }} >
          </div>
          <!-- <div class="store">{{ outfit.clerk.introduce ?? '這個人自我介紹什麼都沒寫唷!!' }}</div> -->
        </div>
      </div>
      <div class="outfit-description">
        {{ outfit.description }}
      </div>
      <div class="outfit-updatedAt">更新日期 : {{ formatTime(outfit.updatedAt, true) }}</div>
      <div class="outfit-products-wrap">
        <div class="title">穿搭單品</div>
        <div class="products">
          <div
            class="product-list"
            v-for="(product, idx) in outfit.products"
            :key="product._id"
            @click="$router.push(`/product/${productInfo(product.product, '_id')}`)"
            :style="amimationDelay(idx)"
          >
            <div class="img-wrap">
              <img :src="firstProductImg(product.product)" />
            </div>
            <div class="product-info">
              <div class="name">{{ productInfo(product.product, 'name') }}</div>
              <div class="size">尺寸 : {{ product.size.name }}</div>
              <div class="color">顏色 : {{ product.color.name }}</div>
              <div class="color-ball" :style="{ background: product.color.key }"></div>
              <div class="price">
                <p v-if="productInfo(product.product, 'discountRate') !== 0">
                  <del>NT$ {{ numberToCommaString(productInfo(product.product, 'price')) }}</del>
                </p>
                <p>
                  NT$
                  {{
                    numberToCommaString(
                      productInfo(product.product, 'price') *
                        ((100 - productInfo(product.product, 'discountRate')) / 100)
                    )
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="go-back-btn">
        <n-button type="info" ghost @click="$router.go(-1)"> 上一頁 </n-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';
.outfit-page {
  display: flex;
  gap: 10px;
  .outfit-imgs-wrap {
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
        @extend %AshowEffect;
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

  .outfit-info-wrap {
    width: 40%;
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;

    .clerk-info-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      padding-bottom: 1rem;
      border-bottom: 1px solid $border-color;
      .img-wrap {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;
        > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .clerk-info {
        display: flex;
        flex-direction: column;
        font-size: 1rem;
        font-weight: bold;
        .name {
          color: $text-color2;
        }
        .store {
          color: $text-color;
          transition: 0.2s;
          &:hover {
            border-bottom: 1px solid $text-color;
          }
        }
      }
    }

    .outfit-description,
    .outfit-updatedAt {
      font-size: 1rem;
      color: $text-color2;
    }

    .outfit-products-wrap {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      > .title {
        font-size: 1.5rem;
        font-weight: bold;
        color: $text-color;
      }
      > .products {
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
            .color-ball {
              width: 20px;
              height: 20px;
              border-radius: 50%;
            }
            .price {
              margin-top: auto;
              font-size: 1.5rem;
              font-weight: bold;
              color: $text-color;
            }
          }
        }
      }
    }
    .go-back-btn {
      > .n-button {
        width: 100%;
        --n-font-size: 18px !important;
        --n-height: 50px !important;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref, shallowRef, computed, watch, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage, useLoadingBar } from 'naive-ui'
import { api } from '@/plugins/axios'
import type { IOutfit, IProduct } from '@/types'
import { numberToCommaString, compareObjects, formatTime } from '@/composables'

const message = useMessage()
const loadingBar = useLoadingBar()
const route = useRoute()
const router = useRouter()

const outfit = ref<IOutfit>({
  _id: '',
  outfitName: '',
  description: '',
  clerk: {
    avatar: undefined,
    height: undefined,
    weight: undefined,
    sex: '男',
    _id: '',
    name: undefined,
    store: {
      _id: '',
      name: ''
    },
    introduce: undefined
  },
  images: [],
  products: [],
  show: true,
  createdAt: '',
  updatedAt: ''
})
const selectedImage = ref<string>('')

console.log(route.params.id)

async function getOutfit() {
  try {
    loadingBar.start()
    const { data } = await api().get(`/outfits/${route.params.id}`)
    console.log('穿搭資訊', data)
    outfit.value = data.result
    selectedImage.value = outfit.value.images[0]
    loadingBar.finish()
  } catch (error: any) {
    loadingBar.error()
    message.error(error.isAxiosError ? error.response.data.message : error.message)
    console.log(error)
    router.go(-1)
  }
}
getOutfit()

/** 回傳商品第一張圖(不知為什麼定義好 type 還找不到型別...) */
function firstProductImg(product: any) {
  return product.images[0]
}

/** 回傳商品資訊(不知為什麼定義好 type 還找不到型別...) */
function productInfo(product: any, key: string) {
  return product[key]
}

function amimationDelay(idx: number) {
  return { animationDelay: `${idx * 0.1}s` }
}
</script>
