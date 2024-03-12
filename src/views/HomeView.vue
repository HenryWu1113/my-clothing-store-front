<template>
  <div
    ref="homePage"
    :class="['home-page', 'min-h-screen', swiperInstance?.isEnd ? 'showScrollBar' : '']"
    @wheel="onscroll"
  >
    <swiper
      :direction="'vertical'"
      :slidesPerView="1"
      :mousewheel="true"
      :pagination="{
        clickable: true
      }"
      :modules="modules"
      class="mySwiper"
      :speed="800"
      @init="init"
    >
      <swiper-slide v-for="section in homeCarousel" :key="section.key">
        <swiper
          :pagination="{
            type: 'fraction'
          }"
          :loop="true"
          :modules="modules"
          class="mySwiper"
          :speed="800"
        >
          <swiper-slide class="carousel-page" v-for="part in section.chlidren" :key="part.key">
            <img class="carousel-img" v-if="part.type === 'img'" :src="part.src" />
            <video
              class="carousel-video"
              v-if="part.type === 'video'"
              :src="part.src"
              loop
              muted
              autoplay
            />
            <div class="info-wrap" :style="infoPosition(part.info.position)">
              <div class="title">
                <n-gradient-text type="warning">
                  {{ part.info.title }}
                </n-gradient-text>
              </div>
              <div class="text" v-html="part.info.text"></div>
              <div v-if="part.info.showBtn" class="see-more">瀏覽更多</div>
            </div>
          </swiper-slide>
        </swiper>
      </swiper-slide>
    </swiper>
    <div></div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/styles';

.home-page {
  padding: 72px 0 0 0;

  .mySwiper {
    width: 100%;
    height: calc(100vh - 72px) !important;

    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: black;
      height: calc(100vh - 72px) !important;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;

      &.carousel-page {
        position: relative;
        > img,
        video {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .info-wrap {
          z-index: 1;
          // width: 400px;
          // height: 200px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .title {
            text-align: left;
            font-size: 2.5rem;
            font-weight: bold;
            .n-gradient-text {
              font-weight: bold;
            }
          }
          .text {
            text-align: left;
            text-shadow: 2px 2px 5px black;
          }
          .see-more {
            cursor: pointer;
            margin-top: 1rem;
            border: 1px solid white;
            border-radius: 3px;
            font-size: 1.5rem;
            padding: 5px 1rem;
            background: rgba(255, 255, 255, 0.5);
            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
            transition: 0.3s;
            &:hover {
              transform: translateY(-5px);
            }
          }
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, Pagination } from 'swiper/modules'
import { homeCarousel } from '@/composables/settings/settings'
import 'swiper/css/pagination'
import 'swiper/css'
const modules = [Mousewheel, Pagination]

const homePage: any = ref(null)
const swiperInstance: any = ref(null)

const init = (swiper: any) => {
  console.log(swiper)
  swiperInstance.value = swiper
}

function onscroll(e: WheelEvent) {
  // console.log(homePage.value)
  // 如果輪播圖到底了且滾輪往下 停止輪播圖 mousewheel 功能
  const body: any = document.querySelector('body')
  if (swiperInstance.value.isEnd && e.deltaY > 0) {
    swiperInstance.value.mousewheel.disable()
    body.style.overflow = 'auto'
    // console.log(body)
  } else if (swiperInstance.value.el.getBoundingClientRect().bottom === window.innerHeight) {
    // 如果輪播圖的底的高度等於視窗底的高度且滾輪往上 啟用輪播圖 mousewheel 功能
    swiperInstance.value.mousewheel.enable()
    body.style.overflow = 'hidden'
  }
}

function infoPosition(position: string) {
  if (position === 'left') return { left: '400px' }
  if (position === 'right') return { right: '400px' }
}

onMounted(() => {
  const body: any = document.querySelector('body')
  body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  const body: any = document.querySelector('body')
  body.style.overflow = 'auto'
})
</script>
