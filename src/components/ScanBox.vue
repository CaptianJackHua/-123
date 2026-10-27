<template>
  <view class="scan-area" :style="{ height: height + 'px' }">
    <view class="scan-corner" style="top: 14px; left: 14px; border-top: 3px solid var(--cyan); border-left: 3px solid var(--cyan)" />
    <view class="scan-corner" style="top: 14px; right: 14px; border-top: 3px solid var(--cyan); border-right: 3px solid var(--cyan)" />
    <view class="scan-corner" style="bottom: 14px; left: 14px; border-bottom: 3px solid var(--cyan); border-left: 3px solid var(--cyan)" />
    <view class="scan-corner" style="bottom: 14px; right: 14px; border-bottom: 3px solid var(--cyan); border-right: 3px solid var(--cyan)" />
    <view class="scan-center">
      <AppIcon :name="icon" :size="34" color="#d8ecff" />
      <text class="tip">{{ hint }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppIcon from './AppIcon.vue'

withDefaults(
  defineProps<{
    height?: number
    hint?: string
    icon?: string
  }>(),
  {
    height: 220,
    hint: '将二维码放入框内，即可自动扫描',
    icon: 'scan'
  }
)
</script>
