<template>
  <view class="app-page">
    <AppNav title="加装完成" fallback="/pages/home/index" />
    <view class="content success-content">
      <view class="success-icon">✓</view>
      <view class="success-title">加装完成</view>
      <view class="success-sub">设备已写入车辆档案，质保信息已更新</view>

      <DetailCard class="success-card">
        <view class="card-pad">
          <KvRow label="设备名称" value="蓝牙报警器" />
          <KvRow label="设备 SN" value="DEV-20260501-008" />
          <KvRow label="安装位置" value="车把左侧" />
          <KvRow label="质保卡号" value="BZ20260501001" />
          <KvRow label="加装件质保" value="1 年" />
          <KvRow label="质保截止" value="2027-10-26" value-color="var(--success)" />
        </view>
      </DetailCard>

      <view class="btn-row">
        <AppButton variant="secondary" @click="goHome">返回首页</AppButton>
        <AppButton @click="go('/pages/part/detail?key=alarm')">查看部件质保</AppButton>
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
  padding-top: 32px;
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
