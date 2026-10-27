<template>
  <view class="app-page">
    <AppNav title="填写维修单" fallback="/pages/work/scan-fill" />
    <view class="content">
      <view class="section-title">客户信息</view>
      <view class="card-white">
        <view class="form-wrap">
          <text class="form-label">姓名</text>
          <input class="form-input" v-model="form.name" placeholder="请输入客户姓名" />
        </view>
        <view class="form-wrap last">
          <text class="form-label">联系方式</text>
          <input class="form-input" v-model="form.phone" placeholder="请输入联系电话" />
        </view>
      </view>

      <view class="section-title">车辆信息</view>
      <view class="card-white">
        <view class="form-row"><text class="form-label">车架号</text><text class="form-value">LJGO2026050100123</text></view>
        <view class="form-row"><text class="form-label">车牌号</text><text class="form-value">苏BD3456</text></view>
        <view class="form-row"><text class="form-label">车型</text><text class="form-value">极光竞速版</text></view>
        <view class="form-row"><text class="form-label">门店</text><text class="form-value">无锡东亭2路</text></view>
      </view>

      <view class="section-title">补充信息</view>
      <view class="card-white">
        <view class="form-wrap">
          <text class="form-label">维修项目</text>
          <AppPicker v-model="form.project" :options="projects" />
        </view>
        <view class="form-wrap">
          <text class="form-label">故障描述</text>
          <textarea class="form-textarea" v-model="form.desc" placeholder="请描述故障现象" />
        </view>
        <view class="form-wrap last">
          <text class="form-label">维修技师</text>
          <input class="form-input" v-model="form.engineer" />
        </view>
      </view>

      <view style="margin-top: 24px">
        <AppButton block @click="onSubmit">提交工单</AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import AppNav from '@/components/AppNav.vue'
import AppButton from '@/components/AppButton.vue'
import AppPicker from '@/components/AppPicker.vue'
import { toast } from '@/utils/nav'

const projects = ['轮胎故障', '仪表故障', '控制器故障', '发动机故障', '固件升级', '其他']

const form = reactive({
  name: '',
  phone: '',
  project: projects[0],
  desc: '',
  engineer: '王四'
})

function onSubmit() {
  if (!form.name.trim() || !form.phone.trim()) {
    toast('请填写客户姓名与联系方式')
    return
  }
  toast('工单已提交', 'success')
  setTimeout(() => uni.navigateBack({ delta: 1 }), 900)
}
</script>

<style scoped>
.form-wrap.last {
  margin-bottom: 0;
}
</style>
