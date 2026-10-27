<template>
  <view class="app-page">
    <AppNav title="退货登记" fallback="/pages/return/scan" />
    <view class="content">
      <view class="page-tip">
        <text>已识别质保卡 BZ20260501001 · 请填写退货信息</text>
      </view>

      <view class="section-title">退货信息</view>
      <DetailCard>
        <view class="form-box">
          <view class="form-wrap">
            <text class="form-label">退货单号</text>
            <input class="form-input" value="TH20261026001" disabled />
          </view>
          <view class="form-wrap">
            <text class="form-label">质保卡号</text>
            <input class="form-input" value="BZ20260501001" disabled />
          </view>
          <view class="form-wrap">
            <text class="form-label">车架号</text>
            <input class="form-input" value="LJGO2026050100123" disabled />
          </view>
          <view class="form-wrap">
            <text class="form-label">车型</text>
            <input class="form-input" value="极光竞速版" disabled />
          </view>
          <view class="form-wrap">
            <text class="form-label">车主姓名</text>
            <input class="form-input" v-model="form.owner" />
          </view>
          <view class="form-wrap">
            <text class="form-label">联系电话</text>
            <input class="form-input" v-model="form.phone" />
          </view>
          <view class="form-wrap">
            <text class="form-label">退货原因</text>
            <AppPicker v-model="form.reason" :options="reasons" />
          </view>
          <view class="form-wrap">
            <text class="form-label">退货日期</text>
            <input class="form-input" v-model="form.date" />
          </view>
          <view class="form-wrap">
            <text class="form-label">经办人</text>
            <input class="form-input" v-model="form.handler" />
          </view>
          <view class="form-wrap last">
            <text class="form-label">备注</text>
            <textarea class="form-textarea" v-model="form.remark" />
          </view>
        </view>
      </DetailCard>

      <view class="note-warn">提交后退货登记完成，该电子质保卡将自动注销并终止质保。</view>

      <view class="btn-row">
        <AppButton variant="secondary" @click="go('/pages/return/scan')">取消</AppButton>
        <AppButton @click="go('/pages/return/success')">提交退货登记</AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import AppNav from '@/components/AppNav.vue'
import AppButton from '@/components/AppButton.vue'
import DetailCard from '@/components/DetailCard.vue'
import AppPicker from '@/components/AppPicker.vue'
import { go } from '@/utils/nav'

const reasons = ['7天无理由退货', '质量问题退货', '型号不符', '客户取消购买', '其他']

const form = reactive({
  owner: '朱继林',
  phone: '13800006688',
  reason: reasons[0],
  date: '2026-10-26',
  handler: '李得龙',
  remark: '车辆未上牌，整车及配件齐全'
})
</script>

<style scoped>
.form-box {
  padding: 14px 16px 2px;
}
.form-wrap.last {
  margin-bottom: 12px;
}
</style>
