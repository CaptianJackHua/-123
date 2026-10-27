<template>
  <view class="app-page">
    <AppNav title="固件升级" fallback="/pages/upgrade/vehicle-info" />
    <view class="content">
      <DetailCard class="firmware-head">
        <view class="fw-icon">
          <AppIcon name="up" :size="28" color="#ffffff" />
        </view>
        <text class="fw-title">检测到新固件</text>
        <text class="fw-sub">请确认后开始升级</text>
      </DetailCard>

      <view class="section-title">版本信息</view>
      <DetailCard>
        <view class="card-pad">
          <KvRow label="当前版本" value="V1.8.2" />
          <KvRow label="最新版本" value="V1.9.0" value-color="var(--cyan)" />
          <KvRow label="升级大小" value="12.6 MB" />
          <KvRow label="预计耗时" value="3-5 分钟" />
        </view>
      </DetailCard>

      <view class="section-title">更新说明</view>
      <DetailCard>
        <view class="update-list">
          <text class="update-item">• 优化蓝牙连接稳定性</text>
          <text class="update-item">• 修复部分车型电量显示异常</text>
          <text class="update-item">• 提升 OTA 升级成功率</text>
          <text class="update-item">• 新增 OTA 升级进度条</text>
        </view>
      </DetailCard>

      <view class="btn-row">
        <AppButton variant="secondary" @click="go('/pages/upgrade/vehicle-info')">取消升级</AppButton>
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
.firmware-head {
  padding: 24px;
  text-align: center;
}
.fw-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto;
  background: linear-gradient(135deg, var(--cyan), var(--blue));
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}
.fw-title {
  font-size: 16px;
  font-weight: 600;
  margin-top: 12px;
  color: var(--text-main);
  display: block;
}
.fw-sub {
  font-size: 12px;
  color: var(--text-sub);
  margin-top: 4px;
  display: block;
}
.card-pad {
  padding: 6px 16px;
}
.update-list {
  padding: 14px 16px;
}
.update-item {
  display: block;
  font-size: 13px;
  color: var(--text-main);
  line-height: 1.9;
}
</style>
