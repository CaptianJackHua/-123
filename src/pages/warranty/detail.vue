<template>
  <view class="app-page">
    <AppNav title="质保卡详情" fallback="/pages/warranty/list" />
    <view class="content">
      <!-- 头部卡 -->
      <view class="warranty-card">
        <view class="wc-head">
          <view class="wc-logo">
            <AppIcon name="shield" :size="22" color="#ffffff" />
          </view>
          <view>
            <view class="wc-title">电子质保卡</view>
            <view class="wc-sub">WARRANTY CARD · 已激活</view>
          </view>
          <text class="chip chip-success" style="margin-left: auto">● 有效</text>
        </view>
        <view class="wc-body">
          <view>
            <view class="wc-id">{{ cardId }}</view>
            <view class="wc-physical">物理卡编号 · 00128891126001</view>
          </view>
        </view>
        <view class="wc-foot">
          <text class="wc-chip">保修起始 2026-05-01</text>
          <text class="wc-chip">保修终止 2029-05-01</text>
        </view>
      </view>

      <!-- 基本信息 -->
      <DetailCard title="基本信息">
        <view class="card-pad">
          <KvRow label="创建人员" value="李得龙" />
          <KvRow label="创建人手机" value="13912345678" />
          <KvRow label="创建门店" value="无锡东亭2路" />
          <KvRow label="创建日期" value="2026-05-01 10:30" />
          <KvRow label="整车承诺质保" value="3 年" />
          <KvRow label="车主姓名" value="朱继林" />
          <KvRow label="购买渠道" value="无锡东亭直营店" />
        </view>
      </DetailCard>

      <!-- 车辆信息 -->
      <DetailCard title="车辆信息">
        <view class="card-pad">
          <KvRow label="商品编码" value="SP202605010088" />
          <KvRow label="产品名称" value="极光竞速版" />
          <KvRow label="规格型号" value="JG-JS-2026" />
          <KvRow label="整车编码" value="ZC2026050100123" />
          <KvRow label="车架编码" value="LJGO2026050100123" />
          <KvRow label="电机编码" value="DJ2026050100088" />
          <KvRow label="合格证号" value="HGZ2026050100881" />
          <KvRow label="IMEI编码" value="860123456789012" />
          <KvRow label="MAC地址" value="A4:8B:3C:91:22:4E" />
          <KvRow label="销售日期" value="2026-05-01" />
          <KvRow label="销售经销商编号" value="JXS-80215001" />
          <KvRow label="销售经销商名称" value="无锡东亭极光专营店" />
          <KvRow label="销售门店编号" value="MD-80215001" />
          <KvRow label="销售门店名称" value="无锡东亭2路" />
        </view>
      </DetailCard>

      <!-- 车主信息 -->
      <DetailCard title="车主信息">
        <view class="card-pad">
          <KvRow label="车主姓名" value="朱继林" />
          <KvRow label="联系电话" value="138****6688" />
        </view>
      </DetailCard>

      <!-- 质保条目 -->
      <DetailCard title="质保条目 · 部件（6）">
        <PartRow v-for="key in PART_ORDER" :key="key" :part-key="key" />
        <view class="more-row" @tap="go('/pages/warranty/items')">
          <text class="link-text">查看全部部件质保 ›</text>
        </view>
        <view class="note-warn card-note">
          质保卡仅支持部件更换，不支持维修；更换后部件质保时间重新计算。
        </view>
      </DetailCard>

      <!-- 发票信息 -->
      <DetailCard title="发票信息">
        <view class="card-pad">
          <KvRow label="发票类型" value="电子普通发票" />
          <KvRow label="发票代码" value="032002100411" />
          <KvRow label="发票号码" value="FP202605010088" />
          <KvRow label="开票日期" value="2026-05-01" />
          <KvRow label="购买方名称" value="朱继林" />
          <KvRow label="销售方名称" value="无锡东亭极光专营店" />
          <KvRow label="开票门店" value="无锡东亭2路" />
          <KvRow label="发票状态">
            <text class="chip chip-success">已开票</text>
          </KvRow>
          <KvRow label="发票影像">
            <text class="chip" :class="invoiceUploaded ? 'chip-success' : 'chip-warning'">
              {{ invoiceUploaded ? '已上传' : '未上传' }}
            </text>
          </KvRow>
          <KvRow label="发票备注" value="整车销售 · 含 3 年质保" />
        </view>
        <view class="invoice-upload" @tap="chooseInvoice">
          <image v-if="invoiceFile" class="invoice-thumb" :src="invoiceFile" mode="aspectFill" />
          <AppIcon v-else name="camera" :size="22" color="var(--cyan)" />
          <view class="upload-meta">
            <text class="upload-title">{{ invoiceFile || invoiceUploaded ? '发票影像已上传' : '补上传发票' }}</text>
            <text class="upload-sub">{{ invoiceFile || invoiceUploaded ? '点击可重新上传' : '支持 JPG / PNG，点击拍照或从相册选择' }}</text>
          </view>
        </view>
      </DetailCard>

      <view class="btn-row">
        <AppButton variant="secondary" @click="go('/pages/return/scan')">退货登记</AppButton>
        <AppButton @click="go('/pages/part/scan')">更换配件</AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import AppNav from '@/components/AppNav.vue'
import AppIcon from '@/components/AppIcon.vue'
import AppButton from '@/components/AppButton.vue'
import DetailCard from '@/components/DetailCard.vue'
import KvRow from '@/components/KvRow.vue'
import PartRow from '@/components/PartRow.vue'
import { PART_ORDER } from '@/data/parts'
import { go, toast } from '@/utils/nav'

const cardId = ref('BZ20260501001')
const invoiceFile = ref('')
const invoiceUploaded = ref(false)

onLoad((options) => {
  if (options?.id) cardId.value = options.id
  if (options?.invoice === '1') invoiceUploaded.value = true
})

function chooseInvoice() {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      invoiceFile.value = res.tempFilePaths[0]
      invoiceUploaded.value = true
      toast('发票已上传', 'success')
    }
  })
}
</script>

<style scoped>
.card-pad {
  padding: 6px 16px;
}
.wc-id {
  font-size: 17px;
  font-weight: 700;
  color: var(--cyan);
  letter-spacing: 1px;
}
.wc-physical {
  font-size: 11px;
  color: var(--text-sub);
  margin-top: 6px;
}
.more-row {
  padding: 12px 16px;
  border-top: 1px solid var(--line);
  text-align: center;
}
.card-note {
  margin: 0 16px 16px;
}
</style>
