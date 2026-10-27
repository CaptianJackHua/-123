<template>
  <view class="app-page">
    <AppNav title="维修记录" />
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
      <view class="filter-row">
        <view
          v-for="(s, i) in states"
          :key="s"
          class="filter-chip"
          :class="{ active: stateIndex === i }"
          @tap="stateIndex = i"
        >
          {{ s }}
        </view>
      </view>

      <view class="recent-list">
        <view
          v-for="item in list"
          :key="item.id"
          class="recent-item"
          @tap="go('/pages/work/order-detail')"
        >
          <view
            class="recent-avatar"
            :style="{
              background: item.cls === 'done' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
              color: item.cls === 'done' ? 'var(--success)' : 'var(--danger)'
            }"
          >
            <AppIcon name="wrench" :size="18" />
          </view>
          <view class="recent-body">
            <view class="recent-title">{{ item.id }}</view>
            <view class="recent-sub">{{ item.time }} · {{ item.desc }}</view>
          </view>
          <text class="recent-status" :class="`status-${item.cls}`">{{ item.status }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppNav from '@/components/AppNav.vue'
import AppIcon from '@/components/AppIcon.vue'
import { go } from '@/utils/nav'

const times = ['全部时间', '近7天', '近30天']
const states = ['全部状态', '已解决', '未解决']
const timeIndex = ref(0)
const stateIndex = ref(0)

const list = [
  { id: 'WX2026050213891', status: '已解决', cls: 'done', time: '2026-05-02 12:11', desc: '轮胎故障、仪表故障、控制器故障、发动机故障' },
  { id: 'WX2026042812389', status: '未解决', cls: 'pending', time: '2026-04-28 09:30', desc: '轮胎故障、仪表故障、控制器故障、发动机故障' },
  { id: 'WX2026042510892', status: '已解决', cls: 'done', time: '2026-04-25 18:22', desc: '轮胎故障、仪表故障、控制器故障' },
  { id: 'WX2026042212389', status: '已解决', cls: 'done', time: '2026-04-22 12:11', desc: '轮胎故障、仪表故障、控制器故障、发动机故障' }
]
</script>

<style scoped>
.filter-row {
  margin-bottom: 10px;
}
</style>
