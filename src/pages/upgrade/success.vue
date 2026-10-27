<template>
  <view class="app-page">
    <AppNav title="升级完成" fallback="/pages/home/index" />
    <view class="content success-content">
      <view class="success-icon">✓</view>
      <text class="success-title">升级成功</text>
      <text class="success-sub">固件已成功升级至 V1.9.0</text>

      <DetailCard class="success-card">
        <view class="card-pad">
          <KvRow label="车架号" value="LJGO2026050100123" />
          <KvRow label="升级前版本" value="V1.8.2" />
          <KvRow label="升级后版本" value="V1.9.0" value-color="var(--success)" />
          <KvRow label="升级耗时" value="4 分 12 秒" />
        </view>
      </DetailCard>

      <view class="btn-row" style="margin-top: 32px">
        <AppButton variant="secondary" @click="goHome">返回首页</AppButton>
        <AppButton @click="go('/pages/upgrade/vehicle-info')">完成</AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppNav from '@/components/AppNav.vue'
import AppButton from '@/components/AppButton.vue'
import DetailCard from '@/components/DetailCard.vue'
import KvRow from '@/components/KvRow.vue'
import { go, goHome } from '@/utils/nav'
</script>

<style scoped>
.success-content {
  padding-top: 40px;
  text-align: center;
}
.success-title {
  font-size: 20px;
  font-weight: 600;
  margin-top: 18px;
  color: var(--text-main);
  display: block;
}
.success-sub {
  font-size: 13px;
  color: var(--text-sub);
  margin-top: 6px;
  display: block;
}
.success-card {
  margin-top: 24px;
  text-align: left;
}
.card-pad {
  padding: 6px 16px;
}
</style>
