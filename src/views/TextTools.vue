<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 p-4 sm:p-8">
    <div class="max-w-7xl mx-auto">
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
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">文本工具集</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          提供大小写转换、去重、排序、统计等多种文本处理功能
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左侧：文本输入区 -->
        <div class="lg:col-span-2 space-y-6">
          <!-- 输入区域 -->
          <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-800 dark:text-white">输入文本</h2>
              <div class="flex gap-2">
                <button
                  @click="pasteFromClipboard"
                  class="px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  粘贴
                </button>
                <button
                  @click="clearInput"
                  class="px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  清空
                </button>
              </div>
            </div>
            <textarea
              v-model="inputText"
              placeholder="在此输入或粘贴文本..."
              class="w-full h-64 px-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y font-mono text-sm"
              @input="updateStats"
            ></textarea>
          </div>

          <!-- 输出区域 -->
          <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-800 dark:text-white">处理结果</h2>
              <button
                @click="copyToClipboard"
                :disabled="!outputText"
                class="px-3 py-1.5 text-sm bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                复制结果
              </button>
            </div>
            <textarea
              v-model="outputText"
              readonly
              placeholder="处理结果将显示在这里..."
              class="w-full h-64 px-4 py-3 border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white rounded-lg resize-y font-mono text-sm"
            ></textarea>
          </div>

          <!-- 文本统计 -->
          <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">文本统计</h2>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div class="text-sm text-gray-600 dark:text-gray-400">字符数</div>
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ stats.chars }}</div>
              </div>
              <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div class="text-sm text-gray-600 dark:text-gray-400">单词数</div>
                <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ stats.words }}</div>
              </div>
              <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div class="text-sm text-gray-600 dark:text-gray-400">行数</div>
                <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ stats.lines }}</div>
              </div>
              <div class="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div class="text-sm text-gray-600 dark:text-gray-400">段落数</div>
                <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ stats.paragraphs }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：工具面板 -->
        <div class="space-y-6">
          <!-- 大小写转换 -->
          <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <div class="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg mr-2">
                <svg class="w-5 h-5 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                </svg>
              </div>
              大小写转换
            </h3>
            <div class="space-y-2">
              <button @click="toUpperCase" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                转为大写 (UPPERCASE)
              </button>
              <button @click="toLowerCase" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                转为小写 (lowercase)
              </button>
              <button @click="toCapitalize" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                首字母大写 (Capitalize)
              </button>
              <button @click="toTitleCase" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                标题格式 (Title Case)
              </button>
              <button @click="toggleCase" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                切换大小写 (tOGGLE)
              </button>
            </div>
          </div>

          <!-- 排序与去重 -->
          <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <div class="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg mr-2">
                <svg class="w-5 h-5 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path>
                </svg>
              </div>
              排序与去重
            </h3>
            <div class="space-y-2">
              <button @click="sortAscending" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                升序排序 (A→Z)
              </button>
              <button @click="sortDescending" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                降序排序 (Z→A)
              </button>
              <button @click="sortByLength" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                按长度排序
              </button>
              <button @click="removeDuplicates" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                去除重复行
              </button>
              <button @click="shuffle" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                随机打乱
              </button>
            </div>
          </div>

          <!-- 文本处理 -->
          <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <div class="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg mr-2">
                <svg class="w-5 h-5 text-purple-500 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              文本处理
            </h3>
            <div class="space-y-2">
              <button @click="removeEmptyLines" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                去除空行
              </button>
              <button @click="trimLines" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                修剪每行空格
              </button>
              <button @click="addLineNumbers" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                添加行号
              </button>
              <button @click="removeLineNumbers" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                删除行号
              </button>
              <button @click="reverseText" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                反转文本
              </button>
              <button @click="reverseLines" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                反转行序
              </button>
            </div>
          </div>

          <!-- 编码处理 -->
          <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <div class="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg mr-2">
                <svg class="w-5 h-5 text-orange-500 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
              </div>
              编码处理
            </h3>
            <div class="space-y-2">
              <button @click="urlEncode" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                URL 编码
              </button>
              <button @click="urlDecode" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                URL 解码
              </button>
              <button @click="htmlEncode" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                HTML 转义
              </button>
              <button @click="htmlDecode" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                HTML 反转义
              </button>
              <button @click="base64Encode" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                Base64 编码
              </button>
              <button @click="base64Decode" class="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors">
                Base64 解码
              </button>
            </div>
          </div>

          <!-- 查找替换 -->
          <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <div class="p-2 bg-pink-100 dark:bg-pink-900/50 rounded-lg mr-2">
                <svg class="w-5 h-5 text-pink-500 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              查找替换
            </h3>
            <div class="space-y-3">
              <input
                v-model="findText"
                type="text"
                placeholder="查找内容"
                class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-pink-500"
              />
              <input
                v-model="replaceText"
                type="text"
                placeholder="替换为"
                class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-pink-500"
              />
              <div class="flex items-center space-x-2">
                <label class="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <input v-model="caseSensitive" type="checkbox" class="mr-1.5 text-pink-600">
                  区分大小写
                </label>
                <label class="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <input v-model="useRegex" type="checkbox" class="mr-1.5 text-pink-600">
                  正则表达式
                </label>
              </div>
              <button @click="findAndReplace" class="w-full px-4 py-2 text-sm bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors">
                执行替换
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 复制成功提示 -->
    <div
      v-if="showCopySuccess"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300"
    >
      ✅ 复制成功！
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// 响应式数据
const inputText = ref('')
const outputText = ref('')
const showCopySuccess = ref(false)

// 查找替换
const findText = ref('')
const replaceText = ref('')
const caseSensitive = ref(false)
const useRegex = ref(false)

// 文本统计
const stats = ref({
  chars: 0,
  words: 0,
  lines: 0,
  paragraphs: 0
})

// 更新统计信息
const updateStats = () => {
  const text = inputText.value

  stats.value.chars = text.length
  stats.value.words = text.trim() ? text.trim().split(/\s+/).length : 0
  stats.value.lines = text ? text.split('\n').length : 0
  stats.value.paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).length : 0
}

// 监听输入变化
watch(inputText, updateStats, { immediate: true })

// 从剪贴板粘贴
const pasteFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText()
    inputText.value = text
  } catch (err) {
    console.error('粘贴失败:', err)
  }
}

// 清空输入
const clearInput = () => {
  inputText.value = ''
  outputText.value = ''
}

// 复制到剪贴板
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(outputText.value)
    showCopySuccessMessage()
  } catch (err) {
    console.error('复制失败:', err)
  }
}

// 显示复制成功消息
const showCopySuccessMessage = () => {
  showCopySuccess.value = true
  setTimeout(() => {
    showCopySuccess.value = false
  }, 2000)
}

// === 大小写转换 ===

// 转为大写
const toUpperCase = () => {
  outputText.value = inputText.value.toUpperCase()
}

// 转为小写
const toLowerCase = () => {
  outputText.value = inputText.value.toLowerCase()
}

// 首字母大写
const toCapitalize = () => {
  outputText.value = inputText.value.charAt(0).toUpperCase() + inputText.value.slice(1).toLowerCase()
}

// 标题格式（每个单词首字母大写）
const toTitleCase = () => {
  outputText.value = inputText.value.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

// 切换大小写
const toggleCase = () => {
  outputText.value = inputText.value
    .split('')
    .map(char => {
      if (char === char.toUpperCase()) {
        return char.toLowerCase()
      } else {
        return char.toUpperCase()
      }
    })
    .join('')
}

// === 排序与去重 ===

// 升序排序
const sortAscending = () => {
  const lines = inputText.value.split('\n')
  const sorted = [...lines].sort((a, b) => a.localeCompare(b, 'zh-CN'))
  outputText.value = sorted.join('\n')
}

// 降序排序
const sortDescending = () => {
  const lines = inputText.value.split('\n')
  const sorted = [...lines].sort((a, b) => b.localeCompare(a, 'zh-CN'))
  outputText.value = sorted.join('\n')
}

// 按长度排序
const sortByLength = () => {
  const lines = inputText.value.split('\n')
  const sorted = [...lines].sort((a, b) => a.length - b.length)
  outputText.value = sorted.join('\n')
}

// 去除重复行
const removeDuplicates = () => {
  const lines = inputText.value.split('\n')
  const uniqueLines = [...new Set(lines)]
  outputText.value = uniqueLines.join('\n')
}

// 随机打乱（使用 Fisher-Yates 洗牌算法）
const shuffle = () => {
  const lines = inputText.value.split('\n')
  const shuffled = [...lines]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  outputText.value = shuffled.join('\n')
}

// === 文本处理 ===

// 去除空行
const removeEmptyLines = () => {
  const lines = inputText.value.split('\n')
  const nonEmptyLines = lines.filter(line => line.trim() !== '')
  outputText.value = nonEmptyLines.join('\n')
}

// 修剪每行空格
const trimLines = () => {
  const lines = inputText.value.split('\n')
  const trimmedLines = lines.map(line => line.trim())
  outputText.value = trimmedLines.join('\n')
}

// 添加行号
const addLineNumbers = () => {
  const lines = inputText.value.split('\n')
  const numberedLines = lines.map((line, index) => `${index + 1}. ${line}`)
  outputText.value = numberedLines.join('\n')
}

// 删除行号
const removeLineNumbers = () => {
  const lines = inputText.value.split('\n')
  const unnumberedLines = lines.map(line => line.replace(/^\d+\.\s*/, ''))
  outputText.value = unnumberedLines.join('\n')
}

// 反转文本
const reverseText = () => {
  outputText.value = inputText.value.split('').reverse().join('')
}

// 反转行序
const reverseLines = () => {
  const lines = inputText.value.split('\n')
  outputText.value = lines.reverse().join('\n')
}

// === 编码处理 ===

// URL 编码
const urlEncode = () => {
  try {
    outputText.value = encodeURIComponent(inputText.value)
  } catch (err) {
    outputText.value = '编码失败: ' + err.message
  }
}

// URL 解码
const urlDecode = () => {
  try {
    outputText.value = decodeURIComponent(inputText.value)
  } catch (err) {
    outputText.value = '解码失败: ' + err.message
  }
}

// HTML 转义
const htmlEncode = () => {
  const div = document.createElement('div')
  div.textContent = inputText.value
  outputText.value = div.innerHTML
}

// HTML 反转义
const htmlDecode = () => {
  const div = document.createElement('div')
  div.innerHTML = inputText.value
  outputText.value = div.textContent || ''
}

// Base64 编码
const base64Encode = () => {
  try {
    outputText.value = btoa(unescape(encodeURIComponent(inputText.value)))
  } catch (err) {
    outputText.value = '编码失败: ' + err.message
  }
}

// Base64 解码
const base64Decode = () => {
  try {
    outputText.value = decodeURIComponent(escape(atob(inputText.value)))
  } catch (err) {
    outputText.value = '解码失败: ' + err.message
  }
}

// === 查找替换 ===

// 查找并替换
const findAndReplace = () => {
  if (!findText.value) {
    outputText.value = inputText.value
    return
  }

  try {
    if (useRegex.value) {
      // 正则表达式替换
      const flags = caseSensitive.value ? 'g' : 'gi'
      const regex = new RegExp(findText.value, flags)
      outputText.value = inputText.value.replace(regex, replaceText.value)
    } else {
      // 普通替换
      if (caseSensitive.value) {
        outputText.value = inputText.value.split(findText.value).join(replaceText.value)
      } else {
        const regex = new RegExp(findText.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
        outputText.value = inputText.value.replace(regex, replaceText.value)
      }
    }
  } catch (err) {
    outputText.value = '替换失败: ' + err.message
  }
}
</script>

<style scoped>
/* 自定义滚动条样式 */
textarea::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark textarea::-webkit-scrollbar-track {
  background: #334155;
}

.dark textarea::-webkit-scrollbar-thumb {
  background: #64748b;
}

.dark textarea::-webkit-scrollbar-thumb:hover {
  background: #475569;
}
</style>
