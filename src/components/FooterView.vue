<template>
  <footer>
    <div>
      <div class="title">關於我們</div>
      <div class="body">
        <p class="cursor">品牌故事</p>
        <p class="cursor">店鋪資訊</p>
        <p class="cursor">隱私權及網站使用條款</p>
      </div>
    </div>
    <div>
      <div class="title">購物說明</div>
      <div class="body">
        <p class="cursor">購物指南</p>
        <p class="cursor">付款方式</p>
        <p class="cursor">售後服務說明</p>
        <p class="cursor">運送方式</p>
      </div>
    </div>
    <div>
      <div class="title">客服資訊</div>
      <div class="body">
        <p class="cursor">常見問題</p>
        <p class="cursor">聯絡我們</p>
        <p class="cursor">防詐騙宣導</p>
        <p class="cursor">會員權益</p>
      </div>
    </div>
    <div>
      <div class="title">
        <n-icon v-for="icon in iconsInfo" :key="icon.key" :component="icon.icon"></n-icon>
      </div>
      <div class="body">
        <p>客服電話 : 02-3928-3821</p>
        <p>服務時間 : 週一至週五 10:00 - 22:00</p>
        <p>聯絡信箱 : huanCS@gmail.com</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@import '@/styles/styles';
footer {
  border-top: 1px solid rgb(214, 214, 214);
  background: $footer-bg-color;
  padding: 3rem 1rem;
  display: flex;
  justify-content: center;
  color: $text-color2;
  gap: 12rem;
  > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .title {
      font-size: 1.5rem;
      font-weight: bold;
      display: flex;
      gap: 0.7rem;
      .n-icon {
        cursor: pointer;
      }
    }
    .body {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      > p {
        font-size: 1rem;
        &.cursor {
          cursor: pointer;
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import {
  LogoFacebook,
  LogoTwitter,
  LogoInstagram,
  LogoYoutube,
  LogoDiscord
} from '@vicons/ionicons5'

const iconsInfo = [
  {
    key: 'facebook',
    icon: LogoFacebook,
    link: ''
  },
  {
    key: 'twitter',
    icon: LogoTwitter,
    link: ''
  },
  {
    key: 'instagram',
    icon: LogoInstagram,
    link: ''
  },
  {
    key: 'youtube',
    icon: LogoYoutube,
    link: ''
  },
  {
    key: 'discord',
    icon: LogoDiscord,
    link: ''
  }
]
</script>
