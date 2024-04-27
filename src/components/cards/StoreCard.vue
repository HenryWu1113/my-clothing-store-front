<template>
  <div class="store-card" :style="amimationDelay" @click="$router.push(`/store/${store._id}`)">
    <div class="store-name">{{ store.name }}({{ store.position }})</div>
    <div class="phone">電話 : {{ store.phone }}</div>
    <div class="address">地址 : {{ store.address }}</div>
    <div class="sell-category">
      <p>販售系列 :</p>
      <div>
        <p v-for="category in store.sellSeries" :key="category._id">{{ category.name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';

.store-card {
  border: 1px solid $border-color;
  cursor: pointer;
  overflow: hidden;
  @extend %AshowEffect;

  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 5px;

  .store-name {
    font-size: 1.5rem;
    color: red;
    margin-bottom: 2rem;
  }

  .phone,
  .address,
  .sell-category {
    font-size: 1rem;
    color: $text-color2;
  }

  .sell-category {
    display: flex;
    align-items: center;
    gap: 10px;

    > div {
      display: flex;
      gap: 5px;
    }
  }
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import type { IStore } from '@/types'
import { formatTime, stringEllipsis } from '@/composables'
import { useRouter } from 'vue-router'
import { ArrowForward, CalendarOutline } from '@vicons/ionicons5'

const router = useRouter()

const props = defineProps({
  store: {
    type: Object as () => IStore,
    required: true
  },
  idx: {
    type: Number,
    required: true
  }
})

const amimationDelay = computed(() => {
  return { animationDelay: `${props.idx * 0.1}s` }
})
</script>
