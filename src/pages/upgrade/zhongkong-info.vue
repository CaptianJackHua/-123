<template>
  <view class="app-page">
    <AppNav title="中控信息" fallback="/pages/upgrade/zhongkong-scan" />
    <view class="content">
      <DetailCard class="zk-head">
        <view class="zk-icon">
          <AppIcon name="monitor" :size="24" color="#c4b5fd" />
        </view>
        <text class="zk-title">中控屏幕 Pro</text>
        <text class="zk-sub">中控设备升级管理</text>
      </DetailCard>

      <view class="section-title">中控设备信息</view>
      <DetailCard>
        <view class="card-pad">
          <KvRow label="中控 SN" value="ZK-20260501-015" />
          <KvRow label="设备型号" value="ZK-Pro V3" />
          <KvRow label="当前固件" value="ZK-FW-V3.2.1" />
          <KvRow label="最新固件" value="ZK-FW-V3.4.0" value-color="var(--cyan)" />
          <KvRow label="屏幕分辨率" value="1920 × 1080" />
          <KvRow label="连接状态">
            <text class="chip chip-success">● 蓝牙已连接</text>
          </KvRow>
        </view>
      </DetailCard>

      <view class="btn-row">
        <AppButton variant="secondary" @click="go('/pages/upgrade/zhongkong-scan')">返回</AppButton>
        <AppButton @click="go('/pages/upgrade/risk')">开始升级</AppButton>
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
</script>

<style scoped>
.zk-head {
  padding: 20px;
  text-align: center;
}
.zk-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto;
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid var(--line);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zk-title {
  font-size: 15px;
  font-weight: 600;
  margin-top: 8px;
  color: var(--text-main);
  display: block;
}
.zk-sub {
  font-size: 12px;
  color: var(--text-sub);
  margin-top: 2px;
  display: block;
}
.card-pad {
  padding: 6px 16px;
}
</style>
