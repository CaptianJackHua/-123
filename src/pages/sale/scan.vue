<template>
  <ScanPage
    title="销售登记"
    sub="SCAN SALE CODE"
    hint="扫描车辆 / 合格证二维码"
    manual-label="或手动输入车架号"
    manual-value="LJGO2026102600456"
    icon="receipt"
    next="/pages/sale/form"
  />
</template>

<script setup lang="ts">
import ScanPage from '@/components/ScanPage.vue'
</script>
