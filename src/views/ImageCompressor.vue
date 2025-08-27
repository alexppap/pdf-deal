<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 p-4 sm:p-8">
    <div class="max-w-6xl mx-auto">
      <!-- 页面标题 -->
      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          图片压缩工具
        </h1>
        <p class="text-gray-600 dark:text-gray-400 text-lg">
          智能压缩图片文件大小，支持批量处理，保持图片质量的同时减少文件体积
        </p>
      </div>

      <!-- 上传区域 -->
      <div class="mb-8">
        <div
          class="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-2xl p-8 text-center bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm hover:border-indigo-400 transition-colors duration-300"
          :class="{ 'border-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20': isDragOver }"
          @drop="handleDrop"
          @dragover.prevent="isDragOver = true"
          @dragleave.prevent="isDragOver = false"
        >
          <input
            ref="fileInput"
            type="file"
            multiple
            accept="image/*"
            @change="handleFileSelect"
            class="hidden"
          />
          
          <div class="flex flex-col items-center">
            <div class="p-4 bg-indigo-100 dark:bg-indigo-900/50 rounded-full mb-4">
              <svg
                class="w-12 h-12 text-indigo-500 dark:text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              选择或拖拽图片文件
            </h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">
              支持 JPG、PNG、WebP、GIF 等格式，可批量处理
            </p>
            <button
              @click="$refs.fileInput.click()"
              class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              选择文件
            </button>
          </div>
        </div>
      </div>

      <!-- 压缩设置 -->
      <div class="mb-8" v-if="selectedFiles.length > 0">
        <div class="bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">压缩设置</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 压缩模式 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                压缩模式
              </label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    type="radio"
                    v-model="compressionMode"
                    value="quality"
                    class="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-slate-600"
                  />
                  <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    质量优先 (推荐)
                  </span>
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    v-model="compressionMode"
                    value="size"
                    class="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-slate-600"
                  />
                  <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    尺寸优先
                  </span>
                </label>
              </div>
            </div>

            <!-- 质量设置 -->
            <div v-if="compressionMode === 'quality'">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                压缩质量: {{ Math.round(quality * 100) }}%
              </label>
              <input
                type="range"
                v-model.number="quality"
                min="0.1"
                max="1"
                step="0.1"
                class="w-full h-2 bg-gray-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
              />
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>最小</span>
                <span>最大</span>
              </div>
            </div>

            <!-- 文件大小设置 -->
            <div v-if="compressionMode === 'size'">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                目标文件大小: {{ maxSizeMB }}MB
              </label>
              <input
                type="range"
                v-model.number="maxSizeMB"
                min="0.1"
                max="5"
                step="0.1"
                class="w-full h-2 bg-gray-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
              />
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>0.1MB</span>
                <span>5MB</span>
              </div>
            </div>

            <!-- 最大宽度设置 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                最大宽度: {{ maxWidth === 0 ? '不限制' : maxWidth + 'px' }}
              </label>
              <input
                type="range"
                v-model.number="maxWidth"
                min="0"
                max="4000"
                step="100"
                class="w-full h-2 bg-gray-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
              />
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>不限制</span>
                <span>4000px</span>
              </div>
            </div>

            <!-- 最大高度设置 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                最大高度: {{ maxHeight === 0 ? '不限制' : maxHeight + 'px' }}
              </label>
              <input
                type="range"
                v-model.number="maxHeight"
                min="0"
                max="4000"
                step="100"
                class="w-full h-2 bg-gray-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
              />
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>不限制</span>
                <span>4000px</span>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-3 mt-6">
            <button
              @click="compressAll"
              :disabled="isProcessing || selectedFiles.length === 0"
              class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg v-if="isProcessing" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isProcessing ? '处理中...' : '开始压缩' }}
            </button>
            
            <button
              @click="clearAll"
              :disabled="isProcessing"
              class="px-6 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors duration-200"
            >
              清除全部
            </button>

            <button
              v-if="compressedImages.length > 0"
              @click="downloadAll"
              class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6-4h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2z" />
              </svg>
              下载全部
            </button>
          </div>
        </div>
      </div>

      <!-- 文件列表 -->
      <div v-if="selectedFiles.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          v-for="(file, index) in selectedFiles"
          :key="index"
          class="bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
        >
          <div class="flex items-start gap-4">
            <!-- 图片预览 -->
            <div class="flex-shrink-0">
              <img
                v-if="file.preview"
                :src="file.preview"
                :alt="file.name"
                class="w-20 h-20 object-cover rounded-lg border dark:border-slate-600"
              />
              <div v-else class="w-20 h-20 bg-gray-200 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
              </div>
            </div>

            <!-- 文件信息 -->
            <div class="flex-1 min-w-0">
              <h4 class="text-lg font-medium text-gray-900 dark:text-white truncate mb-2">
                {{ file.name }}
              </h4>
              
              <div class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <div class="flex justify-between">
                  <span>原始大小:</span>
                  <span>{{ formatFileSize(file.size) }}</span>
                </div>
                
                <div v-if="file.compressed" class="space-y-1">
                  <div class="flex justify-between">
                    <span>压缩后:</span>
                    <span>{{ formatFileSize(file.compressed.size) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>压缩率:</span>
                    <span class="text-green-600 dark:text-green-400 font-medium">
                      {{ Math.round((1 - file.compressed.size / file.size) * 100) }}%
                    </span>
                  </div>
                </div>

                <div v-if="file.status === 'processing'" class="text-blue-600 dark:text-blue-400">
                  <div class="flex items-center gap-2">
                    <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    处理中...
                  </div>
                </div>

                <div v-if="file.status === 'error'" class="text-red-600 dark:text-red-400">
                  压缩失败: {{ file.error }}
                </div>
              </div>

              <!-- 操作按钮 -->
              <div class="flex gap-2 mt-4">
                <button
                  v-if="file.compressed"
                  @click="downloadSingle(file)"
                  class="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors duration-200"
                >
                  下载
                </button>
                
                <button
                  @click="removeFile(index)"
                  :disabled="isProcessing"
                  class="px-3 py-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white text-sm rounded transition-colors duration-200"
                >
                  移除
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 返回按钮 -->
      <div class="mt-12 text-center">
        <router-link
          to="/"
          class="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回工具列表
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import imageCompression from 'browser-image-compression'

// 响应式数据
const fileInput = ref(null)
const isDragOver = ref(false)
const isProcessing = ref(false)
const selectedFiles = ref([])
const compressedImages = ref([])

// 压缩设置
const compressionMode = ref('quality') // 'quality' 或 'size'
const quality = ref(0.8) // 压缩质量 (0.1 - 1.0)
const maxSizeMB = ref(1) // 最大文件大小 MB
const maxWidth = ref(1920) // 最大宽度
const maxHeight = ref(1080) // 最大高度

// 处理文件选择
const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  addFiles(files)
}

// 处理拖拽文件
const handleDrop = (event) => {
  event.preventDefault()
  isDragOver.value = false
  const files = Array.from(event.dataTransfer.files).filter(file => file.type.startsWith('image/'))
  addFiles(files)
}

// 添加文件到列表
const addFiles = (files) => {
  files.forEach(file => {
    // 检查是否已存在
    const exists = selectedFiles.value.some(existing => 
      existing.name === file.name && existing.size === file.size
    )
    
    if (!exists) {
      const fileObj = {
        file: file,
        name: file.name,
        size: file.size,
        preview: null,
        status: 'pending', // pending, processing, completed, error
        compressed: null,
        error: null
      }
      
      // 生成预览
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          fileObj.preview = e.target.result
        }
        reader.readAsDataURL(file)
      }
      
      selectedFiles.value.push(fileObj)
    }
  })
}

// 压缩单个文件
const compressSingle = async (fileObj) => {
  try {
    fileObj.status = 'processing'
    
    const options = {
      maxSizeMB: compressionMode.value === 'size' ? maxSizeMB.value : undefined,
      maxWidthOrHeight: Math.max(maxWidth.value || 0, maxHeight.value || 0) || undefined,
      useWebWorker: true,
      fileType: fileObj.file.type
    }
    
    if (compressionMode.value === 'quality') {
      options.initialQuality = quality.value
    }
    
    // 如果设置了最大尺寸，添加到选项中
    if (maxWidth.value > 0) options.maxWidth = maxWidth.value
    if (maxHeight.value > 0) options.maxHeight = maxHeight.value
    
    const compressedFile = await imageCompression(fileObj.file, options)
    
    fileObj.compressed = {
      file: compressedFile,
      size: compressedFile.size,
      url: URL.createObjectURL(compressedFile)
    }
    fileObj.status = 'completed'
    
    // 添加到已压缩列表
    if (!compressedImages.value.includes(fileObj)) {
      compressedImages.value.push(fileObj)
    }
    
  } catch (error) {
    console.error('压缩失败:', error)
    fileObj.status = 'error'
    fileObj.error = error.message
  }
}

// 压缩所有文件
const compressAll = async () => {
  isProcessing.value = true
  
  // 重置状态
  selectedFiles.value.forEach(file => {
    if (file.status !== 'completed') {
      file.status = 'pending'
      file.compressed = null
      file.error = null
    }
  })
  
  // 并发处理文件，但限制并发数量
  const concurrency = 3
  const pendingFiles = selectedFiles.value.filter(file => file.status === 'pending')
  
  for (let i = 0; i < pendingFiles.length; i += concurrency) {
    const batch = pendingFiles.slice(i, i + concurrency)
    await Promise.all(batch.map(file => compressSingle(file)))
  }
  
  isProcessing.value = false
}

// 下载单个文件
const downloadSingle = (fileObj) => {
  if (!fileObj.compressed) return
  
  const link = document.createElement('a')
  link.href = fileObj.compressed.url
  link.download = `compressed_${fileObj.name}`
  link.click()
}

// 下载所有压缩后的文件
const downloadAll = () => {
  compressedImages.value.forEach(file => {
    setTimeout(() => downloadSingle(file), 100)
  })
}

// 移除文件
const removeFile = (index) => {
  const file = selectedFiles.value[index]
  if (file.compressed && file.compressed.url) {
    URL.revokeObjectURL(file.compressed.url)
  }
  
  selectedFiles.value.splice(index, 1)
  
  // 从已压缩列表中移除
  const compressedIndex = compressedImages.value.indexOf(file)
  if (compressedIndex > -1) {
    compressedImages.value.splice(compressedIndex, 1)
  }
}

// 清除所有文件
const clearAll = () => {
  // 清理对象URL
  selectedFiles.value.forEach(file => {
    if (file.compressed && file.compressed.url) {
      URL.revokeObjectURL(file.compressed.url)
    }
  })
  
  selectedFiles.value = []
  compressedImages.value = []
  
  // 清除文件输入
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// 格式化文件大小
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

// 清理资源
const cleanup = () => {
  selectedFiles.value.forEach(file => {
    if (file.compressed && file.compressed.url) {
      URL.revokeObjectURL(file.compressed.url)
    }
  })
}

// 组件卸载时清理资源
import { onBeforeUnmount } from 'vue'
onBeforeUnmount(() => {
  cleanup()
})
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #4f46e5;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #4f46e5;
  cursor: pointer;
  border: none;
}
</style>