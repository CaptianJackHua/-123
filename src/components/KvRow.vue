<template>
  <view class="kv-row">
    <text class="kv-k">{{ label }}</text>
    <view class="kv-v" :style="valueColor ? { color: valueColor } : {}">
      <slot>
        <text :style="valueColor ? { color: valueColor } : {}">{{ value }}</text>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    value?: string
    valueColor?: string
  }>(),
  {
    value: '',
    valueColor: ''
  }
)
</script>

<style scoped>
.kv-v {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
