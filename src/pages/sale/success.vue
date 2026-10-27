<template>
  <view class="app-page">
    <AppNav title="销售登记完成" />
    <view class="content success-wrap">
      <view class="success-icon">
        <AppIcon name="check" :size="38" color="#ffffff" />
      </view>
      <view class="success-title">登记成功</view>
      <view class="success-sub">电子质保卡已激活</view>

      <DetailCard class="result-card">
        <view class="card-pad">
          <KvRow label="质保卡号" value="BZ20261026004" />
          <KvRow label="车架号" value="LJGO2026102600456" />
          <KvRow label="销售日期" value="2026-10-26" />
          <KvRow label="质保截止" value="2029-10-26" value-color="var(--success)" />
          <KvRow label="受保部件" value="6 个" />
          <KvRow label="发票影像">
            <text class="chip" :class="invoiceUploaded ? 'chip-success' : 'chip-warning'">
              {{ invoiceUploaded ? '已上传' : '待补传' }}
            </text>
          </KvRow>
        </view>
      </DetailCard>

      <view v-if="!invoiceUploaded" class="upload-note" @tap="openCard">
        发票未上传，可进入质保卡详情补上传 ›
      </view>

      <view class="btn-row">
        <AppButton variant="secondary" @click="goHome">返回首页</AppButton>
        <AppButton @click="openCard">查看质保卡</AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import AppNav from '@/components/AppNav.vue'
import AppIcon from '@/components/AppIcon.vue'
import AppButton from '@/components/AppButton.vue'
import DetailCard from '@/components/DetailCard.vue'
import KvRow from '@/components/KvRow.vue'
import { go, goHome } from '@/utils/nav'

const invoiceUploaded = ref(true)

onLoad((options) => {
  invoiceUploaded.value = options?.invoice !== '0'
})

function openCard() {
  go('/pages/warranty/detail?invoice=' + (invoiceUploaded.value ? '1' : '0'))
}
</script>

<style scoped>
.success-wrap {
  padding-top: 32px;
  text-align: center;
}
.success-title {
  font-size: 20px;
  font-weight: 600;
  margin-top: 18px;
  color: var(--text-main);
}
.success-sub {
  font-size: 13px;
  color: var(--text-sub);
  margin-top: 6px;
}
.result-card {
  margin-top: 24px;
  text-align: left;
}
.card-pad {
  padding: 6px 16px;
}
.upload-note {
  margin-top: 14px;
  font-size: 12px;
  color: var(--cyan);
}
</style>
