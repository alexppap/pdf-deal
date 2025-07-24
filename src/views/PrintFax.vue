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
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-700">PDF 合并工具</h1>
    <p class="text-center text-gray-500 mb-6">请一次性选择4个PDF文件，它们将被合并到单个A4页面中</p>

    <div class="mb-6">
       <div class="flex flex-col items-center p-6 border-2 border-dashed rounded-lg">
        <label for="file-upload" class="mb-2 text-sm font-medium text-gray-600">
           {{ pdfFiles.length === 4 ? '✅ 已选择4个文件' : '点击选择4个PDF文件' }}
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          accept="application/pdf"
          @change="handleFileChange"
          class="block w-full text-sm text-gray-500
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-full file:border-0
                 file:text-sm file:font-semibold
                 file:bg-violet-50 file:text-violet-700
                 hover:file:bg-violet-100"
        />
        <div v-if="pdfFiles.length > 0" class="mt-4 w-full text-sm text-gray-600">
            <p class="font-semibold text-center">已选择文件:</p>
            <ul class="list-none p-0 mt-2 space-y-1">
                <li v-for="file in pdfFiles" :key="file.name" class="text-xs text-gray-500 truncate mx-auto" :title="file.name">
                    {{ file.name }}
                </li>
            </ul>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center">
      <button
        @click="mergePdfs"
        :disabled="isLoading || pdfFiles.length !== 4"
        class="w-full md:w-auto px-6 py-3 text-white font-semibold rounded-lg shadow-md
               bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring-2
               focus:ring-offset-2 focus:ring-violet-500
               disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        <span v-if="isLoading">正在合并...</span>
        <span v-else>合并PDF</span>
      </button>

      <div v-if="error" class="mt-4 text-red-600">
        {{ error }}
      </div>

      <div v-if="mergedPdfUrl" class="mt-6 text-center">
        <h2 class="text-lg font-semibold text-green-600">合并成功!</h2>
        <a
          :href="mergedPdfUrl"
          download="merged.pdf"
          class="inline-block mt-2 px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
        >
          下载合并后的PDF
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.truncate {
  max-width: 250px;
}
</style> 