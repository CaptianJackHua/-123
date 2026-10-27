<template>
  <view class="app-page">
    <AppNav :title="`${part.name} 质保`" fallback="/pages/warranty/items" />
    <view class="content">
      <!-- 头部 -->
      <view class="warranty-card">
        <view class="wc-head">
          <view class="wc-logo" style="width: 42px; height: 42px">
            <AppIcon :name="PART_ICON[partKey]" :size="22" color="#ffffff" />
          </view>
          <view>
            <view class="wc-title">{{ part.name }}</view>
            <view class="wc-sub">{{ part.model }}</view>
          </view>
          <text class="chip chip-success" style="margin-left: auto">● 质保中</text>
        </view>
        <view class="wc-body">
          <view>
            <view class="part-sn">{{ part.sn }}</view>
            <view class="wc-physical">质保卡 BZ20260501001</view>
          </view>
        </view>
      </view>

      <!-- 部件数据 -->
      <view class="section-title">部件数据</view>
      <DetailCard>
        <view class="card-pad">
          <KvRow v-for="spec in part.specs" :key="spec[0]" :label="spec[0]" :value="spec[1]" />
        </view>
      </DetailCard>

      <!-- 质保信息 -->
      <view class="section-title">质保信息</view>
      <DetailCard>
        <view class="card-pad">
          <KvRow label="质保开始" :value="part.start" />
          <KvRow label="质保截止" :value="part.end" value-color="var(--cyan)" />
          <KvRow label="质保方式" value="只换不修" />
          <KvRow label="更换次数" :value="`${part.times} 次`" />
        </view>
      </DetailCard>

      <!-- 更换记录 -->
      <view class="section-title">更换记录（{{ part.history.length }}）</view>
      <DetailCard>
        <view class="timeline-box">
          <view class="timeline">
            <view v-for="item in part.history" :key="item[0]" class="tl-item done">
              <view class="tl-title">{{ item[1] }}</view>
              <view class="tl-sub">{{ item[0] }} · {{ item[2] }}</view>
            </view>
            <view v-if="part.history.length === 0" class="tl-empty">暂无更换记录</view>
          </view>
        </view>
      </DetailCard>

      <view class="note-warn">该部件质保仅支持更换，不支持维修。</view>

      <view style="margin-top: 20px">
        <AppButton block @click="go('/pages/part/scan')">扫码更换此部件</AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import AppNav from '@/components/AppNav.vue'
import AppIcon from '@/components/AppIcon.vue'
import AppButton from '@/components/AppButton.vue'
import DetailCard from '@/components/DetailCard.vue'
import KvRow from '@/components/KvRow.vue'
import { PARTS, PART_ICON, type PartKey } from '@/data/parts'
import { go } from '@/utils/nav'

const partKey = ref<PartKey>('battery')
const part = computed(() => PARTS[partKey.value])

onLoad((options) => {
  const key = options?.key as PartKey | undefined
  if (key && PARTS[key]) partKey.value = key
})
</script>

<style scoped>
.card-pad {
  padding: 6px 16px;
}
.part-sn {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-main);
  font-family: 'SF Mono', Menlo, monospace;
  letter-spacing: 0.5px;
}
.wc-physical {
  font-size: 11px;
  color: var(--text-sub);
  margin-top: 4px;
}
.timeline-box {
  padding: 16px;
}
.tl-empty {
  font-size: 12px;
  color: var(--text-sub);
  padding: 4px 0;
}
</style>
