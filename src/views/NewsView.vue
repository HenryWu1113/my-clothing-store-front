<template>
  <div class="news-page min-h-screen">
    <TopImgWrap :imgSrc="imgSrc" :icon="SnowOutline" title="消息內容" />
    <div class="myContainer news-bottom-wrap">
      <div class="main-info-wrap">
        <div class="img-wrap" v-if="news.image && news.image.length">
          <img :src="news.image" />
        </div>
        <div class="time">
          <n-icon :component="CalendarOutline"></n-icon>
          <p>{{ formatTime(news.createdAt) }}</p>
        </div>
        <div class="title" :title="news.title">{{ news.title }}</div>
        <div class="content" v-html="news.content"></div>
      </div>
      <div class="other-news-lists-wrap">
        <div class="title">其他消息</div>
        <div class="other-news-lists">
          <div
            class="other-news"
            :style="amimationDelay(idx)"
            v-for="(oNews, idx) in otherNews"
            :key="oNews._id"
            @click="$router.push(`/news/${oNews._id}`)"
          >
            <div class="img-wrap">
              <img v-if="oNews.image" :src="oNews.image" />
              <img v-else src="../assets/images/thunderstorm.jpg" />
            </div>
            <div class="info-wrap">
              <div class="time">
                <n-icon :component="CalendarOutline"></n-icon>
                <p>{{ formatTime(oNews.createdAt, true) }}</p>
              </div>
              <div class="title">
                {{ stringEllipsis(oNews.title, 18) }}
              </div>
            </div>
          </div>
        </div>
        <div class="go-back-btn">
          <n-button type="info" ghost @click="$router.push('/news')">回到最新消息總覽</n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';
.news-page {
  padding: 72px 0 0 0;

  .news-bottom-wrap {
    display: flex;
    gap: 4rem;
    .main-info-wrap {
      width: calc(100% - 450px - 4rem);
      // padding-left: 10rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      .img-wrap {
        width: 100%;
        > img {
          width: 100%;
          object-fit: cover;
        }
      }
      .time {
        display: flex;
        color: $text-color2;
        font-size: 1.2rem;
        align-items: center;
        gap: 0.5rem;
        padding: var(--huan-padding);
      }
      .title {
        color: $text-color;
        font-size: 1.5rem;
        padding: var(--huan-padding);
        font-weight: bolder;
      }
      .content {
        color: $text-color2;
        font-size: 1rem;
        padding: var(--huan-padding);
        white-space: pre-wrap;
      }
    }
    .other-news-lists-wrap {
      width: 450px;
      // padding-right: 10rem;
      display: flex;
      flex-direction: column;

      > .title {
        font-size: 1.5rem;
        color: $text-color2;
        // text-align: center;
        font-weight: bold;
        border-bottom: 1px solid $border-color;
      }
      .other-news-lists {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-top: 1rem;
        .other-news {
          display: flex;
          height: 90px;
          border-radius: 5px;
          cursor: pointer;
          @extend %AshowEffect;
          &:hover {
            background: $border-color;
          }
          .img-wrap {
            width: 120px;
            height: 100%;
            > img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 5px;
            }
          }
          .info-wrap {
            width: calc(100% - 90px);
            padding-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .time {
              display: flex;
              color: $text-color2;
              font-size: 14px;
              align-items: center;
              gap: 0.5rem;
              padding: var(--huan-padding);
            }
            .title {
              color: $text-color2;
              font-size: 1rem;
              padding: var(--huan-padding);
              font-weight: bolder;
            }
          }
        }
      }
    }
    .go-back-btn {
      margin-top: 1rem;
      > .n-button {
        width: 100%;
        --n-font-size: 1rem !important;
        --n-height: 40px !important;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { SnowOutline, CalendarOutline } from '@vicons/ionicons5'
import { formatTime, stringEllipsis } from '@/composables'
import type { INews } from '@/types'
import { useRoute, useRouter } from 'vue-router'
import { useMessage, useLoadingBar } from 'naive-ui'
import { api } from '@/plugins/axios'

import TopImgWrap from '@/components/topBar/TopImgWrap.vue'
import DoorOpenLoader from '@/components/DoorOpenLoader.vue'

const route = useRoute()
const router = useRouter()
const message = useMessage()
const loadingBar = useLoadingBar()

const imgSrc = ref(new URL('../assets/images/topImg2.jpg', import.meta.url).href)

const news = ref<INews>({
  _id: '',
  title: '',
  content: '',
  image: '',
  show: false,
  createdAt: '',
  updatedAt: ''
})

const otherNews = ref<INews[]>([])

let controller = new AbortController()

async function getNews() {
  try {
    loadingBar.start()
    const id = route.params.id
    const { data } = await api().get(`/news/${id}`, { signal: controller.signal })
    news.value = data.result
    loadingBar.finish()
    console.log(news.value)
  } catch (error: any) {
    loadingBar.error()
    controller.abort()
    controller = new AbortController()
    console.log(error)
    message.error(error.isAxiosError ? error.response.data.message : error.message)
    router.go(-1)
  }
}

/** 取得最新消息 */
async function getAllNews() {
  try {
    const { data } = await api().get('/news', { signal: controller.signal })
    otherNews.value = data.result.filter((item: INews) => item._id !== route.params.id).slice(0, 3)
    console.log(otherNews.value)
  } catch (error: any) {
    message.error(error.isAxiosError ? error.response.data.message : error.message)
  }
}

;(async () => {
  await getNews()
  getAllNews()
})()

const amimationDelay = (idx: number) => {
  return { animationDelay: `${idx * 0.1}s` }
}

watch(route, async () => {
  await getNews()
  getAllNews()
})
</script>
