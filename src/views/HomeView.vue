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
      ref="swiperDom"
      @reachEnd="handleSwiperEnd"
      @init="init"
    >
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
    </swiper>
    <div></div>
  </div>
</template>

<style>
/* body::-webkit-scrollbar {
  display: none !important;
} */
</style>

<style lang="scss" scoped>
@import '@/styles/styles';

.home-page {
  padding: 72px 0 0 0;

  .mySwiper {
    width: 100%;
    height: calc(100vh - 72px) !important;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: black;
    height: calc(100vh - 72px) !important;
    color: white;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, Pagination } from 'swiper/modules'
import 'swiper/css/pagination'
import 'swiper/css'
const modules = [Mousewheel, Pagination]

const homePage: any = ref(null)
const swiperInstance: any = ref(null)

// console.log(Swiper)

const handleSwiperEnd = (value: any) => {
  console.log('reach end')
  // swiperInstance.value.mousewheel.disable()
}

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
    console.log(324)
    // 如果輪播圖的底的高度等於視窗底的高度且滾輪往上 啟用輪播圖 mousewheel 功能
    swiperInstance.value.mousewheel.enable()
    body.style.overflow = 'hidden'
  }
}
</script>
