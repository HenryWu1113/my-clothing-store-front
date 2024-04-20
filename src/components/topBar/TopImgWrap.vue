<template>
  <div class="top-img-wrap">
    <img :src="imgSrc" />
    <div class="title">
      <n-icon :component="icon"></n-icon>
      <p>{{ title }}</p>
      <n-icon :component="icon"></n-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';
.top-img-wrap {
  height: 400px;
  position: relative;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.7;
    object-position: center;
  }
  .title {
    position: absolute;
    color: white;
    font-size: 2.5rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}
</style>

<script setup lang="ts">
const props = defineProps({
  imgSrc: {
    type: String,
    required: true
  },
  icon: {
    type: Object as () => any,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
</script>
