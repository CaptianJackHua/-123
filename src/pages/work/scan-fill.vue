<template>
  <ScanPage
    title="扫一扫"
    sub="SCAN QR CODE"
    hint="将摄像头对准二维码，即可自动扫描"
    manual-label="或手动输入车架号 / SN"
    manual-value="LJGO2026050100123"
    :height="260"
    next="/pages/work/fill-form"
  />
</template>

<script setup lang="ts">
import ScanPage from '@/components/ScanPage.vue'
</script>
