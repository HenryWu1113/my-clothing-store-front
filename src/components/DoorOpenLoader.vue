<template>
  <Teleport to="body">
    <div class="door-open-loader">
      <div class="loader"></div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
@import '@/styles/styles';

.door-open-loader {
  --huan-animation-delay: 0.5s;
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10001;
  @keyframes bg-disappear {
    100% {
      width: 0;
    }
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    width: 60%;
    height: 100%;
    background-color: #7b68ee;
    -webkit-transition: 0.9s;
    transition: 0.9s;
    animation: bg-disappear 0.9s linear var(--huan-animation-delay) forwards;
  }

  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }

  .loader {
    width: 40px;
    aspect-ratio: 1;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    animation: loader-disappear 0.5s linear var(--huan-animation-delay) forwards;
    @keyframes loader-disappear {
      100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1.3);
      }
    }
    @keyframes l1-1 {
      0% {
        top: 0;
        left: 0;
      }
      25% {
        top: 100%;
        left: 0;
      }
      50% {
        top: 100%;
        left: 100%;
      }
      75% {
        top: 0;
        left: 100%;
      }
      100% {
        top: 0;
        left: 0;
      }
    }
    @keyframes l1-2 {
      80%,
      100% {
        transform: rotate(0.5turn);
      }
    }

    &.loader:before,
    &.loader:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      margin: -8px 0 0 -8px;
      width: 20px;
      aspect-ratio: 1;
      background: #3fb8af;
      animation:
        l1-1 2s infinite,
        l1-2 0.5s infinite;
    }
    &.loader:after {
      background: #ff3d7f;
      animation-delay: -1s, 0s;
    }
  }
}
</style>

<script setup lang="ts">
import {
  BagCheckOutline,
  PricetagsOutline,
  StorefrontOutline,
  ArrowForwardCircleOutline,
  SparklesOutline,
  SnowOutline,
  CalendarOutline
} from '@vicons/ionicons5'
</script>
