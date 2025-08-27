<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 p-8">
    <div class="max-w-md mx-auto">
      <!-- 页面标题 -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">颜色转换器</h1>
        <p class="text-gray-600 dark:text-gray-400">在 HEX, RGB, HSL 等常用颜色格式之间进行转换</p>
      </div>

      <!-- 主要内容区域 -->
      <div class="bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">

        <div class="flex justify-center mb-8">
          <div class="relative">
            <input
              type="color"
              v-model="hexColor"
              @input="updateFromPicker"
              class="w-32 h-32 border-none cursor-pointer rounded-full shadow-lg"
            />
            <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-purple-100 dark:bg-purple-900/50 px-3 py-1 rounded-lg">
              <span class="text-sm text-purple-700 dark:text-purple-300 font-medium">颜色选择器</span>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="space-y-2">
            <label for="hex" class="block text-sm font-semibold text-gray-900 dark:text-white">HEX 十六进制</label>
            <input
              id="hex"
              type="text"
              v-model="hexColor"
              @input="updateFromHex"
              class="w-full p-3 border-2 rounded-lg bg-white/50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              :class="{ 'border-red-500 dark:border-red-400': !isValid, 'border-gray-200 dark:border-slate-600': isValid }"
            />
          </div>

          <div class="space-y-2">
            <label for="rgb" class="block text-sm font-semibold text-gray-900 dark:text-white">RGB 红绿蓝</label>
            <input
              id="rgb"
              type="text"
              v-model="rgbColor"
              @input="updateFromRgb"
              class="w-full p-3 border-2 rounded-lg bg-white/50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              :class="{ 'border-red-500 dark:border-red-400': !isValid, 'border-gray-200 dark:border-slate-600': isValid }"
            />
          </div>

          <div class="space-y-2">
            <label for="hsl" class="block text-sm font-semibold text-gray-900 dark:text-white">HSL 色相饱和度亮度</label>
            <input
              id="hsl"
              type="text"
              v-model="hslColor"
              @input="updateFromHsl"
              class="w-full p-3 border-2 rounded-lg bg-white/50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              :class="{ 'border-red-500 dark:border-red-400': !isValid, 'border-gray-200 dark:border-slate-600': isValid }"
            />
          </div>
        </div>
        
        <!-- 错误提示 -->
        <div v-if="!isValid" class="mt-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-red-700 dark:text-red-300">无效的颜色格式</span>
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
import { ref, watch } from 'vue'
import tinycolor from 'tinycolor2'

const color = ref(tinycolor('#8A2BE2')) // 初始颜色：蓝紫色
const isValid = ref(true)

const hexColor = ref(color.value.toHexString())
const rgbColor = ref(color.value.toRgbString())
const hslColor = ref(color.value.toHslString())

const updateColors = (newColor) => {
  if (newColor.isValid()) {
    isValid.value = true
    color.value = newColor
    hexColor.value = newColor.toHexString()
    rgbColor.value = newColor.toRgbString()
    hslColor.value = newColor.toHslString()
  } else {
    isValid.value = false
  }
}

const updateFromPicker = (e) => {
  updateColors(tinycolor(e.target.value))
}

const updateFromHex = (e) => {
  const newColor = tinycolor(e.target.value)
  if (newColor.isValid()) {
    updateColors(newColor)
  } else {
    hexColor.value = e.target.value
    isValid.value = false
  }
}

const updateFromRgb = (e) => {
    const newColor = tinycolor(e.target.value)
    if(newColor.isValid()) {
        updateColors(newColor)
    } else {
        rgbColor.value = e.target.value
        isValid.value = false
    }
}

const updateFromHsl = (e) => {
    const newColor = tinycolor(e.target.value)
    if(newColor.isValid()) {
        updateColors(newColor)
    } else {
        hslColor.value = e.target.value
        isValid.value = false
    }
}
</script>

<style scoped>
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
  border-radius: 50%;
}
input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 50%;
}
input[type="color"]::-moz-color-swatch {
  border: none;
  border-radius: 50%;
}
</style> 