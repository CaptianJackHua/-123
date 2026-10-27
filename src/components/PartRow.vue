<template>
  <view class="part-row" @tap="openDetail">
    <view class="part-ico">
      <AppIcon :name="iconName" :size="19" />
    </view>
    <view class="part-main">
      <text class="part-name">{{ part.name }}</text>
      <text class="part-sub">{{ part.model }} · {{ part.sn }}</text>
    </view>
    <view class="part-right">
      <text class="part-end">至 {{ part.end }}</text>
      <text class="part-times">更换 {{ part.times }} 次</text>
    </view>
    <text class="standalone-arrow">›</text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
import { PARTS, PART_ICON, type PartKey } from '@/data/parts'
import { go } from '@/utils/nav'

const props = defineProps<{ partKey: PartKey }>()

const part = computed(() => PARTS[props.partKey])
const iconName = computed(() => PART_ICON[props.partKey])

function openDetail() {
  go(`/pages/part/detail?key=${props.partKey}`)
}
</script>

<style scoped>
.part-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.part-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-main);
}
.part-sub {
  font-size: 11px;
  color: var(--text-sub);
  margin-top: 2px;
}
.part-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.part-end {
  font-size: 11px;
  color: var(--cyan);
}
.part-times {
  font-size: 11px;
  color: var(--text-sub);
  margin-top: 2px;
}
</style>
