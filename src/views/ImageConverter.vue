<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 p-8">
    <div class="max-w-4xl mx-auto">
      <!-- 页面标题 -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          图片格式转换器
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          支持 JPG、PNG、WebP、GIF 等格式之间的转换
        </p>
      </div>

      <!-- 主要内容区域 -->
      <div class="bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <!-- 文件上传区域 -->
        <div class="mb-8">
          <div
            @drop="handleDrop"
            @dragover.prevent
            @dragenter.prevent
            class="border-2 border-dashed border-orange-300 dark:border-orange-600 rounded-xl p-12 text-center transition-all duration-300 hover:border-orange-400 hover:bg-orange-50/50 dark:hover:bg-orange-900/20"
            :class="{ 'border-orange-400 bg-orange-50/50 dark:bg-orange-900/20': isDragging }"
          >
            <div class="flex flex-col items-center">
              <div class="p-4 bg-orange-100 dark:bg-orange-900/50 rounded-xl mb-4">
                <svg
                  class="w-12 h-12 text-orange-500 dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                拖拽图片到这里
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                或点击选择文件
              </p>
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                multiple
                @change="handleFileSelect"
                class="hidden"
              />
              <button
                @click="$refs.fileInput.click()"
                class="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
              >
                选择图片文件
              </button>
            </div>
          </div>
        </div>

        <!-- 格式选择 -->
        <div v-if="selectedFiles.length > 0" class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            选择输出格式
          </h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button
              v-for="format in outputFormats"
              :key="format"
              @click="selectedFormat = format"
              class="p-4 border-2 rounded-lg transition-all"
              :class="selectedFormat === format
                ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                : 'border-gray-200 dark:border-slate-600 hover:border-orange-300 text-gray-700 dark:text-gray-300'"
            >
              <div class="font-semibold">{{ format.toUpperCase() }}</div>
            </button>
          </div>
        </div>

        <!-- 质量设置 -->
        <div v-if="selectedFiles.length > 0 && (selectedFormat === 'jpeg' || selectedFormat === 'webp')" class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            图片质量
          </h3>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600 dark:text-gray-400">低质量</span>
            <input
              v-model="quality"
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <span class="text-sm text-gray-600 dark:text-gray-400">高质量</span>
            <span class="text-sm font-medium text-gray-900 dark:text-white min-w-12">
              {{ Math.round(quality * 100) }}%
            </span>
          </div>
        </div>

        <!-- 文件列表 -->
        <div v-if="selectedFiles.length > 0" class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            待转换的文件 ({{ selectedFiles.length }})
          </h3>
          <div class="space-y-3">
            <div
              v-for="(file, index) in selectedFiles"
              :key="index"
              class="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg"
            >
              <div class="flex items-center space-x-4">
                <img
                  v-if="file.preview"
                  :src="file.preview"
                  :alt="file.name"
                  class="w-12 h-12 object-cover rounded"
                />
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">
                    {{ file.name }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatFileSize(file.size) }} • {{ getFileFormat(file.name) }}
                  </div>
                </div>
              </div>
              <button
                @click="removeFile(index)"
                class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 转换按钮 -->
        <div v-if="selectedFiles.length > 0" class="text-center">
          <button
            @click="convertImages"
            :disabled="isConverting || !selectedFormat"
            class="px-8 py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            <span v-if="!isConverting">转换为 {{ selectedFormat.toUpperCase() }}</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              转换中...
            </span>
          </button>
        </div>

        <!-- 错误提示 -->
        <div v-if="errorMessage" class="mt-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-red-700 dark:text-red-300">{{ errorMessage }}</span>
          </div>
        </div>

        <!-- 成功提示 -->
        <div v-if="successMessage" class="mt-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-green-700 dark:text-green-300">{{ successMessage }}</span>
          </div>
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

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const selectedFiles = ref([])
const selectedFormat = ref('png')
const quality = ref(0.9)
const isConverting = ref(false)
const isDragging = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const outputFormats = ['jpeg', 'png', 'webp', 'gif']

const handleDrop = (e) => {
  e.preventDefault()
  isDragging.value = false
  const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'))
  addFiles(files)
}

const handleFileSelect = (e) => {
  const files = Array.from(e.target.files)
  addFiles(files)
}

const addFiles = (files) => {
  files.forEach(file => {
    if (!file.type.startsWith('image/')) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      selectedFiles.value.push({
        file,
        name: file.name,
        size: file.size,
        preview: e.target.result
      })
    }
    reader.readAsDataURL(file)
  })
  clearMessages()
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

const getFileFormat = (filename) => {
  return filename.split('.').pop().toUpperCase()
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const clearMessages = () => {
  errorMessage.value = ''
  successMessage.value = ''
}

const convertImages = async () => {
  if (!selectedFiles.value.length || !selectedFormat.value) return
  
  isConverting.value = true
  clearMessages()
  
  try {
    for (const fileItem of selectedFiles.value) {
      await convertSingleImage(fileItem)
    }
    successMessage.value = `成功转换 ${selectedFiles.value.length} 个文件为 ${selectedFormat.value.toUpperCase()} 格式`
  } catch (error) {
    errorMessage.value = '转换过程中发生错误：' + error.message
  } finally {
    isConverting.value = false
  }
}

const convertSingleImage = (fileItem) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      
      // 如果目标格式是 JPEG，先填充白色背景
      if (selectedFormat.value === 'jpeg') {
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      
      ctx.drawImage(img, 0, 0)
      
      // 根据格式设置 MIME 类型
      let mimeType = 'image/png'
      if (selectedFormat.value === 'jpeg') {
        mimeType = 'image/jpeg'
      } else if (selectedFormat.value === 'webp') {
        mimeType = 'image/webp'
      } else if (selectedFormat.value === 'gif') {
        mimeType = 'image/gif'
      }
      
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('转换失败'))
          return
        }
        
        // 创建下载链接
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        
        // 生成新文件名
        const originalName = fileItem.name.split('.')[0]
        a.download = `${originalName}_converted.${selectedFormat.value}`
        
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        
        resolve()
      }, mimeType, selectedFormat.value === 'jpeg' || selectedFormat.value === 'webp' ? quality.value : undefined)
    }
    
    img.onerror = () => {
      reject(new Error(`无法加载图片: ${fileItem.name}`))
    }
    
    img.src = fileItem.preview
  })
}

// 拖拽事件监听
const handleDragEnter = (e) => {
  e.preventDefault()
  isDragging.value = true
}

const handleDragLeave = (e) => {
  e.preventDefault()
  if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
    isDragging.value = false
  }
}

const handleDragOver = (e) => {
  e.preventDefault()
}

onMounted(() => {
  document.addEventListener('dragenter', handleDragEnter)
  document.addEventListener('dragleave', handleDragLeave)
  document.addEventListener('dragover', handleDragOver)
  document.addEventListener('drop', (e) => {
    e.preventDefault()
    isDragging.value = false
  })
})

onUnmounted(() => {
  document.removeEventListener('dragenter', handleDragEnter)
  document.removeEventListener('dragleave', handleDragLeave)
  document.removeEventListener('dragover', handleDragOver)
  document.removeEventListener('drop', (e) => {
    e.preventDefault()
    isDragging.value = false
  })
})
</script>

<style scoped>
/* 自定义滑块样式 */
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #f97316;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input[type="range"]::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #f97316;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>