<template>
  <view class="app-page">
    <AppNav title="蓝牙报警器升级" fallback="/pages/home/index" />
    <view class="content">
      <ScanBox :height="160" icon="signal" hint="扫描报警器 SN 二维码" />
      <input class="form-input" style="margin-top: 16px" v-model="sn" placeholder="或手动输入报警器SN" />

      <view class="section-title">报警器信息</view>
      <DetailCard>
        <view class="card-pad">
          <KvRow label="设备 SN" value="BT-ALM-20260501" />
          <KvRow label="设备型号" value="ALM-Pro V2" />
          <KvRow label="当前版本" value="FW-V2.1" />
          <KvRow label="最新版本" value="FW-V2.3" value-color="var(--cyan)" />
          <KvRow label="绑定车辆" value="极光竞速版" />
          <KvRow label="连接状态">
            <text class="chip chip-success">● 已连接</text>
          </KvRow>
        </view>
      </DetailCard>

      <view class="btn-row">
        <AppButton variant="secondary" @click="goHome">返回</AppButton>
        <AppButton @click="go('/pages/upgrade/risk')">开始升级</AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppNav from '@/components/AppNav.vue'
import AppButton from '@/components/AppButton.vue'
import ScanBox from '@/components/ScanBox.vue'
import DetailCard from '@/components/DetailCard.vue'
import KvRow from '@/components/KvRow.vue'
import { go, goHome } from '@/utils/nav'

const sn = ref('BT-ALM-20260501-001')
</script>

<style scoped>
.card-pad {
  padding: 6px 16px;
}
</style>
