<template>
  <picker mode="selector" :range="options" :value="currentIndex" @change="onChange">
    <view class="picker-value">
      <text>{{ options[currentIndex] }}</text>
      <AppIcon name="chevron" :size="14" color="#b6bdc9" />
    </view>
  </picker>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    options: string[]
  }>(),
  {
    modelValue: ''
  }
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const currentIndex = computed(() => {
  const i = props.options.indexOf(props.modelValue)
  return i < 0 ? 0 : i
})

function onChange(e: { detail: { value: number | string } }) {
  const index = Number(e.detail.value)
  emit('update:modelValue', props.options[index] ?? props.options[0])
}
</script>

<style scoped>
.picker-value {
  font-family: inherit;
}
</style>
