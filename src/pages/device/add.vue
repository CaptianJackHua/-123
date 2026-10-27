<template>
  <view class="app-page">
    <AppNav title="车辆加装设备" fallback="/pages/home/index" />
    <view class="content">
      <view class="section-title">加装设备信息</view>
      <DetailCard>
        <view class="card-pad">
          <view class="form-wrap">
            <text class="form-label">车架号</text>
            <input class="form-input" value="LJGO2026050100123" disabled />
          </view>
          <view class="form-wrap">
            <text class="form-label">设备类型</text>
            <AppPicker v-model="form.type" :options="deviceTypes" />
          </view>
          <view class="form-wrap">
            <text class="form-label">设备 SN</text>
            <input class="form-input" v-model="form.sn" placeholder="请输入设备SN" />
          </view>
          <view class="form-wrap last">
            <text class="form-label">安装位置</text>
            <input class="form-input" v-model="form.position" placeholder="请描述安装位置" />
          </view>
        </view>
      </DetailCard>

      <view class="section-title">关联质保卡信息</view>
      <DetailCard>
        <view class="card-pad">
          <KvRow label="质保卡号" value="BZ20260501001" />
          <KvRow label="质保卡状态">
            <text class="chip chip-success">● 有效</text>
          </KvRow>
          <KvRow label="整车质保至" value="2029-05-01" />
          <KvRow label="加装件质保" value="1 年" />
          <KvRow label="质保截止" value="2027-10-26" value-color="var(--cyan)" />
        </view>
        <view class="note-warn" style="margin: 12px 16px 16px">
          加装完成后将自动写入质保卡，生成该部件的质保条目并计算质保时间。
        </view>
      </DetailCard>

      <view class="section-title">已加装设备</view>
      <view class="recent-list">
        <view class="recent-item">
          <view class="recent-avatar">
            <AppIcon name="signal" :size="18" />
          </view>
          <view class="recent-body">
            <view class="recent-title">蓝牙报警器 ALM-Pro V2</view>
            <view class="recent-sub">BT-ALM-20260501 · 车把右侧 · 质保至 2028-05-01</view>
          </view>
          <AppIcon name="chevron" :size="14" color="#b6bdc9" />
        </view>
        <view class="recent-item">
          <view class="recent-avatar">
            <AppIcon name="chip" :size="18" />
          </view>
          <view class="recent-body">
            <view class="recent-title">TBOX TBOX-LTE V1</view>
            <view class="recent-sub">TBOX-20260501-007 · 坐垫下方 · 质保至 2029-05-01</view>
          </view>
          <AppIcon name="chevron" :size="14" color="#b6bdc9" />
        </view>
      </view>

      <view class="btn-row">
        <AppButton variant="secondary" @click="goHome">取消</AppButton>
        <AppButton @click="onSubmit">提交</AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import AppNav from '@/components/AppNav.vue'
import AppButton from '@/components/AppButton.vue'
import DetailCard from '@/components/DetailCard.vue'
import KvRow from '@/components/KvRow.vue'
import AppPicker from '@/components/AppPicker.vue'
import AppIcon from '@/components/AppIcon.vue'
import { go, goHome, toast } from '@/utils/nav'

const deviceTypes = ['蓝牙报警器', '中控屏幕', 'TBOX', 'GPS 定位器', '其他']

const form = reactive({
  type: deviceTypes[0],
  sn: 'DEV-20260501-008',
  position: '车把左侧'
})

function onSubmit() {
  if (!form.sn.trim()) {
    toast('请输入设备 SN')
    return
  }
  go('/pages/device/success')
}
</script>

<style scoped>
.card-pad {
  padding: 14px 16px 2px;
}
.form-wrap.last {
  margin-bottom: 12px;
}
</style>
