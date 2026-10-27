<template>
  <view class="app-page">
    <AppNav title="升级进度" fallback="/pages/upgrade/risk" />
    <view class="content">
      <view class="page-tip">
        <AppIcon name="signal" :size="16" color="var(--cyan)" />
        <text>升级进行中，请耐心等待</text>
      </view>

      <DetailCard class="progress-card">
        <AppIcon name="signal" :size="32" color="var(--cyan)" glow />
        <text class="progress-title">升级中 · {{ percent }}%</text>
        <text class="progress-sub">预计剩余 2 分钟</text>
        <view class="progress-track" style="margin-top: 16px">
          <view class="progress-fill" :style="{ width: percent + '%' }" />
        </view>
      </DetailCard>

      <view class="section-title">升级信息</view>
      <DetailCard>
        <view class="card-pad">
          <KvRow label="车架号" value="LJGO2026050100123" />
          <KvRow label="升级类型" value="固件 OTA" />
          <KvRow label="目标版本" value="V1.9.0" />
          <KvRow label="已用时" value="2 分 10 秒" />
        </view>
      </DetailCard>

      <view style="margin-top: 24px">
        <AppButton block @click="go('/pages/upgrade/success')">查看结果</AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppNav from '@/components/AppNav.vue'
import AppButton from '@/components/AppButton.vue'
import AppIcon from '@/components/AppIcon.vue'
import DetailCard from '@/components/DetailCard.vue'
import KvRow from '@/components/KvRow.vue'
import { go } from '@/utils/nav'

const percent = 68
</script>

<style scoped>
.progress-card {
  padding: 24px;
  text-align: center;
}
.progress-title {
  font-size: 16px;
  font-weight: 600;
  margin-top: 8px;
  color: var(--text-main);
  display: block;
}
.progress-sub {
  font-size: 12px;
  color: var(--text-sub);
  margin-top: 4px;
  display: block;
}
.card-pad {
  padding: 6px 16px;
}
</style>
