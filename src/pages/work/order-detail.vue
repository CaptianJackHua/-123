<template>
  <view class="app-page">
    <AppNav title="工单详情" />
    <view class="content">
      <view class="detail-card order-head">
        <view class="order-ico"><AppIcon name="wrench" :size="30" /></view>
        <view class="order-title">轮胎故障维修</view>
        <view style="margin-top: 8px">
          <text class="recent-status status-doing">维修中</text>
        </view>
      </view>

      <view class="section-title">工单信息</view>
      <DetailCard>
        <view class="card-pad">
          <KvRow label="工单号" value="WX2026050123891" />
          <KvRow label="客户姓名" value="朱继林" />
          <KvRow label="联系电话" value="13912345678" />
          <KvRow label="车架号" value="LJGO2026050100123" />
          <KvRow label="预约时间" value="2026-05-01 12:31" />
          <KvRow label="服务类型" value="轮胎故障" />
        </view>
      </DetailCard>

      <view class="section-title">处理记录</view>
      <DetailCard>
        <view class="timeline-box">
          <view class="timeline">
            <view class="tl-item done">
              <view class="tl-title">客户到店</view>
              <view class="tl-sub">2026-05-01 12:31</view>
            </view>
            <view class="tl-item done">
              <view class="tl-title">扫码确认车辆信息</view>
              <view class="tl-sub">12:33</view>
            </view>
            <view class="tl-item">
              <view class="tl-title">轮胎更换中</view>
              <view class="tl-sub">进行中 · 预计 13:00 完成</view>
            </view>
          </view>
        </view>
      </DetailCard>

      <view class="btn-row">
        <AppButton variant="secondary" @click="onContact">联系客户</AppButton>
        <AppButton @click="go('/pages/work/fill-form')">继续处理</AppButton>
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
import { go, toast } from '@/utils/nav'

function onContact() {
  toast('已联系客户')
}
</script>

<style scoped>
.order-head {
  text-align: center;
  padding: 20px;
}
.order-ico {
  display: flex;
  justify-content: center;
  color: #3b82f6;
}
.order-title {
  font-size: 15px;
  font-weight: 600;
  margin-top: 6px;
  color: var(--text-main);
}
.card-pad {
  padding: 6px 16px;
}
.timeline-box {
  padding: 16px;
}
</style>
