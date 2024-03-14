<template>
  <div class="all-news-page min-h-screen">
    <div class="top-img-wrap">
      <img src="../assets/images/thunderstorm.jpg" />
      <div class="title">
        <n-icon :component="SnowOutline"></n-icon>
        <p>最新消息</p>
        <n-icon :component="SnowOutline"></n-icon>
      </div>
    </div>
    <div class="myContainer">
      <div class="news-bottom-wrap">
        <div class="news-lists-wrap">
          <div class="news-list" v-for="news in filterNewsArr" :key="news._id">
            <div class="img-wrap">
              <img v-if="news.image" :src="news.image" />
              <img v-else src="../assets/images/thunderstorm.jpg" />
            </div>
            <div class="time">
              <n-icon :component="CalendarOutline"></n-icon>
              <p>{{ formatTime(news.createdAt) }}</p>
            </div>
            <div class="title" :title="news.title">{{ stringEllipsis(news.title, 35) }}</div>
            <div class="content">{{ stringEllipsis(news.content, 50) }}</div>
            <div class="read-more">
              <n-icon :component="ArrowForward"></n-icon>
              <n-button type="info" ghost>查看</n-button>
            </div>
          </div>
        </div>
        <n-pagination v-model:page="currentPage" :page-count="pageCount" :page-slot="5" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';

.all-news-page {
  padding: 72px 0 0 0;
  display: flex;
  flex-direction: column;
  .top-img-wrap {
    height: 400px;
    position: relative;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.7;
      object-position: bottom;
    }
    .title {
      position: absolute;
      color: white;
      font-size: 2.5rem;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }

  .news-bottom-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    .news-lists-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      > .news-list {
        --huan-padding: 0 1.5rem;
        width: calc((100% - 2rem) / 3);
        border: 1px solid $border-color;
        border-radius: 5px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding-bottom: 1rem;
        .img-wrap {
          width: 100%;
          height: 300px;
          > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .time {
          display: flex;
          color: $text-color2;
          font-size: 1rem;
          align-items: center;
          gap: 0.5rem;
          padding: var(--huan-padding);
        }
        .title {
          color: $text-color;
          font-size: 1.5rem;
          padding: var(--huan-padding);
          height: 72px;
          font-weight: bolder;
        }
        .content {
          color: $text-color2;
          font-size: 1rem;
          padding: var(--huan-padding);
          height: 70px;
          overflow: hidden;
        }
        .read-more {
          padding: var(--huan-padding);
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 1rem;
          &:hover {
            .n-icon {
              transform: translateX(0);
            }
          }
          .n-icon {
            transform: translateX(-10px);
            color: $text-color2;
            font-size: 1.5rem;
            color: $info;
            transition: 0.5s;
          }
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { api } from '@/plugins/axios'
import type { INews } from '@/types'
import { formatTime, stringEllipsis } from '@/composables'
import { useMessage } from 'naive-ui'

import {
  BagCheckOutline,
  PricetagsOutline,
  StorefrontOutline,
  ArrowForward,
  SparklesOutline,
  SnowOutline,
  CalendarOutline
} from '@vicons/ionicons5'

const message = useMessage()

const newsArr = ref<INews[]>([])

const pageSize = ref(6)
const currentPage = ref(1)
const pageCount = ref(2)

/** 取得最新消息 */
async function getNews() {
  try {
    const { data } = await api().get('/news')
    console.log(data)
    newsArr.value = data.result
    pageCount.value = Math.ceil(newsArr.value.length / 6)
  } catch (error: any) {
    message.error(error.isAxiosError ? error.response.data.message : error.message)
  }
}
getNews()

const filterNewsArr = computed(() => {
  return newsArr.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  )
})
</script>
