<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 p-8">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          随机数生成器
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          生成各种类型的随机数据，支持多种格式和配置选项
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 基础数字生成器 -->
        <div class="bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center">
            <div class="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg mr-3">
              <svg class="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
            </div>
            数字生成器
          </h2>
          
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">最小值</label>
              <input 
                v-model.number="numberConfig.min" 
                type="number" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">最大值</label>
              <input 
                v-model.number="numberConfig.max" 
                type="number" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">生成数量</label>
              <input 
                v-model.number="numberConfig.count" 
                type="number" 
                min="1" 
                max="1000"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">小数位数</label>
              <input 
                v-model.number="numberConfig.decimals" 
                type="number" 
                min="0" 
                max="10"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>

          <div class="mb-4">
            <label class="flex items-center">
              <input 
                v-model="numberConfig.unique" 
                type="checkbox" 
                class="mr-2 text-blue-600 focus:ring-blue-500"
              >
              <span class="text-sm text-gray-700 dark:text-gray-300">生成不重复的数字</span>
            </label>
          </div>

          <button 
            @click="generateNumbers" 
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            生成随机数
          </button>
        </div>

        <!-- 字符串生成器 -->
        <div class="bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center">
            <div class="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg mr-3">
              <svg class="w-6 h-6 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
              </svg>
            </div>
            字符串生成器
          </h2>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">字符串长度</label>
            <input 
              v-model.number="stringConfig.length" 
              type="number" 
              min="1" 
              max="100"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
            >
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">字符类型</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input v-model="stringConfig.includeUppercase" type="checkbox" class="mr-2 text-green-600">
                <span class="text-sm text-gray-700 dark:text-gray-300">大写字母 (A-Z)</span>
              </label>
              <label class="flex items-center">
                <input v-model="stringConfig.includeLowercase" type="checkbox" class="mr-2 text-green-600">
                <span class="text-sm text-gray-700 dark:text-gray-300">小写字母 (a-z)</span>
              </label>
              <label class="flex items-center">
                <input v-model="stringConfig.includeNumbers" type="checkbox" class="mr-2 text-green-600">
                <span class="text-sm text-gray-700 dark:text-gray-300">数字 (0-9)</span>
              </label>
              <label class="flex items-center">
                <input v-model="stringConfig.includeSymbols" type="checkbox" class="mr-2 text-green-600">
                <span class="text-sm text-gray-700 dark:text-gray-300">特殊字符 (!@#$%...)</span>
              </label>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">生成数量</label>
            <input 
              v-model.number="stringConfig.count" 
              type="number" 
              min="1" 
              max="100"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
            >
          </div>

          <button 
            @click="generateStrings" 
            :disabled="!hasSelectedCharTypes"
            class="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            生成随机字符串
          </button>
        </div>

        <!-- 特殊类型生成器 -->
        <div class="bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center">
            <div class="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg mr-3">
              <svg class="w-6 h-6 text-purple-500 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            特殊类型生成器
          </h2>

          <div class="space-y-3">
            <button 
              @click="generateUUID" 
              class="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              生成 UUID
            </button>
            
            <button 
              @click="generateColor" 
              class="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              生成随机颜色 (HEX)
            </button>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">密码长度</label>
              <input 
                v-model.number="passwordLength" 
                type="number" 
                min="8" 
                max="50"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 mb-2"
              >
              <button 
                @click="generatePassword" 
                class="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                生成安全密码
              </button>
            </div>
          </div>
        </div>

        <!-- 结果显示区域 -->
        <div class="bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center">
            <div class="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg mr-3">
              <svg class="w-6 h-6 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            生成结果
          </h2>

          <div v-if="results.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
            选择一个生成器开始生成随机数据
          </div>

          <div v-else>
            <div class="flex justify-between items-center mb-4">
              <span class="text-sm text-gray-600 dark:text-gray-400">
                共 {{ results.length }} 条结果
              </span>
              <div class="space-x-2">
                <button 
                  @click="copyAllResults" 
                  class="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded-md transition-colors duration-200"
                >
                  全部复制
                </button>
                <button 
                  @click="clearResults" 
                  class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition-colors duration-200"
                >
                  清空
                </button>
              </div>
            </div>

            <div class="max-h-96 overflow-y-auto space-y-2">
              <div 
                v-for="(result, index) in results" 
                :key="index"
                class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg group hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                <span class="font-mono text-sm text-gray-800 dark:text-gray-200 break-all">
                  {{ result }}
                </span>
                <button 
                  @click="copyToClipboard(result)" 
                  class="ml-2 px-2 py-1 bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 text-gray-700 dark:text-gray-200 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  复制
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 复制成功提示 -->
    <div 
      v-if="showCopySuccess"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300"
      :class="showCopySuccess ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'"
    >
      ✅ 复制成功！
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 数字生成器配置
const numberConfig = ref({
  min: 1,
  max: 100,
  count: 1,
  decimals: 0,
  unique: false
})

// 字符串生成器配置
const stringConfig = ref({
  length: 8,
  count: 1,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: false
})

// 密码长度
const passwordLength = ref(16)

// 结果数组
const results = ref([])

// 复制成功提示
const showCopySuccess = ref(false)

// 计算属性：检查是否选择了字符类型
const hasSelectedCharTypes = computed(() => {
  return stringConfig.value.includeUppercase || 
         stringConfig.value.includeLowercase || 
         stringConfig.value.includeNumbers || 
         stringConfig.value.includeSymbols
})

// 生成随机数字
const generateNumbers = () => {
  const newResults = []
  const { min, max, count, decimals, unique } = numberConfig.value
  
  if (min >= max) {
    alert('最小值必须小于最大值')
    return
  }

  if (unique && (max - min + 1) < count && decimals === 0) {
    alert('在不重复模式下，范围内的整数数量不足')
    return
  }

  const usedNumbers = new Set()
  
  for (let i = 0; i < count; i++) {
    let number
    let attempts = 0
    
    do {
      const randomValue = Math.random() * (max - min) + min
      number = decimals === 0 ? Math.floor(randomValue) : parseFloat(randomValue.toFixed(decimals))
      attempts++
    } while (unique && usedNumbers.has(number) && attempts < 1000)
    
    if (unique && usedNumbers.has(number)) {
      break
    }
    
    usedNumbers.add(number)
    newResults.push(number.toString())
  }
  
  results.value = newResults
}

// 生成随机字符串
const generateStrings = () => {
  if (!hasSelectedCharTypes.value) return
  
  const chars = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  }
  
  let charSet = ''
  if (stringConfig.value.includeUppercase) charSet += chars.uppercase
  if (stringConfig.value.includeLowercase) charSet += chars.lowercase
  if (stringConfig.value.includeNumbers) charSet += chars.numbers
  if (stringConfig.value.includeSymbols) charSet += chars.symbols
  
  const newResults = []
  for (let i = 0; i < stringConfig.value.count; i++) {
    let randomString = ''
    for (let j = 0; j < stringConfig.value.length; j++) {
      randomString += charSet.charAt(Math.floor(Math.random() * charSet.length))
    }
    newResults.push(randomString)
  }
  
  results.value = newResults
}

// 生成UUID
const generateUUID = () => {
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
  results.value = [uuid]
}

// 生成随机颜色
const generateColor = () => {
  const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  results.value = [color]
}

// 生成安全密码
const generatePassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
  let password = ''
  
  // 确保包含每种类型的字符
  const requiredChars = [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'abcdefghijklmnopqrstuvwxyz',
    '0123456789',
    '!@#$%^&*()_+-='
  ]
  
  // 先添加必需的字符类型
  requiredChars.forEach(charSet => {
    password += charSet.charAt(Math.floor(Math.random() * charSet.length))
  })
  
  // 填充剩余长度
  for (let i = password.length; i < passwordLength.value; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  // 打乱密码字符顺序
  password = password.split('').sort(() => Math.random() - 0.5).join('')
  
  results.value = [password]
}

// 复制到剪贴板
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    showCopySuccessMessage()
  } catch (err) {
    console.error('复制失败:', err)
  }
}

// 复制所有结果
const copyAllResults = async () => {
  const allText = results.value.join('\n')
  await copyToClipboard(allText)
}

// 清空结果
const clearResults = () => {
  results.value = []
}

// 显示复制成功消息
const showCopySuccessMessage = () => {
  showCopySuccess.value = true
  setTimeout(() => {
    showCopySuccess.value = false
  }, 2000)
}
</script>

<style scoped>
/* 自定义滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark .overflow-y-auto::-webkit-scrollbar-track {
  background: #334155;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background: #64748b;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #475569;
}
</style>