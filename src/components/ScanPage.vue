<template>
  <view class="app-page">
    <AppNav :title="title" :fallback="fallback" />
    <view class="content">
      <view class="scan-sub">{{ sub }}</view>
      <ScanBox :height="height" :hint="hint" :icon="icon" />
      <view v-if="extraLabel" class="scan-extra" @tap="onExtra">
        <text>{{ extraLabel }}</text>
        <AppIcon name="chevron" :size="14" color="#3b82f6" />
      </view>
      <view class="manual-row">
        <input class="form-input" :placeholder="manualLabel" :value="manualValue" />
        <view class="manual-btn btn-secondary">
          <AppIcon name="search" :size="16" />
        </view>
      </view>
      <view class="btn-row">
        <view class="btn-secondary" @tap="onCancel">取消</view>
        <view class="btn-primary" @tap="onConfirm">确定</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppNav from './AppNav.vue'
import ScanBox from './ScanBox.vue'
import AppIcon from './AppIcon.vue'
import { go, goBack } from '@/utils/nav'

const props = withDefaults(
  defineProps<{
    title: string
    sub: string
    hint?: string
    manualLabel?: string
    manualValue?: string
    height?: number
    icon?: string
    next: string
    fallback?: string
    extraLabel?: string
    extraNext?: string
  }>(),
  {
    hint: '将二维码放入框内，即可自动扫描',
    manualLabel: '或手动输入',
    manualValue: '',
    height: 220,
    icon: 'scan',
    fallback: '/pages/home/index',
    extraLabel: '',
    extraNext: ''
  }
)

function onExtra() {
  if (props.extraNext) go(props.extraNext)
}

function onCancel() {
  goBack(props.fallback)
}

function onConfirm() {
  go(props.next)
}
</script>

<style scoped>
.scan-sub {
  text-align: center;
  margin-bottom: 14px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--text-sub);
}
.manual-row {
  display: flex;
  gap: 10px;
  margin-top: 16px;
  align-items: center;
}
.scan-extra {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 12px;
  font-size: 13px;
  color: var(--cyan);
}
.manual-btn {
  width: 46px;
  flex: none;
  padding: 0;
}
</style>
