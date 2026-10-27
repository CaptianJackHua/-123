<template>
  <view class="app-page">
    <AppNav title="退货历史" fallback="/pages/return/scan" />
    <view class="content">
      <view class="page-tip">
        <AppIcon name="undo" :size="16" color="var(--danger)" />
        <text>共 {{ records.length }} 条退货作废记录</text>
      </view>

      <view v-for="item in records" :key="item.id" class="history-card">
        <view class="history-head">
          <view>
            <view class="history-title">{{ item.model }}</view>
            <view class="history-sub">质保卡号 {{ item.cardId }}</view>
          </view>
          <text class="chip chip-danger">已注销</text>
        </view>
        <view class="card-pad">
          <KvRow label="退货单号" :value="item.id" />
          <KvRow label="车架号" :value="item.vin" />
          <KvRow label="车主姓名" :value="item.owner" />
          <KvRow label="作废日期" :value="item.voidDate" />
          <KvRow label="作废原因" :value="item.reason" />
          <KvRow label="作废经销商编号" :value="item.dealerNo" />
          <KvRow label="作废经销商名称" :value="item.dealerName" />
          <KvRow label="作废门店编号" :value="item.storeNo" />
          <KvRow label="作废门店名称" :value="item.storeName" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppNav from '@/components/AppNav.vue'
import AppIcon from '@/components/AppIcon.vue'
import KvRow from '@/components/KvRow.vue'

const records = [
  {
    id: 'TH20261020003',
    cardId: 'BZ20260415003',
    model: '极光星际版',
    vin: 'LJGO2026041500088',
    owner: '朱继林',
    voidDate: '2026-10-20',
    reason: '7天无理由退货',
    dealerNo: 'JXS-80215001',
    dealerName: '无锡东亭极光专营店',
    storeNo: 'MD-80215001',
    storeName: '无锡东亭2路'
  },
  {
    id: 'TH20261012002',
    cardId: 'BZ20260308002',
    model: 'EB瀚海',
    vin: 'LJGO2026030800217',
    owner: '陈立',
    voidDate: '2026-10-12',
    reason: '型号不符',
    dealerNo: 'JXS-80215001',
    dealerName: '无锡东亭极光专营店',
    storeNo: 'MD-80215002',
    storeName: '无锡锡山门店'
  },
  {
    id: 'TH20260928001',
    cardId: 'BZ20260220001',
    model: '极光竞速版',
    vin: 'LJGO2026022000031',
    owner: '王敏',
    voidDate: '2026-09-28',
    reason: '质量问题退货',
    dealerNo: 'JXS-80215002',
    dealerName: '无锡梁溪极光经销商',
    storeNo: 'MD-80215003',
    storeName: '无锡梁溪门店'
  }
]
</script>

<style scoped>
.history-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  margin-bottom: 14px;
  overflow: hidden;
}
.history-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--line);
}
.history-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-main);
}
.history-sub {
  font-size: 11px;
  color: var(--text-sub);
  margin-top: 3px;
}
.card-pad {
  padding: 6px 16px;
}
</style>
