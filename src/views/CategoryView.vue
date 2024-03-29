<template>
  <div class="category-page min-h-screen">
    <TopImgWrap :imgSrc="imgSrc" :icon="SnowOutline" title="精選商品分類" />
    <div class="myContainer category-content">
      <div class="category-top">
        <img src="../assets/images/categoryTopImage2.jpg" alt="" />
      </div>
      <div class="category-bottom">
        <div class="title">{{ exchangeCategory() }} | 商品分類</div>
        <div class="category-wrap">
          <template v-if="loading">
            <n-skeleton
              v-for="item in Array.from({ length: 20 }, (_, idx) => idx)"
              :key="item"
              :sharp="false"
              size="medium"
            />
          </template>
          <div
            v-else
            class="category-box"
            v-for="category in categories"
            :key="category._id"
            @click="gotoProducts(category.key)"
          >
            <img :src="matchImgObj[category.key]" />
            <p>{{ category.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';
.category-page {
  padding: 72px 0 0 0;
  .category-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .category-top {
      display: flex;
      justify-content: center;
    }
    .category-bottom {
      display: flex;
      flex-direction: column;
      padding: 0 10rem;
      > .title {
        font-size: 30px;
        font-weight: bold;
        color: $text-color;
        text-align: center;
        padding: 2rem;
      }
      .category-wrap {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        .category-box {
          width: calc((100% - 6rem) / 4);
          border-radius: 10px;
          cursor: pointer;
          position: relative;
          display: flex;
          flex-direction: column;
          // &:hover {
          //   > p {
          //     transform: translateY(-100%) scale(1.3);
          //     &::before {
          //       content: '';
          //       box-shadow: 5px 5px 15px $border-color;
          //       border-radius: 10px;
          //       position: absolute;
          //       left: 50%;
          //       top: 50%;
          //       transform: translate(-50%, -50%);
          //       width: 100px;
          //       height: 30px;
          //       background: $bg-color;
          //     }
          //   }
          // }
          > img {
            border-radius: 10px;
            width: 100%;
            aspect-ratio: 1/1;
            object-fit: cover;
          }
          > p {
            font-size: 1.5rem;
            color: $text-color2;
            font-weight: bolder;
            text-align: center;
            transition: 0.3s;
            position: relative;

            &::before {
              content: '';
              transition: 0.3s;
              z-index: -1;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              width: 0;
              height: 0;
              background: transparent;
            }
          }
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMessage } from 'naive-ui'
import { SnowOutline, CalendarOutline } from '@vicons/ionicons5'
import { useRoute, useRouter } from 'vue-router'
import type { ICategory } from '@/types'
import { api } from '@/plugins/axios'
import _ from 'lodash'
import queryString from 'query-string'

import TopImgWrap from '@/components/topBar/TopImgWrap.vue'

const message = useMessage()
const route = useRoute()
const router = useRouter()

console.log(route.params.id)

const imgSrc = ref(new URL('../assets/images/thunderstorm.jpg', import.meta.url).href)

const categories = ref<ICategory[]>([])
const loading = ref(false)

/** 用 key 兌換圖片物件 */
const matchImgObj: { [key: string]: string } = {
  shirts: new URL('../assets/images/category/shirts.jpg', import.meta.url).href,
  tshirts: new URL('../assets/images/category/tshirts.jpg', import.meta.url).href,
  pants: new URL('../assets/images/category/pants.jpg', import.meta.url).href
}

/** 兌換 */
const categoryName: { [key: string]: string } = {
  male: '男裝',
  female: '女裝'
}

async function getCategories(queryObj: Record<string, any>) {
  const str = queryString.stringify(queryObj)
  console.log(str)
  loading.value = true
  try {
    const { data } = await api().get(`/categories?${str}`)
    console.log(data)
    categories.value = [...data.result]
  } catch (error: any) {
    message.error(error.isAxiosError ? error.response.data.message : error.message)
  }
  loading.value = false
}

function gotoProducts(key: string) {
  const { gender } = route.query
  router.push(`/products?clothingGender=${gender}&clothingPart=${key}&sort=integrate`)
}

function exchangeCategory() {
  return categoryName[route.query.gender as string]
}

watch(
  () => _.cloneDeep(route),
  (newVal) => {
    console.log(newVal.query)

    getCategories(newVal.query)
  },
  { immediate: true, deep: true }
)
</script>
