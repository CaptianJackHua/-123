<template>
  <view class="nav-wrap">
    <view class="nav-inner">
      <view class="nav-side" @tap="onBack">
        <AppIcon v-if="showBack" name="back" :size="20" color="#1f2329" />
      </view>
      <text class="nav-title">{{ title }}</text>
      <view class="nav-capsule">
        <text class="capsule-dots">•••</text>
        <view class="capsule-divider" />
        <view class="capsule-circle" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import { goBack } from '@/utils/nav'

const props = withDefaults(
  defineProps<{
    title: string
    showBack?: boolean
    fallback?: string
  }>(),
  {
    showBack: true,
    fallback: '/pages/home/index'
  }
)

function onBack() {
  goBack(props.fallback)
}
</script>

<style scoped lang="scss">
.nav-side {
  cursor: pointer;
}
/* 微信小程序右上角胶囊 */
.nav-capsule {
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  gap: 8px;
  border: 1px solid rgba(31, 35, 41, 0.12);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.7);
}
.capsule-dots {
  font-size: 14px;
  letter-spacing: 1px;
  color: #1f2329;
  line-height: 1;
}
.capsule-divider {
  width: 1px;
  height: 16px;
  background: rgba(31, 35, 41, 0.12);
}
.capsule-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1.5px solid #1f2329;
  position: relative;
}
.capsule-circle::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: #1f2329;
}
</style>
