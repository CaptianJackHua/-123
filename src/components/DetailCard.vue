<template>
  <view class="detail-card">
    <view v-if="title" class="detail-head">{{ title }}</view>
    <slot />
  </view>
</template>

<script setup lang="ts">
defineProps<{ title?: string }>()
</script>
