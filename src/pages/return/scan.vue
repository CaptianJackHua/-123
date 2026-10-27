<template>
  <ScanPage
    title="退货登记"
    sub="SCAN WARRANTY CARD"
    hint="扫描质保卡 / 车辆二维码"
    manual-label="或手动输入质保卡号"
    manual-value="BZ20260501001"
    icon="undo"
    next="/pages/return/form"
    extra-label="查看历史退货记录"
    extra-next="/pages/return/history"
  />
</template>

<script setup lang="ts">
import ScanPage from '@/components/ScanPage.vue'
</script>
