<template>
  <div class="all-news-page min-h-screen">
    <TopImgWrap :imgSrc="imgSrc" :icon="SnowOutline" title="最新消息" />
    <div class="myContainer news-bottom-wrap">
      <div class="news-lists-wrap">
        <template v-if="loading">
          <n-skeleton
            v-for="item in Array.from({ length: 6 }, (_, idx) => idx)"
            :key="item"
            :sharp="false"
            size="medium"
          />
        </template>
        <NewsCard v-for="(news, idx) in filterNewsArr" :news="news" :idx="idx" :key="news._id" />
      </div>
      <n-pagination v-model:page="currentPage" :page-count="pageCount" :page-slot="5" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';

.all-news-page {
  padding: 72px 0 0 0;
  display: flex;
  flex-direction: column;

  .news-bottom-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    .news-lists-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      width: 100%;

      .n-skeleton {
        width: calc((100% - 2rem) / 3);
        height: 549.59px !important;
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

import NewsCard from '@/components/cards/NewsCard.vue'
import TopImgWrap from '@/components/topBar/TopImgWrap.vue'

const imgSrc = ref(new URL('../assets/images/topImg2.jpg', import.meta.url).href)

const message = useMessage()

const newsArr = ref<INews[]>([])

const loading = ref(false)

const pageSize = ref(6)
const currentPage = ref(1)
const pageCount = ref(1)

/** 取得最新消息 */
async function getAllNews() {
  loading.value = true
  try {
    const { data } = await api().get('/news')
    console.log(data)
    newsArr.value = data.result.map((item: any) => ({
      ...item,
      content: changeHTMLToString(item.content)
    }))
    pageCount.value = Math.ceil(newsArr.value.length / 6)
  } catch (error: any) {
    message.error(error.isAxiosError ? error.response.data.message : error.message)
  }
  loading.value = false
}
getAllNews()

/** 把 HTML 字串改成一般字串 */
function changeHTMLToString(HTMLString: string) {
  const element = document.createElement('div')
  element.innerHTML = HTMLString
  return element.innerText ?? ''
}

const filterNewsArr = computed(() => {
  return newsArr.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  )
})
</script>
