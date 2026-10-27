<template>
  <view class="app-page">
    <AppNav title="质保卡查询" />
    <view class="content">
      <view class="page-tip">
        <AppIcon name="shield" :size="16" />
        <text>扫码车辆 / 部件二维码，或输入车主手机号查询</text>
      </view>

      <view class="section-title">扫码查询</view>
      <view @tap="onScan">
        <ScanBox :height="180" icon="scan" hint="点击扫描车辆 / 部件二维码" />
      </view>
      <view class="scan-tip">扫描车辆或部件二维码后，直接显示质保卡详情</view>
      <view style="margin-top: 12px">
        <AppButton block @click="onScan">查询质保信息</AppButton>
      </view>

      <view class="section-title">手机号查询</view>
      <view class="card-white">
        <view class="form-wrap last">
          <text class="form-label">车主手机号</text>
          <view class="phone-row">
            <input
              class="form-input phone-input"
              type="number"
              maxlength="11"
              v-model="phone"
              placeholder="请输入车主手机号"
            />
            <view class="query-btn btn-primary" @tap="onQuery">查询</view>
          </view>
        </view>
      </view>

      <view class="query-hint">查询结果为该用户名下的全部车辆，点击车辆即可查看质保信息。</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppNav from '@/components/AppNav.vue'
import AppIcon from '@/components/AppIcon.vue'
import AppButton from '@/components/AppButton.vue'
import ScanBox from '@/components/ScanBox.vue'
import { go, toast } from '@/utils/nav'

const phone = ref('')

function onScan() {
  go('/pages/warranty/detail?id=BZ20260501001')
}

function onQuery() {
  const value = phone.value.trim()
  if (!value) {
    toast('请输入车主手机号')
    return
  }
  if (value.length !== 11) {
    toast('请输入 11 位手机号')
    return
  }
  go('/pages/warranty/result?type=phone&phone=' + value)
}
</script>

<style scoped>
.scan-tip {
  text-align: center;
  font-size: 12px;
  color: var(--text-sub);
  margin-top: 10px;
}
.phone-row {
  display: flex;
  gap: 10px;
  align-items: center;
}
.phone-input {
  flex: 1;
}
.query-btn {
  flex: none;
  width: 76px;
  height: 42px;
  padding: 0;
  font-size: 14px;
  border-radius: 8px;
}
.query-hint {
  font-size: 12px;
  color: var(--text-sub);
  line-height: 1.7;
  margin-top: 14px;
}
.form-wrap.last {
  margin-bottom: 0;
}
</style>
