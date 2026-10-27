<template>
  <view class="app-page">
    <AppNav title="固件升级" fallback="/pages/upgrade/firmware" />
    <view class="content risk-content">
      <view class="risk-card">
        <view class="warning-icon">!</view>
        <text class="risk-title">风险提示</text>
        <view class="risk-box">
          <text class="risk-box-title">升级过程请注意：</text>
          <text class="risk-line">1. 升级过程请勿断电或关闭电源</text>
          <text class="risk-line">2. 保持车辆电量 30% 以上</text>
          <text class="risk-line">3. 预计耗时 3-5 分钟</text>
          <text class="risk-line risk-strong">4. 升级中断可能导致系统损坏！</text>
        </view>
        <view class="btn-row">
          <AppButton variant="secondary" @click="go('/pages/upgrade/firmware')">取消</AppButton>
          <AppButton @click="go('/pages/upgrade/progress')">我已知晓</AppButton>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppNav from '@/components/AppNav.vue'
import AppButton from '@/components/AppButton.vue'
import { go } from '@/utils/nav'
</script>

<style scoped>
.risk-content {
  padding-top: 60px;
}
.risk-card {
  background: #ffffff;
  border: 1px solid var(--line);
  box-shadow: 0 4px 16px rgba(31, 35, 41, 0.08);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
}
.risk-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--danger);
  margin-top: 14px;
  display: block;
}
.risk-box {
  text-align: left;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
  font-size: 13px;
  color: var(--text-main);
  line-height: 1.8;
}
.risk-box-title {
  color: var(--danger);
  font-weight: 600;
  margin-bottom: 4px;
  display: block;
}
.risk-line {
  display: block;
}
.risk-strong {
  color: var(--danger);
  font-weight: 600;
  margin-top: 6px;
}
</style>
