<template>
  <view class="app-page">
    <AppNav title="确认部件" fallback="/pages/part/scan" />
    <view class="content">
      <view class="page-tip">
        <text>已识别部件信息，请核对后确认更换</text>
      </view>
      <DetailCard title="部件信息">
        <view class="card-pad">
          <KvRow label="部件名称" value="电池" value-color="var(--cyan)" />
          <KvRow label="部件型号" value="BAT-Li 48V 24Ah" />
          <KvRow label="部件 SN" value="BAT-20260501-005" />
          <KvRow label="所属质保卡" value="BZ20260501001" />
          <KvRow label="绑定车辆" value="极光竞速版" />
          <KvRow label="当前质保至" value="2029-05-01" />
          <KvRow label="历史更换" value="0 次" />
        </view>
      </DetailCard>
      <view class="note-warn">确认旧部件信息后，请扫描新部件二维码完成替换，质保时间将重新计算。</view>
      <view class="btn-row">
        <AppButton variant="secondary" @click="go('/pages/part/scan')">返回扫码</AppButton>
        <AppButton @click="go('/pages/part/new-scan?key=battery')">确认并扫描新部件</AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppNav from '@/components/AppNav.vue'
import AppButton from '@/components/AppButton.vue'
import DetailCard from '@/components/DetailCard.vue'
import KvRow from '@/components/KvRow.vue'
import { go } from '@/utils/nav'
</script>

<style scoped>
.card-pad {
  padding: 6px 16px;
}
</style>
