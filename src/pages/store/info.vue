<template>
  <view class="app-page">
    <AppNav title="门店信息" fallback="/pages/home/index" />
    <view class="content">
      <view class="warranty-card" style="cursor: default">
        <view class="wc-head">
          <view class="wc-logo">
            <AppIcon name="store" :size="24" color="#ffffff" />
          </view>
          <view>
            <view class="wc-title">小驹门店</view>
            <view class="wc-sub">STORE CODE · 80215001</view>
          </view>
        </view>
        <view class="wc-body">
          <view>
            <text class="wc-big">4.9</text>
            <text class="wc-big-unit">分 / 40次评价</text>
            <view class="store-grade">A级授权经销商</view>
          </view>
        </view>
      </view>

      <DetailCard title="基本信息">
        <view class="card-pad">
          <KvRow label="店铺编号" value="80215001" />
          <KvRow label="店铺名称" value="无锡东亭2路" />
          <KvRow label="地址" value="江苏省无锡市锡山区东亭路121号" />
          <KvRow label="负责人" value="李得龙" />
          <KvRow label="联系方式" value="13912345678" />
          <KvRow label="营业时间" value="周一至周五 08:00-17:00" />
        </view>
      </DetailCard>

      <DetailCard title="评价 (2)">
        <view class="review-item">
          <view class="profile-avatar review-avatar">李</view>
          <view class="review-body">
            <view class="review-name">李*才</view>
            <view class="review-date">2025-04-08</view>
          </view>
          <text class="chip chip-warning">★ 4.9</text>
        </view>
        <view class="review-text">服务非常好，修的很快，师傅很专业</view>
        <view class="review-item review-second">
          <view class="profile-avatar review-avatar review-avatar-green">W</view>
          <view class="review-body">
            <view class="review-name">W**</view>
            <view class="review-date">2025-04-09</view>
          </view>
          <text class="chip chip-warning">★ 5.0</text>
        </view>
        <view class="review-text">师傅实在是太好了，还加班帮我修好了</view>
      </DetailCard>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppNav from '@/components/AppNav.vue'
import AppIcon from '@/components/AppIcon.vue'
import DetailCard from '@/components/DetailCard.vue'
import KvRow from '@/components/KvRow.vue'
</script>

<style scoped>
.card-pad {
  padding: 6px 16px;
}
.store-grade {
  font-size: 11px;
  color: var(--text-sub);
  margin-top: 4px;
}
.review-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px 0;
}
.review-second {
  border-top: 1px solid var(--line);
  padding-top: 14px;
}
.review-avatar {
  width: 32px;
  height: 32px;
  font-size: 14px;
}
.review-avatar-green {
  background: linear-gradient(135deg, var(--success), #16a34a);
}
.review-body {
  flex: 1;
}
.review-name {
  font-size: 13px;
  color: var(--text-main);
}
.review-date {
  font-size: 11px;
  color: var(--text-sub);
}
.review-text {
  font-size: 12px;
  color: var(--text-main);
  margin: 8px 16px 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line);
  line-height: 1.6;
}
</style>
