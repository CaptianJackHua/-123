<template>
  <view class="app-page">
    <AppNav title="部件质保" />
    <view class="content">
      <view class="page-tip">
        <text>共 6 个受保部件 · 点击可查看部件数据与更换记录</text>
      </view>
      <DetailCard title="部件列表">
        <PartRow v-for="key in PART_ORDER" :key="key" :part-key="key" />
      </DetailCard>
      <view class="note-warn">质保卡仅支持部件更换，不支持维修；更换后部件质保时间重新计算。</view>
      <view style="margin-top: 20px">
        <AppButton block @click="go('/pages/part/scan')">扫码更换配件</AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppNav from '@/components/AppNav.vue'
import AppButton from '@/components/AppButton.vue'
import DetailCard from '@/components/DetailCard.vue'
import PartRow from '@/components/PartRow.vue'
import { PART_ORDER } from '@/data/parts'
import { go } from '@/utils/nav'
</script>
