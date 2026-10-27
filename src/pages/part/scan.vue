<template>
  <ScanPage
    title="更换配件"
    sub="SCAN OLD PART CODE"
    hint="扫描旧部件二维码"
    manual-label="或手动输入旧部件SN"
    manual-value="BAT-20260501-005"
    :height="240"
    icon="swap"
    next="/pages/part/confirm?key=battery"
    extra-label="没有旧部件？查询车辆"
    extra-next="/pages/warranty/list"
  />
</template>

<script setup lang="ts">
import ScanPage from '@/components/ScanPage.vue'
</script>
