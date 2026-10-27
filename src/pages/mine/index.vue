<template>
  <view class="app-page with-tab">
    <view class="profile-header">
      <view class="profile-avatar">李</view>
      <view style="flex: 1">
        <view class="profile-name">李得龙</view>
        <view class="profile-desc">139****5678 · 极光授权技师 JD2024008</view>
      </view>
    </view>

    <view class="content">
      <view class="quick-grid">
        <view class="standalone-entry quick-item" @tap="go('/pages/work/appointment')">
          <view class="standalone-icon quick-icon"><AppIcon name="cal" :size="18" /></view>
          <text class="quick-label">我的预约</text>
        </view>
        <view class="standalone-entry quick-item" @tap="go('/pages/work/repair-record')">
          <view class="standalone-icon quick-icon"><AppIcon name="wrench" :size="18" color="#8b5cf6" /></view>
          <text class="quick-label">维修记录</text>
        </view>
        <view class="standalone-entry quick-item" @tap="go('/pages/warranty/list')">
          <view class="standalone-icon quick-icon"><AppIcon name="shield" :size="18" color="#22c55e" /></view>
          <text class="quick-label">电子质保卡</text>
        </view>
      </view>

      <view class="standalone-entry" @tap="go('/pages/store/info')">
        <view class="standalone-icon"><AppIcon name="store" :size="18" /></view>
        <view class="standalone-info">
          <view class="standalone-title">门店信息</view>
          <view class="standalone-sub">小驹门店 · 80215001</view>
        </view>
        <text class="standalone-arrow">›</text>
      </view>

      <view class="standalone-entry" @tap="onSetting">
        <view class="standalone-icon"><AppIcon name="gauge" :size="18" color="#8b5cf6" /></view>
        <view class="standalone-info">
          <view class="standalone-title">系统设置</view>
          <view class="standalone-sub">版本 v2.0.1 · 更新</view>
        </view>
        <text class="standalone-arrow">›</text>
      </view>

      <view class="standalone-entry" @tap="onHelp">
        <view class="standalone-icon"><AppIcon name="alert" :size="18" color="#f59e0b" /></view>
        <view class="standalone-info">
          <view class="standalone-title">帮助中心</view>
          <view class="standalone-sub">常见问题 & 使用指南</view>
        </view>
        <text class="standalone-arrow">›</text>
      </view>

      <view class="btn-danger logout" @tap="onLogout">退出登录</view>
    </view>

    <AppTabBar active="mine" />
  </view>
</template>

<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import AppTabBar from '@/components/AppTabBar.vue'
import { go, toast, confirmDialog } from '@/utils/nav'

function onSetting() {
  toast('当前已是最新版本 v2.0.1')
}

function onHelp() {
  toast('帮助中心建设中')
}

function onLogout() {
  confirmDialog('退出登录', '确定退出当前账号？')
}
</script>

<style scoped>
.quick-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 16px;
}
.quick-item {
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px;
  margin-bottom: 0;
  text-align: center;
}
.quick-icon {
  margin-right: 0;
  width: 36px;
  height: 36px;
}
.quick-label {
  font-size: 12px;
  color: var(--text-main);
}
.logout {
  width: 100%;
  margin-top: 24px;
}
</style>
