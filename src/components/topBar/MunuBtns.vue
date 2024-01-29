<template>
  <div class="page-menu-btns-wrap">
    <div class="btn" v-for="menu in menuArr" :key="menu.key" @click="menu.onClick">
      <n-icon :component="menu.icon"></n-icon>
    </div>
    <div class="user-btn">
      <n-icon :component="MenuOutlined"></n-icon>
      <div class="user-icon-wrap">
        <n-icon :component="UserOutlined"></n-icon>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '@/styles/styles';

.page-menu-btns-wrap {
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
  gap: 0.5rem;
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 50%;
    font-size: 1.6rem;
    color: $dark;
    cursor: pointer;
    &:hover {
      background: $light1;
    }
  }

  .user-btn {
    padding: 0.25rem 0.5rem;
    transition: 0.15s;
    border-radius: 9999px;
    border: 1px solid $light1;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.2rem;
    &:hover {
      box-shadow: 0 5px 10px $light1;
    }
    .user-icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      background: $light1;
      border-radius: 50%;
      padding: 0.3rem;
      font-size: 1.5rem;
      color: $light;
      font-weight: bold;
    }
  }
}
</style>
<script setup lang="ts">
import { ref, reactive, shallowRef } from 'vue'
import { SkullOutline, HeartOutline, CartOutline, SunnyOutline } from '@vicons/ionicons5'
import { MenuOutlined, UserOutlined } from '@vicons/antd'
import { useRouter } from 'vue-router'
import { menuSelection } from '@/composables/topBar/menuSelection'

const router = useRouter()

const menuArr = shallowRef([
  {
    key: 'favorite',
    icon: HeartOutline,
    onClick: () => {
      router.push('/favorite')
    }
  },
  {
    key: 'cart',
    icon: CartOutline,
    onClick: () => {
      router.push('/cart')
    }
  },
  {
    key: 'theme',
    icon: SunnyOutline,
    onClick: null
  }
])
</script>
