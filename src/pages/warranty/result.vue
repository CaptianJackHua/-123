<template>
  <view class="app-page">
    <AppNav title="查询结果" fallback="/pages/warranty/list" />
    <view class="content">
      <view class="page-tip">
        <AppIcon name="check" :size="16" color="var(--cyan)" />
        <text>共查询到 {{ vehicles.length }} 台车辆</text>
      </view>

      <view
        v-for="item in vehicles"
        :key="item.cardId"
        class="recent-item vehicle-item"
        @tap="openDetail(item.cardId)"
      >
        <view class="recent-avatar">
          <AppIcon name="shield" :size="18" />
        </view>
        <view class="recent-body">
          <view class="recent-title">{{ item.model }}</view>
          <view class="recent-sub">{{ item.owner }} · {{ item.vin }}</view>
          <view class="recent-sub">{{ item.cardId }} · 质保至 {{ item.end }}</view>
        </view>
        <view class="vehicle-right">
          <text class="chip chip-success">有效</text>
          <AppIcon name="chevron" :size="14" color="#b6bdc9" />
        </view>
      </view>

      <view class="result-hint">点击车辆查看电子质保卡、部件质保与更换记录。</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppNav from '@/components/AppNav.vue'
import AppIcon from '@/components/AppIcon.vue'
import { go } from '@/utils/nav'

const vehicles = [
  {
    cardId: 'BZ20260501001',
    model: '极光竞速版',
    owner: '朱继林',
    vin: 'LJGO2026050100123',
    end: '2029-05-01'
  },
  {
    cardId: 'BZ20260415003',
    model: '极光星际版',
    owner: '朱继林',
    vin: 'LJGO2026041500088',
    end: '2029-04-15'
  },
  {
    cardId: 'BZ20260308002',
    model: 'EB瀚海',
    owner: '陈立',
    vin: 'LJGO2026030800217',
    end: '2029-03-08'
  }
]

function openDetail(cardId: string) {
  go('/pages/warranty/detail?id=' + cardId)
}
</script>

<style scoped>
.vehicle-item {
  align-items: flex-start;
}
.vehicle-item .recent-body {
  gap: 2px;
}
.vehicle-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
}
.result-hint {
  font-size: 12px;
  color: var(--text-sub);
  margin-top: 14px;
  line-height: 1.7;
}
</style>
