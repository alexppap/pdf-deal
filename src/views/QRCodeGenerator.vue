<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 p-4 sm:p-8">
    <div class="max-w-6xl mx-auto">
      <!-- 返回首页按钮 -->
      <router-link
        to="/"
        class="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-200"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        返回首页
      </router-link>

      <!-- 标题 -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">二维码生成器</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          快速生成各种类型的二维码，支持文本、URL、WiFi等多种格式
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 左侧：配置面板 -->
        <div class="space-y-6">
          <!-- 内容类型选择 -->
          <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <div class="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg mr-2">
                <svg class="w-5 h-5 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                </svg>
              </div>
              内容类型
            </h2>
            <div class="grid grid-cols-3 gap-2">
              <button
                @click="contentType = 'text'"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                  contentType === 'text'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                ]"
              >
                文本
              </button>
              <button
                @click="contentType = 'url'"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                  contentType === 'url'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                ]"
              >
                URL
              </button>
              <button
                @click="contentType = 'wifi'"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                  contentType === 'wifi'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                ]"
              >
                WiFi
              </button>
            </div>
          </div>

          <!-- 内容输入区域 -->
          <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <div class="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg mr-2">
                <svg class="w-5 h-5 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              内容输入
            </h2>

            <!-- 文本输入 -->
            <div v-if="contentType === 'text'">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                输入文本内容
              </label>
              <textarea
                v-model="textContent"
                placeholder="请输入要生成二维码的文本内容..."
                rows="6"
                class="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-y"
              ></textarea>
            </div>

            <!-- URL 输入 -->
            <div v-if="contentType === 'url'">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                输入网址
              </label>
              <input
                v-model="urlContent"
                type="url"
                placeholder="https://example.com"
                class="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
            </div>

            <!-- WiFi 配置 -->
            <div v-if="contentType === 'wifi'" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  WiFi 名称 (SSID)
                </label>
                <input
                  v-model="wifiConfig.ssid"
                  type="text"
                  placeholder="WiFi 网络名称"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  密码
                </label>
                <input
                  v-model="wifiConfig.password"
                  type="text"
                  placeholder="WiFi 密码"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  加密类型
                </label>
                <select
                  v-model="wifiConfig.encryption"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">无密码</option>
                </select>
              </div>
              <div>
                <label class="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <input v-model="wifiConfig.hidden" type="checkbox" class="mr-2 text-green-600 focus:ring-green-500">
                  隐藏网络
                </label>
              </div>
            </div>

            <button
              @click="generateQRCode"
              :disabled="!isContentValid"
              class="w-full mt-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              生成二维码
            </button>
          </div>

          <!-- 样式设置 -->
          <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <div class="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg mr-2">
                <svg class="w-5 h-5 text-purple-500 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                </svg>
              </div>
              样式设置
            </h2>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  尺寸: {{ qrSize }}px
                </label>
                <input
                  v-model.number="qrSize"
                  type="range"
                  min="128"
                  max="512"
                  step="32"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                >
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>128px</span>
                  <span>512px</span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    前景色
                  </label>
                  <div class="flex items-center gap-2">
                    <input
                      v-model="qrColor"
                      type="color"
                      class="w-12 h-10 rounded border border-gray-300 dark:border-slate-600 cursor-pointer"
                    >
                    <input
                      v-model="qrColor"
                      type="text"
                      class="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                    >
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    背景色
                  </label>
                  <div class="flex items-center gap-2">
                    <input
                      v-model="qrBackground"
                      type="color"
                      class="w-12 h-10 rounded border border-gray-300 dark:border-slate-600 cursor-pointer"
                    >
                    <input
                      v-model="qrBackground"
                      type="text"
                      class="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                    >
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  容错级别
                </label>
                <select
                  v-model="errorCorrectionLevel"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="L">低 (7%)</option>
                  <option value="M">中 (15%)</option>
                  <option value="Q">高 (25%)</option>
                  <option value="H">最高 (30%)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：预览和下载 -->
        <div class="space-y-6">
          <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <div class="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg mr-2">
                <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
              二维码预览
            </h2>

            <!-- 二维码显示区域 -->
            <div class="flex flex-col items-center justify-center">
              <div
                v-if="!qrCodeDataUrl"
                class="w-full aspect-square max-w-md flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg"
              >
                <div class="text-center p-8">
                  <svg class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                  </svg>
                  <p class="text-gray-500 dark:text-gray-400">
                    输入内容后点击生成二维码
                  </p>
                </div>
              </div>

              <div v-else class="w-full max-w-md">
                <div class="bg-white p-4 rounded-lg shadow-inner">
                  <img
                    :src="qrCodeDataUrl"
                    :alt="'二维码 - ' + getCurrentContent()"
                    class="w-full h-auto"
                  >
                </div>

                <!-- 下载按钮 -->
                <div class="mt-4 space-y-2">
                  <button
                    @click="downloadQRCode('png')"
                    class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    下载为 PNG
                  </button>
                  <button
                    @click="downloadQRCode('svg')"
                    class="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    下载为 SVG
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 使用说明 -->
          <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <div class="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg mr-2">
                <svg class="w-5 h-5 text-yellow-500 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              使用说明
            </h2>
            <div class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div class="flex items-start">
                <span class="text-yellow-500 mr-2">•</span>
                <p><strong>文本模式:</strong> 适用于普通文本、名片、联系方式等</p>
              </div>
              <div class="flex items-start">
                <span class="text-yellow-500 mr-2">•</span>
                <p><strong>URL模式:</strong> 快速生成网址二维码，扫描即可访问</p>
              </div>
              <div class="flex items-start">
                <span class="text-yellow-500 mr-2">•</span>
                <p><strong>WiFi模式:</strong> 生成WiFi配置二维码，扫描即可连接</p>
              </div>
              <div class="flex items-start">
                <span class="text-yellow-500 mr-2">•</span>
                <p><strong>容错级别:</strong> 级别越高，二维码越复杂但抗损坏能力越强</p>
              </div>
              <div class="flex items-start">
                <span class="text-yellow-500 mr-2">•</span>
                <p><strong>颜色设置:</strong> 建议保持足够的对比度以确保可扫描性</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 成功提示 -->
    <div
      v-if="showSuccess"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300"
    >
      ✅ {{ successMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import QRCode from 'qrcode'

// 内容类型
const contentType = ref('text')

// 文本内容
const textContent = ref('')

// URL 内容
const urlContent = ref('')

// WiFi 配置
const wifiConfig = ref({
  ssid: '',
  password: '',
  encryption: 'WPA',
  hidden: false
})

// 二维码样式设置
const qrSize = ref(256)
const qrColor = ref('#000000')
const qrBackground = ref('#ffffff')
const errorCorrectionLevel = ref('M')

// 生成的二维码数据URL
const qrCodeDataUrl = ref('')

// 成功提示
const showSuccess = ref(false)
const successMessage = ref('')

// 计算当前内容是否有效
const isContentValid = computed(() => {
  switch (contentType.value) {
    case 'text':
      return textContent.value.trim().length > 0
    case 'url':
      return urlContent.value.trim().length > 0
    case 'wifi':
      return wifiConfig.value.ssid.trim().length > 0
    default:
      return false
  }
})

/**
 * 获取当前输入的内容
 */
const getCurrentContent = () => {
  switch (contentType.value) {
    case 'text':
      return textContent.value
    case 'url':
      return urlContent.value
    case 'wifi':
      return formatWiFiString()
    default:
      return ''
  }
}

/**
 * 格式化WiFi配置为二维码字符串
 */
const formatWiFiString = () => {
  const { ssid, password, encryption, hidden } = wifiConfig.value
  const hiddenFlag = hidden ? 'true' : 'false'

  if (encryption === 'nopass') {
    return `WIFI:T:nopass;S:${ssid};H:${hiddenFlag};;`
  } else {
    return `WIFI:T:${encryption};S:${ssid};P:${password};H:${hiddenFlag};;`
  }
}

/**
 * 生成二维码
 */
const generateQRCode = async () => {
  if (!isContentValid.value) {
    return
  }

  try {
    const content = getCurrentContent()

    const options = {
      width: qrSize.value,
      margin: 1,
      color: {
        dark: qrColor.value,
        light: qrBackground.value
      },
      errorCorrectionLevel: errorCorrectionLevel.value
    }

    qrCodeDataUrl.value = await QRCode.toDataURL(content, options)
    showSuccessMessage('二维码生成成功！')
  } catch (error) {
    console.error('生成二维码失败:', error)
    showSuccessMessage('生成失败，请检查输入内容')
  }
}

/**
 * 下载二维码
 */
const downloadQRCode = async (format) => {
  if (!qrCodeDataUrl.value) {
    return
  }

  const content = getCurrentContent()
  const options = {
    width: qrSize.value,
    margin: 1,
    color: {
      dark: qrColor.value,
      light: qrBackground.value
    },
    errorCorrectionLevel: errorCorrectionLevel.value
  }

  try {
    if (format === 'png') {
      // 下载 PNG 格式
      const link = document.createElement('a')
      link.href = qrCodeDataUrl.value
      link.download = `qrcode_${Date.now()}.png`
      link.click()
      showSuccessMessage('PNG 格式已下载！')
    } else if (format === 'svg') {
      // 下载 SVG 格式
      const svgString = await QRCode.toString(content, {
        ...options,
        type: 'svg'
      })
      const blob = new Blob([svgString], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `qrcode_${Date.now()}.svg`
      link.click()
      URL.revokeObjectURL(url)
      showSuccessMessage('SVG 格式已下载！')
    }
  } catch (error) {
    console.error('下载失败:', error)
    showSuccessMessage('下载失败，请重试')
  }
}

/**
 * 显示成功消息
 */
const showSuccessMessage = (message) => {
  successMessage.value = message
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
  }, 2000)
}
</script>

<style scoped>
/* 自定义范围滑块样式 */
input[type='range']::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: #8b5cf6;
  cursor: pointer;
  border-radius: 50%;
}

input[type='range']::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #8b5cf6;
  cursor: pointer;
  border-radius: 50%;
  border: none;
}

/* 深色模式下的滑块 */
.dark input[type='range']::-webkit-slider-thumb {
  background: #a78bfa;
}

.dark input[type='range']::-moz-range-thumb {
  background: #a78bfa;
}
</style>
