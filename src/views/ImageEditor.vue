<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 p-4 sm:p-8">
    <!-- 标题部分 -->
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          图片裁剪与调整工具
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          支持图片裁剪、尺寸调整、旋转和翻转操作
        </p>
      </div>

      <!-- 工具栏 -->
      <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-6">
        <div class="flex flex-wrap gap-4 items-center justify-center">
          <!-- 文件上传 -->
          <div class="flex-1 min-w-[200px]">
            <label class="block">
              <input
                type="file"
                accept="image/*"
                @change="handleFileUpload"
                class="hidden"
                ref="fileInput"
              />
              <div
                class="cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl text-center transition-colors font-medium"
              >
                {{ originalImage ? '重新选择图片' : '选择图片' }}
              </div>
            </label>
          </div>

          <!-- 操作按钮 -->
          <div v-if="originalImage" class="flex gap-3 flex-wrap">
            <button
              @click="rotateLeft"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              title="左旋转90°"
            >
              ↺ 左转
            </button>
            <button
              @click="rotateRight"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              title="右旋转90°"
            >
              ↻ 右转
            </button>
            <button
              @click="flipHorizontal"
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              title="水平翻转"
            >
              ⟷ 水平翻转
            </button>
            <button
              @click="flipVertical"
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              title="垂直翻转"
            >
              ↕ 垂直翻转
            </button>
            <button
              @click="resetImage"
              class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              重置
            </button>
          </div>
        </div>
      </div>

      <!-- 主要编辑区域 -->
      <div v-if="originalImage" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左侧：原图与裁剪区域 -->
        <div class="lg:col-span-2">
          <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              编辑区域
            </h3>
            
            <!-- 画布容器 -->
            <div class="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-4 bg-gray-50 dark:bg-slate-900/50">
              <div class="relative inline-block max-w-full">
                <canvas
                  ref="canvas"
                  class="max-w-full h-auto border border-gray-200 dark:border-slate-700 rounded-lg cursor-crosshair"
                  @mousedown="startCrop"
                  @mousemove="updateCrop"
                  @mouseup="endCrop"
                ></canvas>
                
                <!-- 裁剪框 -->
                <div
                  v-if="cropArea.show"
                  class="absolute border-2 border-blue-500 bg-blue-500/20"
                  :style="{
                    left: cropArea.x + 'px',
                    top: cropArea.y + 'px',
                    width: cropArea.width + 'px',
                    height: cropArea.height + 'px'
                  }"
                ></div>
              </div>
            </div>

            <!-- 裁剪控制 -->
            <div v-if="cropArea.show" class="mt-4 flex gap-3">
              <button
                @click="applyCrop"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                应用裁剪
              </button>
              <button
                @click="cancelCrop"
                class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                取消裁剪
              </button>
            </div>
          </div>
        </div>

        <!-- 右侧：控制面板和预览 -->
        <div class="space-y-6">
          <!-- 尺寸调整 -->
          <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              尺寸调整
            </h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  宽度 (px)
                </label>
                <input
                  v-model.number="resizeWidth"
                  type="number"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  min="1"
                  @input="updateResize"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  高度 (px)
                </label>
                <input
                  v-model.number="resizeHeight"
                  type="number"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  min="1"
                  @input="updateResize"
                />
              </div>
              
              <div class="flex items-center">
                <input
                  v-model="maintainAspectRatio"
                  type="checkbox"
                  class="mr-2"
                  @change="updateResize"
                />
                <label class="text-sm text-gray-700 dark:text-gray-300">
                  保持宽高比
                </label>
              </div>
              
              <button
                @click="applyResize"
                class="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                应用尺寸调整
              </button>
            </div>
          </div>

          <!-- 图片信息 -->
          <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              图片信息
            </h3>
            
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">原始尺寸:</span>
                <span class="text-gray-900 dark:text-white">
                  {{ originalWidth }} × {{ originalHeight }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">当前尺寸:</span>
                <span class="text-gray-900 dark:text-white">
                  {{ currentWidth }} × {{ currentHeight }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">文件类型:</span>
                <span class="text-gray-900 dark:text-white">{{ fileType }}</span>
              </div>
            </div>
          </div>

          <!-- 下载按钮 -->
          <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              导出图片
            </h3>
            
            <div class="space-y-3">
              <select
                v-model="exportFormat"
                class="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WebP</option>
              </select>
              
              <div v-if="exportFormat === 'jpeg'" class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  JPEG 质量: {{ jpegQuality }}%
                </label>
                <input
                  v-model.number="jpegQuality"
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  class="w-full"
                />
              </div>
              
              <button
                @click="downloadImage"
                class="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                下载图片
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 提示信息 -->
      <div v-if="!originalImage" class="text-center py-20">
        <div class="bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-md mx-auto">
          <div class="p-4 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl mb-4 inline-block">
            <svg
              class="w-12 h-12 text-indigo-500 dark:text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            选择要编辑的图片
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            支持 JPG、PNG、WebP、GIF 等常见格式
          </p>
          <button
            @click="$refs.fileInput.click()"
            class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl transition-colors font-medium"
          >
            选择图片文件
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'

// 响应式数据
const fileInput = ref(null)
const canvas = ref(null)
const originalImage = ref(null)
const currentImageData = ref(null)

// 图片信息
const originalWidth = ref(0)
const originalHeight = ref(0)
const currentWidth = ref(0)
const currentHeight = ref(0)
const fileType = ref('')

// 裁剪相关
const cropArea = reactive({
  show: false,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  startX: 0,
  startY: 0,
  isDrawing: false
})

// 尺寸调整
const resizeWidth = ref(0)
const resizeHeight = ref(0)
const maintainAspectRatio = ref(true)

// 导出设置
const exportFormat = ref('png')
const jpegQuality = ref(85)

// 文件上传处理
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // 检查文件类型
  if (!file.type.startsWith('image/')) {
    alert('请选择有效的图片文件！')
    return
  }

  fileType.value = file.type.split('/')[1].toUpperCase()
  
  const reader = new FileReader()
  reader.onload = (e) => {
    loadImage(e.target.result)
  }
  reader.readAsDataURL(file)
}

// 加载图片到画布
const loadImage = (imageSrc) => {
  const img = new Image()
  img.onload = () => {
    originalImage.value = img
    originalWidth.value = img.width
    originalHeight.value = img.height
    currentWidth.value = img.width
    currentHeight.value = img.height
    resizeWidth.value = img.width
    resizeHeight.value = img.height
    
    nextTick(() => {
      drawImageToCanvas(img)
    })
  }
  img.src = imageSrc
}

// 绘制图片到画布
const drawImageToCanvas = (img) => {
  const ctx = canvas.value.getContext('2d')
  
  // 计算适合显示的尺寸（最大800px宽度）
  const maxDisplayWidth = 800
  let displayWidth = img.width
  let displayHeight = img.height
  
  if (displayWidth > maxDisplayWidth) {
    const ratio = maxDisplayWidth / displayWidth
    displayWidth = maxDisplayWidth
    displayHeight = displayHeight * ratio
  }
  
  canvas.value.width = displayWidth
  canvas.value.height = displayHeight
  
  ctx.clearRect(0, 0, displayWidth, displayHeight)
  ctx.drawImage(img, 0, 0, displayWidth, displayHeight)
  
  // 保存当前画布内容
  currentImageData.value = ctx.getImageData(0, 0, displayWidth, displayHeight)
}

// 裁剪功能
const startCrop = (event) => {
  const rect = canvas.value.getBoundingClientRect()
  cropArea.startX = event.clientX - rect.left
  cropArea.startY = event.clientY - rect.top
  cropArea.isDrawing = true
  cropArea.show = false
}

const updateCrop = (event) => {
  if (!cropArea.isDrawing) return
  
  const rect = canvas.value.getBoundingClientRect()
  const currentX = event.clientX - rect.left
  const currentY = event.clientY - rect.top
  
  cropArea.x = Math.min(cropArea.startX, currentX)
  cropArea.y = Math.min(cropArea.startY, currentY)
  cropArea.width = Math.abs(currentX - cropArea.startX)
  cropArea.height = Math.abs(currentY - cropArea.startY)
  cropArea.show = true
}

const endCrop = () => {
  cropArea.isDrawing = false
}

const applyCrop = () => {
  if (!cropArea.show) return
  
  const ctx = canvas.value.getContext('2d')
  const scaleX = currentWidth.value / canvas.value.width
  const scaleY = currentHeight.value / canvas.value.height
  
  // 获取裁剪区域的图片数据
  const croppedImageData = ctx.getImageData(
    cropArea.x,
    cropArea.y,
    cropArea.width,
    cropArea.height
  )
  
  // 调整画布尺寸为裁剪区域大小
  canvas.value.width = cropArea.width
  canvas.value.height = cropArea.height
  currentWidth.value = Math.round(cropArea.width * scaleX)
  currentHeight.value = Math.round(cropArea.height * scaleY)
  resizeWidth.value = currentWidth.value
  resizeHeight.value = currentHeight.value
  
  // 绘制裁剪后的图片
  ctx.putImageData(croppedImageData, 0, 0)
  currentImageData.value = croppedImageData
  
  cancelCrop()
}

const cancelCrop = () => {
  cropArea.show = false
  cropArea.width = 0
  cropArea.height = 0
}

// 旋转功能
const rotateLeft = () => {
  rotateImage(-90)
}

const rotateRight = () => {
  rotateImage(90)
}

const rotateImage = (degrees) => {
  const ctx = canvas.value.getContext('2d')
  const currentCanvas = document.createElement('canvas')
  const currentCtx = currentCanvas.getContext('2d')
  
  // 保存当前画布内容
  currentCanvas.width = canvas.value.width
  currentCanvas.height = canvas.value.height
  currentCtx.drawImage(canvas.value, 0, 0)
  
  // 交换宽高
  const newWidth = canvas.value.height
  const newHeight = canvas.value.width
  
  canvas.value.width = newWidth
  canvas.value.height = newHeight
  
  // 更新尺寸信息
  ;[currentWidth.value, currentHeight.value] = [currentHeight.value, currentWidth.value]
  ;[resizeWidth.value, resizeHeight.value] = [resizeHeight.value, resizeWidth.value]
  
  ctx.save()
  ctx.translate(newWidth / 2, newHeight / 2)
  ctx.rotate((degrees * Math.PI) / 180)
  ctx.drawImage(currentCanvas, -currentCanvas.width / 2, -currentCanvas.height / 2)
  ctx.restore()
  
  currentImageData.value = ctx.getImageData(0, 0, newWidth, newHeight)
}

// 翻转功能
const flipHorizontal = () => {
  flipImage(true, false)
}

const flipVertical = () => {
  flipImage(false, true)
}

const flipImage = (horizontal, vertical) => {
  const ctx = canvas.value.getContext('2d')
  const currentCanvas = document.createElement('canvas')
  const currentCtx = currentCanvas.getContext('2d')
  
  // 保存当前画布内容
  currentCanvas.width = canvas.value.width
  currentCanvas.height = canvas.value.height
  currentCtx.drawImage(canvas.value, 0, 0)
  
  ctx.save()
  
  if (horizontal) {
    ctx.scale(-1, 1)
    ctx.translate(-canvas.value.width, 0)
  }
  
  if (vertical) {
    ctx.scale(1, -1)
    ctx.translate(0, -canvas.value.height)
  }
  
  ctx.drawImage(currentCanvas, 0, 0)
  ctx.restore()
  
  currentImageData.value = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height)
}

// 尺寸调整
const updateResize = () => {
  if (maintainAspectRatio.value && originalImage.value) {
    const aspectRatio = originalWidth.value / originalHeight.value
    
    // 根据宽度计算高度
    if (resizeWidth.value !== currentWidth.value) {
      resizeHeight.value = Math.round(resizeWidth.value / aspectRatio)
    }
    // 根据高度计算宽度
    else if (resizeHeight.value !== currentHeight.value) {
      resizeWidth.value = Math.round(resizeHeight.value * aspectRatio)
    }
  }
}

const applyResize = () => {
  if (!originalImage.value || resizeWidth.value <= 0 || resizeHeight.value <= 0) return
  
  const ctx = canvas.value.getContext('2d')
  const tempCanvas = document.createElement('canvas')
  const tempCtx = tempCanvas.getContext('2d')
  
  // 保存当前画布内容到临时画布
  tempCanvas.width = canvas.value.width
  tempCanvas.height = canvas.value.height
  tempCtx.drawImage(canvas.value, 0, 0)
  
  // 调整画布尺寸
  const scale = Math.min(800 / resizeWidth.value, 600 / resizeHeight.value, 1)
  canvas.value.width = resizeWidth.value * scale
  canvas.value.height = resizeHeight.value * scale
  
  // 绘制调整后的图片
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.drawImage(tempCanvas, 0, 0, canvas.value.width, canvas.value.height)
  
  currentWidth.value = resizeWidth.value
  currentHeight.value = resizeHeight.value
  currentImageData.value = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height)
}

// 重置图片
const resetImage = () => {
  if (originalImage.value) {
    drawImageToCanvas(originalImage.value)
    currentWidth.value = originalWidth.value
    currentHeight.value = originalHeight.value
    resizeWidth.value = originalWidth.value
    resizeHeight.value = originalHeight.value
    cancelCrop()
  }
}

// 下载图片
const downloadImage = () => {
  if (!canvas.value) return
  
  // 创建一个新画布，使用实际输出尺寸
  const outputCanvas = document.createElement('canvas')
  const outputCtx = outputCanvas.getContext('2d')
  
  outputCanvas.width = currentWidth.value
  outputCanvas.height = currentHeight.value
  
  // 将当前画布内容绘制到输出画布
  outputCtx.drawImage(canvas.value, 0, 0, currentWidth.value, currentHeight.value)
  
  // 确定MIME类型和质量
  let mimeType = `image/${exportFormat.value}`
  let quality = exportFormat.value === 'jpeg' ? jpegQuality.value / 100 : undefined
  
  // 转换为Blob并下载
  outputCanvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `edited_image.${exportFormat.value}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, mimeType, quality)
}
</script>