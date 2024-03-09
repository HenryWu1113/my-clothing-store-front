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
    <div class="product-outfits-wrap" v-if="outfits.length > 0">
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
          <div class="outfit-card" @click="$router.push(`/outfit/${outfit._id}`)">
            <div class="outfit-img">
              <img :src="outfit.images[0]" />
            </div>
            <div class="clerk-info-wrap">
              <div class="avatar-img">
                <img :src="outfit.clerk.avatar" />
              </div>
              <div class="clerk-info">
                <div>{{ outfit.clerk.name }}</div>
                <div>{{ outfit.clerk.height }} cm</div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="product-info-wrap">
      <n-tabs type="segment" animated default-value="productRating">
        <n-tab-pane name="productInfo" tab="商品資訊">
          <div class="product-description-wrap">
            <div>
              <div class="description-title">商品說明</div>
              <div class="description-body">{{ product.description }}</div>
            </div>
            <div>
              <div class="description-title">商品尺寸</div>
              <div class="description-body">
                <div>
                  《注意事項》
                  <br />※ 商品物質特性不同，可能會有約1-2cm前後的誤差。 <br />※
                  網路商店尺寸表標示為「實際商品平量尺寸(商品尺寸)」，商品吊牌標示之尺寸則為「適穿身形尺寸(裸身測量)」，兩者標示數值恐略有不同，選購前敬請留意。
                  ※「商品尺寸」為實際測量商品時的尺寸。 <br />※
                  依據商品款式、版型、材質、設計等，同樣尺寸於不同商品可能會有所差異。 <br />※
                  有折縫的商品，是將商品折縫攤開後所測量的尺寸。
                </div>
                <img src="../assets/images/sizesImage.jpg" />
              </div>
            </div>
          </div>
        </n-tab-pane>
        <n-tab-pane display-directive="show" name="productRating" tab="評論">
          <div class="product-rating-wrap">
            <div class="rating-score-wrap">
              <div>
                <div v-for="rating in ratingsBarsInfo" :key="rating.score">
                  <p>{{ rating.score }}</p>
                  <div class="rating-bar">
                    <div :style="{ width: `${rating.width}%` }"></div>
                  </div>
                </div>
              </div>
              <div>
                <div class="score">{{ avgScore.toFixed(1) }}</div>
                <n-rate size="large" readonly :title="avgScore" allow-half :value="avgScore" />
                <div class="comment-amount">{{ ratings.length }} 篇評論</div>
              </div>
              <div>
                <n-button
                  size="large"
                  v-if="true"
                  round
                  type="warning"
                  ghost
                  @click="commentModal.onOpen()"
                >
                  <template #icon>
                    <n-icon :component="Pencil"> </n-icon>
                  </template>
                  {{ Object.keys(myRating).length === 0 ? '新增評論' : '編輯評論' }}
                </n-button>
                <CommentModal
                  :productName="product.name"
                  :productId="product._id"
                  :myRating="myRating"
                  @update="getRatings()"
                />
              </div>
            </div>
          </div>
        </n-tab-pane>
      </n-tabs>
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
      width: 510px;
      margin: 0;
      .swiper-slide {
        padding-bottom: 2rem;
        .outfit-card {
          border: 1px solid $border-color;
          border-radius: 3px;
          height: 270px;
          cursor: pointer;
          .outfit-img {
            height: calc(100% - 50px);
            > img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .clerk-info-wrap {
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.5rem;
            .avatar-img {
              width: 34px;
              height: 34px;
              border-radius: 50px;
              overflow: hidden;
              > img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .clerk-info {
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              gap: 3px;
              font-size: 12px;
              line-height: 12px;
              text-align: end;
              color: $text-color2;
            }
          }
        }
      }
    }
  }

  .product-info-wrap {
    .n-tabs {
      --n-tab-font-size: 1rem !important;
      .n-tab-pane {
        .product-description-wrap {
          font-size: 1rem;
          color: $text-color2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          > div {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            .description-title {
              padding: 5px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: $border-color;
              font-size: 18px;
            }
            .description-body {
              white-space: pre-wrap;
            }
          }
        }
        .product-rating-wrap {
          min-height: 600px;
          .rating-score-wrap {
            display: flex;
            align-items: center;
            gap: 1rem;
            > div {
              // width: 50%;
              &:nth-child(1) {
                width: 37.5%;
                display: flex;
                flex-direction: column;
                gap: 10px;
                > div {
                  display: flex;
                  align-items: center;
                  gap: 5px;
                  > p {
                    font-weight: bold;
                    font-size: 1.2rem;
                    width: 30px;
                  }
                  .rating-bar {
                    width: calc(100% - 30px);
                    height: 1rem;
                    border-radius: 1rem;
                    position: relative;
                    background: $border-color;
                    > div {
                      position: absolute;
                      left: 0;
                      top: 0;
                      height: 1rem;
                      border-radius: 1rem;
                      background: $loading-bar-color;
                      &:hover {
                        opacity: 0.9;
                      }
                    }
                  }
                }
              }
              &:nth-child(2) {
                width: 25%;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 5px;
                .score {
                  font-size: 3.5rem;
                }
                .comment-amount {
                  font-size: 1rem;
                }
                border-right: 2px solid $border-color;
              }
              &:nth-child(3) {
                width: 37.5%;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
          }
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref, reactive, computed, watch, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMessage, useLoadingBar } from 'naive-ui'
import { api } from '@/plugins/axios'
import type { IProduct, IOutfit, IRating } from '@/types'
import { numberToCommaString } from '@/composables'
import { useUserStore } from '@/stores/user'
import { useCommentModalStore } from '@/stores/useCommentModal'
import { ArrowUndoOutline, Pencil } from '@vicons/ionicons5'

import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'

import CommentModal from '@/components/modals/CommentModal.vue'

const modules = [Pagination, Navigation]

const { userId } = storeToRefs(useUserStore())

const user = useUserStore()
const commentModal = useCommentModalStore()
const message = useMessage()
const loadingBar = useLoadingBar()
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

/** 評分 */
const ratings: Ref<IRating[]> = ref([])

/** 評分 bars 分布 */
const ratingsBarsInfo: Ref<{ score: number; width: string }[]> = ref(
  Array.from({ length: 5 }, (v, idx) => 5 - idx).map((item) => ({
    score: item,
    width: ''
  }))
)

/** 我的評分 */
const myRating: Ref<IRating | {}> = ref({})

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
    loadingBar.start()
    const { data } = await api().get(`/products/${route.params.id}`)
    console.log('商品資訊', data)
    product.value = data.result
    productForm.value.selectedImage = product.value.images[0]
    loadingBar.finish()
  } catch (error) {
    loadingBar.error()
    message.error('找不到商品')
    console.log(error)
    router.go(-1)
  }
}

async function getRatings() {
  try {
    const { data } = await api().get(`/ratings/product/${route.params.id}`)
    console.log('商品所有評分', data)
    ratings.value = data.result

    ratingsBarsInfo.value = ratingsBarsInfo.value.map((item) => {
      return {
        ...item,
        width:
          (ratings.value.filter((rating) => rating.score === item.score).length /
            ratings.value.length) *
          100
      }
    })

    const idx = ratings.value.findIndex((rating) => rating.user._id === userId.value)
    console.log(userId.value)
    if (idx === -1) return
    myRating.value = ratings.value[idx]
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

/** 平均評分 */
const avgScore = computed(() => {
  const avg =
    ratings.value.reduce((acc: any, curr: any) => acc + curr.score, 0) / ratings.value.length
  if (isNaN(avg)) return 0.0
  return parseFloat(avg)
})

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
@/stores/useCommentModal
