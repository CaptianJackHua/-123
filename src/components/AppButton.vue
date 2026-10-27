<template>
  <view class="app-btn-wrap" :class="[variant, size, { block }]">
    <wd-button
      :type="variant === 'primary' ? 'primary' : 'info'"
      :plain="variant !== 'primary'"
      :custom-style="styleText"
      :disabled="disabled"
      :loading="loading"
      @click="onClick"
    >
      <slot />
    </wd-button>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger'
    size?: 'normal' | 'small'
    block?: boolean
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'normal',
    block: false,
    disabled: false,
    loading: false
  }
)

const emit = defineEmits<{ click: [] }>()

const styleText = computed(() => {
  const small = props.size === 'small'
  const height = small ? '30px' : '46px'
  const radius = small ? '8px' : '10px'
  const font = small ? '12px' : '15px'
  const width = small ? 'auto' : '100%'
  const padding = small ? '0 12px' : '0 24px'
  const base = `height:${height};width:${width};border-radius:${radius};font-size:${font};font-weight:500;padding:${padding};`

  if (props.variant === 'primary') {
    return (
      base +
      'background:#3b82f6;border:0;color:#fff;box-shadow:0 4px 12px rgba(59,130,246,0.28);'
    )
  }
  if (props.variant === 'danger') {
    return base + 'background:#ffffff;border:1px solid #ef4444;color:#ef4444;box-shadow:none;'
  }
  return base + 'background:#ffffff;border:1px solid #3b82f6;color:#3b82f6;box-shadow:none;'
})

function onClick() {
  if (!props.disabled && !props.loading) emit('click')
}
</script>

<style scoped lang="scss">
.app-btn-wrap {
  display: flex;
  width: 100%;
}
.app-btn-wrap.small {
  width: auto;
}
.app-btn-wrap :deep(.wd-button) {
  width: 100%;
  font-family: inherit;
}
.app-btn-wrap :deep(.wd-button__text) {
  font-weight: 500;
  line-height: 1;
}
.app-btn-wrap.primary :deep(.wd-button) {
  color: #fff;
}
.app-btn-wrap.secondary :deep(.wd-button),
.app-btn-wrap.danger :deep(.wd-button) {
  background: #ffffff;
}
</style>
