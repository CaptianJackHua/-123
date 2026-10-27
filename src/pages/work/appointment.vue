<template>
  <view class="app-page">
    <AppNav title="预约维修单" />
    <view class="content">
      <view class="filter-row">
        <view
          v-for="(t, i) in times"
          :key="t"
          class="filter-chip"
          :class="{ active: timeIndex === i }"
          @tap="timeIndex = i"
        >
          {{ t }}
        </view>
      </view>
      <view class="page-tip"><text>共 6 条预约 · 3 条待处理</text></view>

      <view v-for="item in list" :key="item.id" class="appt-card">
        <view class="appt-head">
          <view>
            <view class="appt-id">{{ item.id }}</view>
            <view class="appt-time">{{ item.time }}</view>
          </view>
          <text class="recent-status" :class="`status-${item.cls}`">{{ item.status }}</text>
        </view>
        <view class="appt-desc">车辆行驶时轮胎气压不足，客户咨询预约维修</view>
        <view class="appt-actions">
          <AppButton variant="secondary" size="small" @click="onCancel">取消预约</AppButton>
          <AppButton size="small" @click="go('/pages/work/order-detail')">查看工单</AppButton>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppNav from '@/components/AppNav.vue'
import AppButton from '@/components/AppButton.vue'
import { go, confirmDialog } from '@/utils/nav'

const times = ['全部时间', '近7天', '近30天']
const timeIndex = ref(0)

const list = [
  { id: 'WX2026050123891', time: '2026-05-01 上午', status: '待确认', cls: 'pending' },
  { id: 'WX2026042812389', time: '2026-04-28 上午', status: '已提交', cls: 'doing' },
  { id: 'WX2026042510892', time: '2026-04-25 12:31', status: '已确认', cls: 'doing' },
  { id: 'WX2026042212389', time: '2026-04-22 09:15', status: '已完成', cls: 'done' }
]

function onCancel() {
  confirmDialog('取消预约', '确定取消该预约单？')
}
</script>

<style scoped>
.appt-card {
  padding: 14px 16px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 10px;
  margin-bottom: 12px;
}
.appt-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.appt-id {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main);
}
.appt-time {
  font-size: 12px;
  color: var(--text-sub);
  margin-top: 3px;
}
.appt-desc {
  font-size: 12px;
  color: var(--text-sub);
  margin-top: 10px;
  background: var(--bg-deep);
  padding: 8px 10px;
  border-radius: 6px;
  line-height: 1.5;
}
.appt-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}
</style>
