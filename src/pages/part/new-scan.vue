<template>
  <ScanPage
    title="扫码新部件"
    sub="SCAN NEW PART CODE"
    hint="扫描新部件二维码"
    manual-label="或手动输入新部件SN"
    manual-value="BAT-20261026-018"
    :height="240"
    icon="box"
    next="/pages/part/replace?key=battery"
    fallback="/pages/part/confirm?key=battery"
  />
</template>

<script setup lang="ts">
import ScanPage from '@/components/ScanPage.vue'
</script>
