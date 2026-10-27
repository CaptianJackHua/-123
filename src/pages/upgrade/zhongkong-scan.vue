<template>
  <ScanPage
    title="中控升级"
    sub="SCAN CENTER CODE"
    hint="点击扫描中控二维码"
    manual-label="或手动输入中控SN"
    manual-value="ZK-20260501-015"
    :height="220"
    icon="monitor"
    next="/pages/upgrade/zhongkong-info"
    fallback="/pages/home/index"
  />
</template>

<script setup lang="ts">
import ScanPage from '@/components/ScanPage.vue'
</script>
