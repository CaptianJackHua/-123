<template>
  <view class="app-page">
    <AppNav title="替换确认" fallback="/pages/part/new-scan" />
    <view class="content">
      <view class="section-title">更换信息</view>
      <DetailCard>
        <view class="form-box">
          <view class="form-wrap">
            <text class="form-label">部件名称</text>
            <input class="form-input" value="电池" disabled />
          </view>
          <view class="form-wrap">
            <text class="form-label">原部件 SN</text>
            <input class="form-input" value="BAT-20260501-005" disabled />
          </view>
          <view class="form-wrap">
            <text class="form-label">新部件 SN</text>
            <input class="form-input" v-model="newSn" placeholder="请输入新部件SN" />
          </view>
          <view class="form-wrap">
            <text class="form-label">更换原因</text>
            <AppPicker v-model="reason" :options="reasons" />
          </view>
          <view class="form-wrap">
            <text class="form-label">更换日期</text>
            <input class="form-input" v-model="date" />
          </view>
          <view class="form-wrap last">
            <text class="form-label">操作技师</text>
            <input class="form-input" v-model="engineer" />
          </view>
        </view>
      </DetailCard>

      <view class="section-title">质保更新预览</view>
      <DetailCard>
        <view class="card-pad">
          <KvRow label="原质保截止" value="2029-05-01" />
          <KvRow label="新质保起始" :value="date" />
          <KvRow label="新质保截止" value="2029-10-26" value-color="var(--success)" />
        </view>
      </DetailCard>

      <view class="btn-row">
        <AppButton variant="secondary" @click="go('/pages/part/new-scan')">取消</AppButton>
        <AppButton @click="onSubmit">确认替换</AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppNav from '@/components/AppNav.vue'
import AppButton from '@/components/AppButton.vue'
import DetailCard from '@/components/DetailCard.vue'
import KvRow from '@/components/KvRow.vue'
import AppPicker from '@/components/AppPicker.vue'
import { go, toast } from '@/utils/nav'

const newSn = ref('BAT-20261026-018')
const reason = ref('电池容量衰减')
const date = ref('2026-10-26')
const engineer = ref('李得龙')

const reasons = ['电池容量衰减', '部件损坏', '无法充电', '质量问题', '其他']

function onSubmit() {
  if (!newSn.value.trim()) {
    toast('请输入新部件 SN')
    return
  }
  go('/pages/part/success')
}
</script>

<style scoped>
.form-box {
  padding: 14px 16px 2px;
}
.form-wrap.last {
  margin-bottom: 12px;
}
.card-pad {
  padding: 6px 16px;
}
</style>
