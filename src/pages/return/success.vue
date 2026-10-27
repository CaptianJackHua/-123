<template>
  <view class="app-page">
    <AppNav title="退货登记完成" />
    <view class="content success-wrap">
      <view class="success-icon">
        <AppIcon name="check" :size="38" color="#ffffff" />
      </view>
      <view class="success-title">退货登记完成</view>
      <view class="success-sub">电子质保卡已注销</view>

      <DetailCard class="result-card">
        <view class="card-pad">
          <KvRow label="退货单号" value="TH20261026001" />
          <KvRow label="质保卡号" value="BZ20260501001" />
          <KvRow label="退货日期" value="2026-10-26" />
          <KvRow label="质保卡状态">
            <text class="chip chip-danger">已注销</text>
          </KvRow>
        </view>
      </DetailCard>

      <view class="history-link" @tap="go('/pages/return/history')">
        <text class="link-text">查看历史退货记录 ›</text>
      </view>

      <view class="btn-row">
        <AppButton variant="secondary" @click="goHome">返回首页</AppButton>
        <AppButton @click="onPrint">打印凭证</AppButton>
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
import { go, goHome, toast } from '@/utils/nav'

function onPrint() {
  toast('退货凭证已发送至车主手机')
}
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
.history-link {
  margin-top: 14px;
  text-align: center;
}
</style>
