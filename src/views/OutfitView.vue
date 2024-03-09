<template>
  <div class="myContainer">single outfit</div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.params.id)
</script>
