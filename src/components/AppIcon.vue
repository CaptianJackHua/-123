<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="color"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    :style="glowStyle"
  >
    <path v-for="(d, i) in paths" :key="i" :d="d" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number
    color?: string
    glow?: boolean
  }>(),
  {
    size: 22,
    color: '#3b82f6',
    glow: false
  }
)

const ICONS: Record<string, string[]> = {
  scan: [
    'M3 8V5a2 2 0 012-2h3M21 8V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3M21 16v3a2 2 0 01-2 2h-3',
    'M7 12h10'
  ],
  cal: ['M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z', 'M16 3v4M8 3v4M3 10h18'],
  clip: ['M7 4h10a2 2 0 012 2v13a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z', 'M9 4V2h6v2M9 10h6M9 14h6M9 18h3'],
  up: ['M12 19V5M6 11l6-6 6 6'],
  signal: ['M5 15a10 10 0 0114 0M8.5 18a5 5 0 017 0', 'M12 20.6a1 1 0 100 .2z'],
  monitor: ['M4 4h16a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z', 'M8 21h8M12 17v4'],
  plug: ['M9 3v6M15 3v6M6 9h12v3a6 6 0 01-6 6 6 6 0 01-6-6V9zM12 18v3'],
  swap: ['M4 7h13l-3-3M20 17H7l3 3'],
  search: ['M11 4a7 7 0 100 14 7 7 0 000-14z', 'M20 20l-4-4'],
  shield: ['M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z', 'M9 12l2 2 4-4'],
  store: ['M3 9l2-5h14l2 5M3 9h18v11H3z', 'M9 20v-6h6v6'],
  user: ['M12 4a4 4 0 100 8 4 4 0 000-8z', 'M4 21c0-4 4-6 8-6s8 2 8 6'],
  home: ['M3 11l9-8 9 8', 'M5 10v10h14V10'],
  check: ['M20 6L9 17l-5-5'],
  box: ['M3 8l9-5 9 5v8l-9 5-9-5V8z', 'M3 8l9 5 9-5M12 13v8'],
  receipt: ['M6 2h12v20l-3-2-3 2-3-2-3 2V2z', 'M9 7h6M9 11h6M9 15h4'],
  undo: ['M9 14L4 9l5-5', 'M4 9h11a5 5 0 010 10h-3'],
  battery: [
    'M4 7h13a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z',
    'M22 11v2M6 10.5v3M10 10.5v3M14 10.5v3'
  ],
  motor: ['M12 4a8 8 0 100 16 8 8 0 000-16z', 'M12 4v3M12 17v3M4 12h3M17 12h3'],
  chip: ['M8 6h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z', 'M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4'],
  gauge: ['M12 14l4-4', 'M4 18a9 9 0 1116 0'],
  wrench: ['M14.7 6.3a4 4 0 01-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 015.4-5.4l-2.3 2.3-2-2 2.3-2.3z'],
  plus: ['M12 5v14M5 12h14'],
  back: ['M15 5l-7 7 7 7'],
  chevron: ['M9 5l7 7-7 7'],
  more: ['M6 12h.01M12 12h.01M18 12h.01'],
  camera: ['M3 8h3l2-2h8l2 2h3v11H3z', 'M12 16a3 3 0 100-6 3 3 0 000 6z'],
  clock: ['M12 3a9 9 0 100 18 9 9 0 000-18z', 'M12 7v5l3 2'],
  phone: ['M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z'],
  edit: ['M4 20h4l10-10-4-4L4 16v4z', 'M14 4l4 4'],
  alert: ['M12 3l9 17H3z', 'M12 9v5M12 17h.01']
}

const paths = computed(() => ICONS[props.name] || [])
const glowStyle = computed(() =>
  props.glow ? { filter: 'drop-shadow(0 0 6px rgba(59,130,246,0.35))' } : {}
)
</script>
