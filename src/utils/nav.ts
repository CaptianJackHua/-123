/** 页面跳转 / 交互工具 */
export function go(url: string): void {
  uni.navigateTo({ url })
}

export function goHome(): void {
  uni.reLaunch({ url: '/pages/home/index' })
}

export function goBack(fallback = '/pages/home/index'): void {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack({ delta: 1 })
  } else {
    uni.reLaunch({ url: fallback })
  }
}

export function toast(title: string, icon: 'none' | 'success' = 'none'): void {
  uni.showToast({ title, icon, duration: 1600 })
}

export function confirmDialog(
  title: string,
  content: string,
  onConfirm?: () => void
): void {
  uni.showModal({
    title,
    content,
    confirmText: '确定',
    cancelText: '取消',
    success: (res) => {
      if (res.confirm) onConfirm?.()
    }
  })
}
