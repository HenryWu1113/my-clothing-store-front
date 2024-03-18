<template>
  <div class="store-card" :style="amimationDelay" @click="$router.push(`/store/${store._id}`)">
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';

.store-card {
  border: 1px solid $border-color;
  cursor: pointer;
  overflow: hidden;
  @extend %AshowEffect;

  &:hover {
    >img {
      transform: scale(1.1);
    }
  }

  >img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.3s;
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
