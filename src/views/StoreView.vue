<template>
  <div class="store-page myContainer">
    <div class="info-wrap">
      <div class="store-name">{{ store.name }}</div>
      <div class="phone">
        <p>電話 :</p>
        <p>{{ store.phone }}</p>
      </div>
      <div class="region">
        <p>地區 :</p>
        <p>{{ store.position }}</p>
      </div>
      <div class="address">
        <p>地址 :</p>
        <p>{{ store.address }}</p>
      </div>
      <div class="sell-category">
        <p>販售系列 :</p>
        <div>
          <p v-for="category in store.sellSeries" :key="category._id">{{ category.name }}</p>
        </div>
      </div>
      <div class="sell-time">
        <p>營業時間 :</p>
        <p>{{ store.openingTime }}</p>
      </div>
      <div class="go-back-btn">
        <n-button type="info" ghost @click="$router.go(-1)"> 上一頁 </n-button>
      </div>
    </div>
    <div class="map-wrap">
      <iframe
        :src="store.googleMapAddress"
        style="border: 0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';
.store-page {
  min-height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  .info-wrap {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .store-name {
      font-size: 2rem;
      color: red;
    }

    .phone,
    .region,
    .address,
    .sell-category,
    .sell-time {
      display: flex;
      color: $text-color;
      font-size: 1rem;
      > p {
        &:first-child {
          font-size: 1rem;
          width: 100px;
        }
        &:last-child {
          white-space: pre-wrap;
        }
      }
    }

    .go-back-btn {
      > .n-button {
        width: 300px;
        --n-font-size: 1rem !important;
        --n-height: 40px !important;
      }
    }
  }
  .map-wrap {
    width: 50%;
    > iframe {
      width: 100%;
      aspect-ratio: 4/3;
      @extend %AshowEffect;
    }
  }
}
</style>

<script setup lang="ts">
import { ref, shallowRef, computed, watch, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage, useLoadingBar } from 'naive-ui'
import { api } from '@/plugins/axios'
import type { IStore } from '@/types'
import { numberToCommaString, compareObjects, formatTime } from '@/composables'
import { SnowOutline } from '@vicons/ionicons5'

const message = useMessage()
const loadingBar = useLoadingBar()
const route = useRoute()
const router = useRouter()

const store = ref<IStore>({
  _id: '',
  name: '',
  phone: '',
  address: '',
  position: '',
  googleMapAddress: '',
  openingTime: '',
  sellSeries: [],
  updatedAt: '',
  createdAt: ''
})

async function getStore() {
  try {
    loadingBar.start()
    const { data } = await api().get(`/stores/${route.params.id}`)
    console.log('店鋪資訊', data)
    store.value = data.result
    loadingBar.finish()
  } catch (error: any) {
    loadingBar.error()
    message.error(error.isAxiosError ? error.response.data.message : error.message)
    console.log(error)
    router.go(-1)
  }
}
getStore()
</script>
