<template>
  <view class="app-page">
    <AppNav title="更换车型" fallback="/pages/home/index" />
    <view class="content">
      <view class="page-tip">
        <AppIcon name="swap" :size="16" color="var(--cyan)" />
        <text>选择目标车型后提交，将记录到车辆档案</text>
      </view>

      <view class="recent-list">
        <view
          v-for="m in models"
          :key="m.name"
          class="recent-item"
          @tap="selected = m.name"
        >
          <view class="radio-dot" :class="{ active: selected === m.name }">
            <text v-if="selected === m.name" class="radio-check">✓</text>
          </view>
          <view class="recent-body">
            <view class="recent-title">{{ m.name }}</view>
            <view class="recent-sub">{{ m.desc }}</view>
          </view>
        </view>
      </view>

      <view style="margin-top: 24px">
        <AppButton block @click="onSubmit">确认提交</AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppNav from '@/components/AppNav.vue'
import AppButton from '@/components/AppButton.vue'
import AppIcon from '@/components/AppIcon.vue'
import { confirmDialog, goBack, toast } from '@/utils/nav'

const models = [
  { name: '极光星际版', desc: '两轮电动车 / 都市通勤' },
  { name: '极光竞速版', desc: '两轮电动车 / 智能高配' },
  { name: 'EB瀚海', desc: '两轮电动车 / 经济实惠' },
  { name: '极光闪电', desc: '电动滑板车 / 轻便出行' },
  { name: '极光重载', desc: '三轮电动车 / 货运专用' },
  { name: '极光商旅', desc: '电动三轮车 / 载客专用' }
]

const selected = ref('极光竞速版')

function onSubmit() {
  confirmDialog('确认提交', `已选择「${selected.value}」，是否提交？`, () => {
    toast('车型已更新', 'success')
    setTimeout(() => goBack('/pages/home/index'), 900)
  })
}
</script>

<style scoped>
.radio-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid var(--line-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.radio-dot.active {
  background: var(--cyan);
  border-color: var(--cyan);
  box-shadow: 0 0 8px var(--cyan);
}
.radio-check {
  color: #fff;
  font-size: 13px;
  line-height: 1;
}
</style>
