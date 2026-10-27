<template>
  <view class="app-page with-tab">
    <view class="banner">
      <view class="banner-welcome">HI，李先生</view>
      <view class="banner-title">小驹门店</view>
      <view class="banner-sub">无锡市梁溪区绿驹售后服务中心 · 极光授权经销商</view>
    </view>

    <view class="stat-row">
      <view class="stat-card" @tap="go('/pages/work/appointment')">
        <view class="stat-num orange">12</view>
        <view class="stat-label">待处理工单 ›</view>
      </view>
      <view class="stat-card" @tap="go('/pages/work/appointment')">
        <view class="stat-num cyan">6</view>
        <view class="stat-label">今日预约 ›</view>
      </view>
      <view class="stat-card" @tap="go('/pages/work/repair-record')">
        <view class="stat-num green">36</view>
        <view class="stat-label">本月完成 ›</view>
      </view>
    </view>

    <view class="content">
      <!-- 电子质保卡 -->
      <view class="section-title">电子质保卡</view>
      <view class="warranty-card" @tap="go('/pages/warranty/list')">
        <view class="wc-head">
          <view class="wc-logo">
            <AppIcon name="shield" :size="24" color="#ffffff" />
          </view>
          <view>
            <view class="wc-title">电子质保卡</view>
            <view class="wc-sub">WARRANTY CARD MANAGEMENT</view>
          </view>
          <view class="wc-arrow" style="margin-left: auto">›</view>
        </view>
        <view class="wc-body">
          <view>
            <text class="wc-big">3</text><text class="wc-big-unit">张已激活</text>
            <view class="wc-note">今日新增 1 张 · 累计登记 28 张</view>
          </view>
        </view>
      </view>

      <view class="wcard-menu">
        <view class="wcard-entry" @tap="go('/pages/sale/scan')">
          <view class="wcard-entry-icon"><AppIcon name="receipt" :size="18" /></view>
          <view class="wcard-entry-label">销售登记</view>
        </view>
        <view class="wcard-entry" @tap="go('/pages/return/scan')">
          <view class="wcard-entry-icon"><AppIcon name="undo" :size="18" /></view>
          <view class="wcard-entry-label">退货登记</view>
        </view>
        <view class="wcard-entry" @tap="go('/pages/warranty/list')">
          <view class="wcard-entry-icon"><AppIcon name="search" :size="18" /></view>
          <view class="wcard-entry-label">质保卡查询</view>
        </view>
        <view class="wcard-entry" @tap="go('/pages/part/scan')">
          <view class="wcard-entry-icon"><AppIcon name="swap" :size="18" /></view>
          <view class="wcard-entry-label">更换配件</view>
        </view>
      </view>

      <!-- 售后工单 -->
      <view class="section-title">售后工单服务</view>
      <view class="menu-grid">
        <view class="menu-item" @tap="go('/pages/work/scan-fill')">
          <view class="menu-icon"><AppIcon name="scan" :size="22" color="#3b82f6" /></view>
          <view class="menu-label">扫码填写</view>
        </view>
        <view class="menu-item menu-green" @tap="go('/pages/work/appointment')">
          <view class="menu-icon"><AppIcon name="cal" :size="22" color="#22c55e" /></view>
          <view class="menu-label">预约维修单</view>
          <view class="badge-num">6</view>
        </view>
        <view class="menu-item" @tap="go('/pages/work/repair-record')">
          <view class="menu-icon"><AppIcon name="clip" :size="22" color="#3b82f6" /></view>
          <view class="menu-label">维修记录</view>
        </view>
      </view>

      <!-- 售后服务 -->
      <view class="section-title">售后服务</view>
      <view class="menu-grid">
        <view class="menu-item menu-green" @tap="go('/pages/upgrade/scan')">
          <view class="menu-icon"><AppIcon name="up" :size="22" color="#22c55e" /></view>
          <view class="menu-label">固件升级</view>
        </view>
        <view class="menu-item" @tap="go('/pages/upgrade/bt')">
          <view class="menu-icon"><AppIcon name="signal" :size="22" color="#3b82f6" /></view>
          <view class="menu-label">蓝牙报警器升级</view>
        </view>
        <view class="menu-item menu-green" @tap="go('/pages/upgrade/zhongkong-scan')">
          <view class="menu-icon"><AppIcon name="monitor" :size="22" color="#22c55e" /></view>
          <view class="menu-label">中控升级</view>
        </view>
        <view class="menu-item" @tap="go('/pages/device/add')">
          <view class="menu-icon"><AppIcon name="plug" :size="22" color="#3b82f6" /></view>
          <view class="menu-label">加装设备</view>
        </view>
        <view class="menu-item menu-green" @tap="go('/pages/vehicle/change-model')">
          <view class="menu-icon"><AppIcon name="swap" :size="22" color="#22c55e" /></view>
          <view class="menu-label">更换车型</view>
        </view>
        <view class="menu-item" @tap="go('/pages/upgrade/scan')">
          <view class="menu-icon"><AppIcon name="search" :size="22" color="#3b82f6" /></view>
          <view class="menu-label">车辆信息查询</view>
        </view>
      </view>

      <!-- 门店信息 -->
      <view class="section-title">门店信息</view>
      <view class="standalone-entry" @tap="go('/pages/store/info')">
        <view class="standalone-icon"><AppIcon name="store" :size="20" /></view>
        <view class="standalone-info">
          <view class="standalone-title">小驹门店 · 无锡东亭2路</view>
          <view class="standalone-sub">门店编号 80215001 · A级授权</view>
        </view>
        <text class="standalone-arrow">›</text>
      </view>

      <!-- 最近工单 -->
      <view class="section-title">最近工单</view>
      <view class="recent-list">
        <view class="recent-item" @tap="go('/pages/work/order-detail')">
          <view class="recent-avatar"><AppIcon name="wrench" :size="18" /></view>
          <view class="recent-body">
            <view class="recent-title">WX2026050123891 · 轮胎故障</view>
            <view class="recent-sub">朱继林 · 2026-05-01 12:31</view>
          </view>
          <text class="recent-status status-doing">维修中</text>
        </view>
        <view class="recent-item" @tap="go('/pages/work/order-detail')">
          <view class="recent-avatar"><AppIcon name="wrench" :size="18" /></view>
          <view class="recent-body">
            <view class="recent-title">WX2026042812389 · 仪表故障</view>
            <view class="recent-sub">王师傅 · 2026-04-28 09:15</view>
          </view>
          <text class="recent-status status-done">已解决</text>
        </view>
        <view class="recent-item" @tap="go('/pages/warranty/detail')">
          <view class="recent-avatar"><AppIcon name="shield" :size="18" /></view>
          <view class="recent-body">
            <view class="recent-title">质保卡登记 · BZ20260501001</view>
            <view class="recent-sub">销售登记 · 2026-05-01 10:30</view>
          </view>
          <text class="recent-status status-done">已激活</text>
        </view>
      </view>
    </view>

    <AppTabBar active="home" />
  </view>
</template>

<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import AppTabBar from '@/components/AppTabBar.vue'
import { go } from '@/utils/nav'
</script>

<style scoped>
.banner {
  padding-top: calc(20px + env(safe-area-inset-top));
}
.wc-note {
  font-size: 11px;
  color: var(--text-sub);
  margin-top: 4px;
}
</style>
