<template>
  <view class="app-page">
    <AppNav title="销售登记" fallback="/pages/sale/scan" />
    <view class="content">
      <view class="page-tip">
        <text>已识别车辆 LJGO2026102600456 · 请完善销售信息</text>
      </view>

      <view class="section-title">车辆信息</view>
      <DetailCard>
        <view class="card-pad">
          <KvRow label="商品编码" value="SP202610260088" />
          <KvRow label="产品名称" value="极光竞速版" />
          <KvRow label="规格型号" value="JG-JS-2026" />
          <KvRow label="整车编码" value="ZC2026102600456" />
          <KvRow label="车架编码" value="LJGO2026102600456" />
          <KvRow label="电机编码" value="DJ2026102600088" />
          <KvRow label="合格证号" value="HGZ2026102601122" />
          <KvRow label="IMEI编码" value="860123456789012" />
          <KvRow label="MAC地址" value="A4:8B:3C:91:22:4E" />
          <KvRow label="销售日期" value="2026-10-26" />
          <KvRow label="销售经销商编号" value="JXS-80215001" />
          <KvRow label="销售经销商名称" value="无锡东亭极光专营店" />
          <KvRow label="销售门店编号" value="MD-80215001" />
          <KvRow label="销售门店名称" value="无锡东亭2路" />
        </view>
      </DetailCard>

      <view class="section-title">销售信息</view>
      <DetailCard>
        <view class="form-box">
          <view class="form-wrap">
            <text class="form-label">车主姓名</text>
            <input class="form-input" v-model="form.owner" placeholder="请输入车主姓名" />
          </view>
          <view class="form-wrap">
            <text class="form-label">联系电话</text>
            <input class="form-input" v-model="form.phone" placeholder="请输入联系电话" />
          </view>
          <view class="form-wrap">
            <text class="form-label">发票号码</text>
            <view class="invoice-row">
              <input class="form-input" v-model="form.invoiceNo" placeholder="请输入发票号码" />
              <view class="invoice-pick" @tap="chooseInvoice">
                <AppIcon name="camera" :size="16" color="#3b82f6" />
                <text>上传发票</text>
              </view>
            </view>
            <image
              v-if="invoiceFile"
              class="invoice-mini"
              :src="invoiceFile"
              mode="aspectFit"
              @tap="chooseInvoice"
            />
          </view>
          <view class="form-wrap">
            <text class="form-label">质保方案</text>
            <AppPicker v-model="form.plan" :options="plans" />
          </view>
          <view class="form-wrap last">
            <text class="form-label">经办人</text>
            <input class="form-input" v-model="form.handler" />
          </view>
        </view>
      </DetailCard>

      <view class="note-warn">提交后生成电子质保卡并激活部件质保，质保起始日期为销售日期；未上传的发票可后续在质保卡详情补上传。</view>

      <view class="btn-row">
        <AppButton variant="secondary" @click="go('/pages/sale/scan')">取消</AppButton>
        <AppButton @click="onSubmit">提交登记</AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import AppNav from '@/components/AppNav.vue'
import AppButton from '@/components/AppButton.vue'
import AppIcon from '@/components/AppIcon.vue'
import DetailCard from '@/components/DetailCard.vue'
import KvRow from '@/components/KvRow.vue'
import AppPicker from '@/components/AppPicker.vue'
import { go, toast } from '@/utils/nav'

const plans = ['整车3年', '整车2年']

const invoiceFile = ref('')

const form = reactive({
  owner: '陈立',
  phone: '13800001234',
  invoiceNo: 'FP202610260088',
  plan: plans[0],
  handler: '李得龙'
})

function chooseInvoice() {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      invoiceFile.value = res.tempFilePaths[0]
      toast('发票已上传', 'success')
    }
  })
}

function onSubmit() {
  if (!form.owner.trim() || !form.phone.trim()) {
    toast('请填写车主姓名与联系电话')
    return
  }
  go('/pages/sale/success?invoice=' + (invoiceFile.value ? '1' : '0'))
}
</script>

<style scoped>
.card-pad {
  padding: 6px 16px;
}
.form-box {
  padding: 14px 16px 2px;
}
.form-wrap.last {
  margin-bottom: 12px;
}
.invoice-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.invoice-row .form-input {
  flex: 1;
  min-width: 0;
}
.invoice-pick {
  flex: none;
  height: 42px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid rgba(59, 130, 246, 0.45);
  border-radius: 8px;
  background: rgba(59, 130, 246, 0.06);
  font-size: 12px;
  color: var(--cyan);
}
.invoice-mini {
  width: 100%;
  height: 90px;
  margin-top: 8px;
  border-radius: 8px;
  background: rgba(59, 130, 246, 0.04);
}
</style>
