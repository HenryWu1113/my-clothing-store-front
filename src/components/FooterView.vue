<template>
  <footer>
    <div class="footer-top">
      <div class="community-icons-wrap">
        <div v-for="info in iconsInfo" :key="info.key">
          <n-icon :class="info.key" :component="info.icon"></n-icon>
        </div>
      </div>
    </div>
    <div class="footer-bottom"></div>
  </footer>
</template>

<style scoped lang="scss">
@import '@/styles/styles';
footer {
  .footer-top {
    background: $footer-bg-color;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5rem 10rem;
    .community-icons-wrap {
      display: flex;
      gap: 2rem;
      > div {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: $footer-icon-wrap-bg-color;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $text-color;
        font-size: 1.5rem;
        cursor: pointer;
        &:hover {
          > .n-icon {
            transform: scale(1.1);
          }
        }
        .n-icon {
          &.facebook {
            color: blue;
          }
          &.twitter {
            color: rgb(116, 198, 211);
          }
          &.instagram {
            color: rgb(241, 122, 142);
          }
          &.youtube {
            color: red;
          }
          &.discord {
            color: blue;
          }
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
