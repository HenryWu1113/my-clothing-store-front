<template>
  <div class="news-list" :style="amimationDelay">
    <div class="img-wrap" @click="gotoNewsDetail()">
      <img v-if="news.image" :src="news.image" />
      <img v-else src="../../assets/images/thunderstorm.jpg" />
    </div>
    <div class="time">
      <n-icon :component="CalendarOutline"></n-icon>
      <p>{{ formatTime(news.createdAt) }}</p>
    </div>
    <div class="title" :title="news.title">{{ stringEllipsis(news.title, 35) }}</div>
    <div class="content">{{ stringEllipsis(news.content, 50) }}</div>
    <div class="read-more">
      <n-icon :component="ArrowForward"></n-icon>
      <n-button type="info" ghost @click="gotoNewsDetail()">查看</n-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';

.news-list {
  --huan-padding: 0 1.5rem;

  width: calc((100% - 2rem) / 3);
  box-shadow: 5px 5px 15px $border-color;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1rem;
  @extend %AshowEffect;
  .img-wrap {
    width: 100%;
    height: 300px;
    cursor: pointer;
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
    overflow: hidden;
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
</style>

<script setup lang="ts">
import { computed } from 'vue'
import type { INews } from '@/types'
import { formatTime, stringEllipsis } from '@/composables'
import { useRouter } from 'vue-router'
import { ArrowForward, CalendarOutline } from '@vicons/ionicons5'

const router = useRouter()

const props = defineProps({
  news: {
    type: Object as () => INews,
    required: true
  },
  idx: {
    type: Number,
    required: true
  }
})

function gotoNewsDetail() {
  router.push(`/news/${props.news._id}`)
}

const amimationDelay = computed(() => {
  return { animationDelay: `${props.idx * 0.1}s` }
})
</script>
