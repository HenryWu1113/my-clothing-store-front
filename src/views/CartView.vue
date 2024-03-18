<template>
  <div class="cart-page myContainer min-h-screen">
    <div class="top-img-wrap">
      <img src="../assets/images/cartBG.jpg" alt="" />
    </div>
    <div class="cart-info-wrap">
      <div class="title">
        <p>購物車</p>
        <div class="go-back-btn" @click="$router.go(-1)">
          <n-icon :component="ArrowUndoOutline"></n-icon>
        </div>
      </div>
      <div class="body">
        <div class="product-lists-wrap"></div>
        <div class="total-panel-wrap">
          <div class="panel"></div>
          <n-button type="info" ghost> 結帳 </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';

.cart-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .top-img-wrap {
    height: 250px;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }
  }

  .cart-info-wrap {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .title {
      font-size: 2rem;
      color: $text-color;
      font-weight: bold;
      border-bottom: 1px solid $border-color;
      padding-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .n-icon {
        padding-top: 8px;
        cursor: pointer;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ArrowUndoOutline } from '@vicons/ionicons5'
</script>
