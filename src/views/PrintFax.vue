<script setup>
import { ref } from 'vue'
import { PDFDocument, PageSizes } from 'pdf-lib'

const pdfFiles = ref([])
const mergedPdfUrl = ref(null)
const isLoading = ref(false)
const error = ref(null)

const handleFileChange = (event) => {
  const files = event.target.files
  if (!files || files.length !== 4) {
    pdfFiles.value = []
    error.value = '请确保一次选择4个PDF文件'
    event.target.value = '' // 清空选择，以便用户可以重新选择
    return
  }

  const allPdfs = Array.from(files).every(
    (file) => file.type === 'application/pdf'
  )
  if (!allPdfs) {
    pdfFiles.value = []
    error.value = '所有文件都必须是PDF格式'
    event.target.value = ''
    return
  }

  pdfFiles.value = Array.from(files)
  error.value = null
}

const mergePdfs = async () => {
  if (pdfFiles.value.length !== 4) {
    error.value = '请选择4个PDF文件进行合并'
    return
  }

  isLoading.value = true
  error.value = null
  mergedPdfUrl.value = null

  try {
    const mergedPdf = await PDFDocument.create()
    const a4Page = mergedPdf.addPage(PageSizes.A4)
    const { width: a4Width, height: a4Height } = a4Page.getSize()

    const quadrantWidth = a4Width / 2
    const quadrantHeight = a4Height / 2

    const quadrantPositions = [
      { x: 0, y: quadrantHeight }, // Top-left
      { x: quadrantWidth, y: quadrantHeight }, // Top-right
      { x: 0, y: 0 }, // Bottom-left
      { x: quadrantWidth, y: 0 }, // Bottom-right
    ]

    for (let i = 0; i < pdfFiles.value.length; i++) {
      const file = pdfFiles.value[i]
      if (file) {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)

        if (pdf.getPageCount() === 0) continue

        const sourcePage = pdf.getPage(0)
        const embeddedPage = await mergedPdf.embedPage(sourcePage)

        const { width: sourceWidth, height: sourceHeight } = sourcePage.getSize()
        const scale = Math.min(quadrantWidth / sourceWidth, quadrantHeight / sourceHeight)
        const scaledWidth = sourceWidth * scale
        const scaledHeight = sourceHeight * scale

        const xOffset = (quadrantWidth - scaledWidth) / 2
        const yOffset = (quadrantHeight - scaledHeight) / 2

        const { x, y } = quadrantPositions[i]

        a4Page.drawPage(embeddedPage, {
          x: x + xOffset,
          y: y + yOffset,
          width: scaledWidth,
          height: scaledHeight,
        })
      }
    }

    const mergedPdfBytes = await mergedPdf.save()
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' })
    mergedPdfUrl.value = URL.createObjectURL(blob)
  } catch (e) {
    console.error(e)
    error.value = '合并PDF时发生错误。请检查文件或确保每个PDF至少有一页。'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 p-8">
    <div class="max-w-2xl mx-auto">
      <!-- 页面标题 -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">PDF 合并工具</h1>
        <p class="text-gray-600 dark:text-gray-400">请一次性选择4个PDF文件，它们将被合并到单个A4页面中</p>
      </div>

      <!-- 主要内容区域 -->
      <div class="bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">

        <div class="mb-6">
          <div class="flex flex-col items-center p-6 border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-xl transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20">
            <div class="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-xl mb-4">
              <svg class="w-12 h-12 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <label for="file-upload" class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              {{ pdfFiles.length === 4 ? '✅ 已选择4个文件' : '选择4个PDF文件' }}
            </label>
            <p class="text-gray-600 dark:text-gray-400 mb-4">点击选择或拖拽文件到这里</p>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="application/pdf"
              @change="handleFileChange"
              class="block w-full text-sm text-gray-500 dark:text-gray-400
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-500 file:text-white
                     hover:file:bg-blue-600"
            />
            <div v-if="pdfFiles.length > 0" class="mt-4 w-full">
              <p class="font-semibold text-center text-gray-900 dark:text-white mb-2">已选择文件:</p>
              <ul class="space-y-2">
                <li v-for="file in pdfFiles" :key="file.name" class="text-sm text-gray-600 dark:text-gray-400 truncate text-center bg-gray-50 dark:bg-slate-700 px-3 py-2 rounded-lg" :title="file.name">
                  {{ file.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="text-center">
          <button
            @click="mergePdfs"
            :disabled="isLoading || pdfFiles.length !== 4"
            class="px-8 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            <span v-if="!isLoading">合并PDF</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              合并中...
            </span>
          </button>
        </div>

        <!-- 错误提示 -->
        <div v-if="error" class="mt-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-red-700 dark:text-red-300">{{ error }}</span>
          </div>
        </div>

        <!-- 成功提示 -->
        <div v-if="mergedPdfUrl" class="mt-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-center">
          <div class="flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-green-700 dark:text-green-300 font-semibold">合并成功！</span>
          </div>
          <a
            :href="mergedPdfUrl"
            download="merged.pdf"
            class="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
          >
            下载合并后的PDF
          </a>
        </div>
      </div>

      <!-- 返回按钮 -->
      <div class="text-center mt-8">
        <router-link
          to="/"
          class="inline-flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回工具主页
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.truncate {
  max-width: 250px;
}
</style> 