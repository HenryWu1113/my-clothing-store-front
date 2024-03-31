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
          <swiper-slide class="carousel-page" v-for="part in section.children" :key="part.key">
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
                <n-gradient-text :type="part.info.textGradient ?? 'warning'">
                  {{ part.info.title }}
                </n-gradient-text>
              </div>
              <div class="text" v-html="part.info.text"></div>
              <div
                v-if="part.info.location"
                class="see-more"
                @click="$router.push(part.info.location ?? '/')"
              >
                瀏覽更多
              </div>
            </div>
            <div v-if="false" class="prev-slide slide-btn">上一張</div>
            <div v-if="false" class="next-slide slide-btn">下一張</div>
          </swiper-slide>
        </swiper>
      </swiper-slide>
    </swiper>
    <div class="myContainer">
      <div class="news-wrap">
        <div class="title">
          <n-icon :component="SnowOutline"></n-icon>

          <p>最新消息</p>
          <n-icon :component="SnowOutline"></n-icon>
        </div>
        <div class="news-lists">
          <div
            class="list-wrap"
            v-for="(news, idx) in newsArr.filter((_, idx) => idx < 3)"
            :key="news._id"
            @click="$router.push(`/news/${news._id}`)"
          >
            <div class="title">
              <p>
                {{ news.title }}
              </p>
            </div>
            <n-icon class="big-icon" v-if="idx === 0" :component="BagCheckOutline"></n-icon>
            <n-icon class="big-icon" v-if="idx === 1" :component="PricetagsOutline"></n-icon>
            <n-icon class="big-icon" v-if="idx === 2" :component="StorefrontOutline"></n-icon>
            <div class="date">
              <n-icon :component="CalendarOutline"></n-icon>
              <p>{{ formatTime(news.createdAt, true) }}</p>
            </div>
            <n-icon class="arrow" :component="ArrowForwardCircleOutline"></n-icon>
          </div>
        </div>
        <div class="more-news" @click="$router.push('/news')">
          <div>查看所有消息</div>
        </div>
      </div>
      <n-divider />
      <div class="normal-problem-wrap">
        <div class="title">
          <n-icon :component="SparklesOutline"></n-icon>
          <p>常見問題</p>
          <n-icon :component="SparklesOutline"></n-icon>
        </div>
        <n-collapse>
          <n-collapse-item title="購物常見問題" name="1">
            <div class="QA-wrap">
              <div class="question">Q1. 購物流程說明</div>
              <div class="answer">
                <p>親切易懂的指引式流程畫面，讓您充分享受便利的購物樂趣。</p>
                <p>選擇商品＞＞加入購物車＞＞訂單結帳＞＞填寫資料＞＞ 完成購物</p>
                <p class="warn">
                  ※
                  提醒您，商品加入購物車但未結帳前，並無保留商品庫存功能，商品庫存分配將以結帳順序為依據。
                </p>
              </div>
            </div>
            <div class="QA-wrap">
              <div class="question">Q2. 目前提供哪些付款方式?</div>
              <div class="answer">
                <p>目前提供付款方式有四種：</p>
                <p>1. 『超商取貨』付款</p>
                <p>2. 『信用卡』付款。</p>
                <p>3. 『ATM』付款。</p>
                <p>4. 『貨到』付款。</p>
              </div>
            </div>
            <div class="QA-wrap">
              <div class="question">Q3. 如何查詢目前訂單的處理情況?</div>
              <div class="answer">
                <p>
                  請點選右上登入會員後，輸入您的E-mail及密碼登入後，點選右上＞＞「我的訂單」即可查詢該訂單的處理狀態。
                </p>
              </div>
            </div>
          </n-collapse-item>
          <n-collapse-item title="配送取貨問題" name="2">
            <div class="QA-wrap">
              <div class="question">Q1. 可選擇的配送方式有那些?</div>
              <div class="answer">
                <p>
                  ATM/線上刷卡/超商代碼 :
                  商品將以郵寄、宅配、7-11店到店方式寄出，台灣本島使用黑貓宅急便配送；外島地區將以郵局配送。
                </p>
                <p>
                  超商取貨付款 :
                  商品將配送至您所指定的門市，到店時將會發送取貨通知簡訊及E-mail通知您前往取貨。
                </p>
                <p>
                  宅配/貨到付款 :
                  商品將以宅配方式送達，並於交付您貨物時收取貨款，貨物送達時會與您電話聯絡，需請您務必保持電話暢通，不要拒接不認識的來電號碼，以免錯過貨物送達，連續配送三次均無法聯絡，本訂單將自動取消喔！
                </p>
                <p class="warn">
                  ※
                  當商品出貨後，送達指定地點若未被領取或拒收，會員資料中將會產生未取件記錄並退款將扣除宅配運費。未取件記錄達
                  2 次以上(含2次)，將直接列入黑名單！
                </p>
              </div>
            </div>
            <div class="QA-wrap">
              <div class="question">Q2. 如何更改訂購內容、送貨地址或取消訂單?</div>
              <div class="answer">
                <p>
                  修改訂單 : 訂單送出後即無法修改訂單內容，如需修改，請於訂單內留言修改的內容即可。
                </p>
                <p>取消訂單 : 訂單狀態尚未進「已確認」前您可於訂單內留言「取消訂單」。</p>
                <p class="warn">
                  ※
                  商品都是依買方選擇的顏色，款式，尺寸出貨，請先確認下單內容是否正確，不接受以備註更改訂單內容。
                </p>
                <p class="warn">※ 提醒您，若您取消訂單後重新訂購，商品庫存請依當時頁面為主！</p>
              </div>
            </div>
            <div class="QA-wrap">
              <div class="question">Q3. 台灣外島地區可以寄送嗎?</div>
              <div class="answer">
                <p>台灣外島將以郵局配送，不便之處敬請見諒。</p>
              </div>
            </div>
            <div class="QA-wrap">
              <div class="question">Q4. 想了解訂單的包裹配送到哪?</div>
              <div class="answer">
                <p>會員登入後點選我的訂單，即可追蹤包裹配送狀態。</p>
                <p>處理中 ： 訂單正在確認處理中</p>
                <p>已確認 ： 訂單已確認成立並已經出貨，無法進行取消</p>
                <p>已完成 ： 訂單成功取件</p>
                <p>已取消 ： 訂單已被取消</p>
              </div>
            </div>
          </n-collapse-item>
          <n-collapse-item title="會員常見問題" name="3">
            <div class="QA-wrap">
              <div class="question">Q1. 該如何加入會員呢?</div>
              <div class="answer">
                <p>點擊右上方註冊為會員，輸入信箱及密碼，即可加入會員。</p>
              </div>
            </div>
            <div class="QA-wrap">
              <div class="question">Q2. 一定要登入/加入會員才能購買嗎?</div>
              <div class="answer">
                <p>為了提供您更快速便捷的購物流程，必須加入會員也才能進行購買。</p>
              </div>
            </div>
          </n-collapse-item>
          <n-collapse-item title="電子發票常見問題" name="4">
            <div class="QA-wrap">
              <div class="question">Q1. 什麼是「電子發票」?商品收到了，發票怎麼沒一起附上?</div>
              <div class="answer">
                <p>
                  根據財政部令「電子發票實施作業要點」，於消費開立之「二聯電子發票」、「三聯電子發票」，不主動寄送，GOSHOP亦會將發票號碼上傳至政府平台。
                </p>
                <p>
                  訂單完成付款後3天內，系統會寄送電子發票至您當初訂購的email中，您可以由email中查看發票相關資料，相關資料請參考財政部電子發票整合服務平台
                  。
                </p>
              </div>
            </div>
            <div class="QA-wrap">
              <div class="question">Q2. 若電子發票輸入資料有誤，是否還能修改?</div>
              <div class="answer">
                <p>
                  若發票資訊錯誤，可聯絡客服人員進行修改，修改後原已開立之發票會直接作廢，系統將發送電子發票作廢通知至您的email信箱。
                </p>
                <p>
                  請於消費時確認應取得二聯（個人消費）或三聯（報帳用）發票，本公司已盡告知義務，且為配合國稅局勸止二聯換開三聯之政策，本公司有權利考量各因素後拒絕換開發票。若誤選請盡速取消訂單重新訂購。
                </p>
                <p>
                  若公司戶電子發票資料錯誤，需更改統一編號，請與客服人員聯繫說明原因，我們會於兩週內將您的原始發票作廢，並重新開立新的發票，屆時您可至訂單中進行查詢或下載。
                </p>
              </div>
            </div>
          </n-collapse-item>
        </n-collapse>
      </div>
    </div>
    <DoorOpenLoader :onOpen="false" />
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
      // background: black;
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

        .slide-btn {
          position: absolute;
          bottom: 10px;
          padding: 5px 10px;
          border: 1px solid white;
          border-radius: 5px;
          transform: translateX(-50%);
          cursor: pointer;
          z-index: 99999;
          &.prev-slide {
            left: 47%;
          }

          &.next-slide {
            left: 53%;
          }
        }
      }
    }
  }

  .myContainer {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    .news-wrap {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      > .title {
        font-size: 2.5rem;
        color: $text-color2;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      }
      .news-lists {
        display: flex;
        align-items: center;
        gap: 2rem;
        .list-wrap {
          width: calc((100% - 4rem) / 3) !important;
          display: flex;
          color: $text-color2;
          font-size: 1rem;
          width: 100%;
          padding: 1rem;
          transition: 0.3s;

          border-radius: 10px;
          background: $bg-color;
          @extend %Neumorphism;

          @keyframes leftRight {
            0% {
              right: 30px;
            }
          }

          &:hover {
            .arrow {
              animation: leftRight 0.3s infinite ease-in alternate;
            }
          }

          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          position: relative;
          .title {
            width: 100%;
            font-size: 1.5rem;
            text-align: center;
            > p {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
          .big-icon {
            font-size: 5rem;
          }
          .date {
            align-self: flex-start;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .arrow {
            font-size: 2rem;
            position: absolute;
            right: 10px;
            bottom: 1rem;
          }
        }
      }
      .more-news {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        > div {
          border: 1px solid $text-color2;
          color: $text-color2;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px 10px;
          font-size: 20px;
          cursor: pointer;
          &:hover {
            opacity: 0.9;
          }
        }
      }
    }
    .normal-problem-wrap {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      > .title {
        font-size: 2.5rem;
        color: $text-color2;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      }
      :deep(.n-collapse) {
        // --n-font-size: 20px !important;

        .n-collapse-item__header-main,
        .n-collapse-item-arrow {
          font-size: 1.8rem !important;
        }

        .QA-wrap {
          padding: 0.5rem 0;
          &:not(:first-child) {
            border-top: 1px dashed $border-color;
          }
          .question {
            font-size: 1.5rem;
          }
          .answer {
            font-size: 1rem;
            p.warn {
              color: $error;
              font-weight: bold;
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
import { formatTime } from '@/composables'
import { useMessage } from 'naive-ui'
import { api } from '@/plugins/axios'
import type { INews } from '@/types'
import {
  BagCheckOutline,
  PricetagsOutline,
  StorefrontOutline,
  ArrowForwardCircleOutline,
  SparklesOutline,
  SnowOutline,
  CalendarOutline
} from '@vicons/ionicons5'

import 'swiper/css/pagination'
import 'swiper/css'

import DoorOpenLoader from '@/components/DoorOpenLoader.vue'

const message = useMessage()

const modules = [Mousewheel, Pagination]

const homePage: any = ref(null)
const swiperInstance: any = ref(null)

const newsArr = ref<INews[]>([])

/** Swiper 元件初始會執行的 callback，回傳該 swiper 實例 */
const init = (swiper: any) => {
  console.log(swiper)
  swiperInstance.value = swiper
}

/** 滾動事件 */
function onscroll(e: WheelEvent) {
  // console.log(homePage.value)
  // 如果輪播圖到底了且滾輪往下 停止輪播圖 mousewheel 功能
  const body: any = document.querySelector('body')
  if (swiperInstance.value.isEnd && e.deltaY > 0) {
    swiperInstance.value.mousewheel.disable()
    setTimeout(() => {
      body.style.overflow = 'auto'
    }, 300)
  } else if (swiperInstance.value.el.getBoundingClientRect().bottom === window.innerHeight) {
    // 如果輪播圖的底的高度等於視窗底的高度且滾輪往上 啟用輪播圖 mousewheel 功能
    swiperInstance.value.mousewheel.enable()
    body.style.overflow = 'hidden'
  }
}

/** 輪播圖顯示字位置 */
function infoPosition(position: 'left' | 'right') {
  if (position === 'left') return { left: '400px' }
  if (position === 'right') return { right: '400px' }
}

/** 取得最新消息 */
async function getNews() {
  try {
    const { data } = await api().get('/news')
    console.log(data)
    newsArr.value = data.result
  } catch (error: any) {
    message.error(error.isAxiosError ? error.response.data.message : error.message)
  }
}

getNews()

onMounted(() => {
  const body: any = document.querySelector('body')
  body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  const body: any = document.querySelector('body')
  body.style.overflow = 'auto'
})
</script>
