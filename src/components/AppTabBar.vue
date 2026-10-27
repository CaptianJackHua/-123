<template>
  <view class="tab-bar">
    <view class="tab-item" :class="{ active: active === 'home' }" @tap="switchTo('home')">
      <AppIcon name="home" :size="22" :color="active === 'home' ? '#3b82f6' : '#9aa3af'" />
      <text>首页</text>
    </view>
    <view class="tab-item" :class="{ active: active === 'mine' }" @tap="switchTo('mine')">
      <AppIcon name="user" :size="22" :color="active === 'mine' ? '#3b82f6' : '#9aa3af'" />
      <text>我的</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppIcon from './AppIcon.vue'

defineProps<{ active: 'home' | 'mine' }>()

function switchTo(target: 'home' | 'mine') {
  if (target === 'home') uni.reLaunch({ url: '/pages/home/index' })
  else uni.reLaunch({ url: '/pages/mine/index' })
}
</script>
