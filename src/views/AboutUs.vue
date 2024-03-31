<template>
  <div class="aboutus-page myContainer min-h-screen">
    <div class="top-img-wrap">
      <img src="../assets/images/aboutus/AboutusTop.jpg" alt="" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';

.aboutus-page {
  display: flex;
  flex-direction: column;

  .top-img-wrap {
    border-radius: 50px;
    overflow: hidden;
    height: 400px;
    > img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      object-position: center;
    }
  }
}
</style>

<script setup lang="ts"></script>
