<template>
  <view class="app-page">
    <AppNav title="车辆信息" fallback="/pages/upgrade/scan" />
    <view class="content">
      <view class="page-tip">
        <AppIcon name="check" :size="16" color="var(--cyan)" />
        <text>查询成功 · 已找到对应车辆信息</text>
      </view>

      <DetailCard title="车辆基础信息">
        <view class="card-pad">
          <KvRow label="车架号" value="LJGO2026050100123" />
          <KvRow label="SN" value="SN20260501001" />
          <KvRow label="车型" value="极光竞速版" />
          <KvRow label="版本号" value="V1.8.2" />
          <KvRow label="硬件版本" value="HW-V2.3" />
          <KvRow label="软件版本" value="SW-V1.8.2" />
          <KvRow label="升级状态">
            <text class="chip chip-warning">待升级</text>
          </KvRow>
        </view>
      </DetailCard>

      <view class="btn-row">
        <AppButton variant="secondary" @click="onRefresh">刷新</AppButton>
        <AppButton @click="go('/pages/upgrade/firmware')">固件升级</AppButton>
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
import { go, toast } from '@/utils/nav'

function onRefresh() {
  toast('信息已刷新', 'success')
}
</script>

<style scoped>
.card-pad {
  padding: 6px 16px;
}
</style>
