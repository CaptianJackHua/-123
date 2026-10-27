<template>
  <view class="app-page">
    <AppNav title="更换完成" fallback="/pages/warranty/detail" />
    <view class="content success-wrap">
      <view class="success-icon">
        <AppIcon name="check" :size="38" color="#ffffff" />
      </view>
      <view class="success-title">更换完成</view>
      <view class="success-sub">部件质保时间已更新</view>

      <DetailCard class="result-card">
        <view class="card-pad">
          <KvRow label="部件名称" value="电池" />
          <KvRow label="新部件 SN" value="BAT-20261026-018" />
          <KvRow label="质保起始" value="2026-10-26" />
          <KvRow label="质保截止" value="2029-10-26" value-color="var(--success)" />
          <KvRow label="质保方式" value="只换不修" />
          <KvRow label="更换次数" value="1 次" />
        </view>
      </DetailCard>

      <view class="btn-row">
        <AppButton variant="secondary" @click="goHome">返回首页</AppButton>
        <AppButton @click="go('/pages/part/detail?key=battery')">查看部件详情</AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppNav from '@/components/AppNav.vue'
import AppIcon from '@/components/AppIcon.vue'
import AppButton from '@/components/AppButton.vue'
import DetailCard from '@/components/DetailCard.vue'
import KvRow from '@/components/KvRow.vue'
import { go, goHome } from '@/utils/nav'
</script>

<style scoped>
.success-wrap {
  padding-top: 32px;
  text-align: center;
}
.success-title {
  font-size: 20px;
  font-weight: 600;
  margin-top: 18px;
  color: var(--text-main);
}
.success-sub {
  font-size: 13px;
  color: var(--text-sub);
  margin-top: 6px;
}
.result-card {
  margin-top: 24px;
  text-align: left;
}
.card-pad {
  padding: 6px 16px;
}
</style>
