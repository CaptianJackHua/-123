<template>
  <ScanPage
    title="扫码升级"
    sub="SCAN VEHICLE CODE"
    hint="点击扫描车架号 / 车辆二维码"
    manual-label="或手动输入车架号 / SN"
    manual-value="LJGO2026050100123"
    :height="200"
    icon="camera"
    next="/pages/upgrade/vehicle-info"
    fallback="/pages/home/index"
  />
</template>

<script setup lang="ts">
import ScanPage from '@/components/ScanPage.vue'
</script>
