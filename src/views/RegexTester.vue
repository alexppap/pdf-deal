<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 p-4 sm:p-8 lg:p-12">
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
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">正则表达式测试器</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          实时测试正则表达式，高亮显示匹配结果，提供常用模式库
        </p>
      </div>

      <!-- 主要内容区域 -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <!-- 左侧：正则表达式输入和测试文本 -->
        <div class="xl:col-span-2 space-y-6">
          <!-- 正则表达式输入 -->
          <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">正则表达式</h2>
            
            <div class="space-y-4">
              <!-- 正则表达式输入框 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  输入正则表达式
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-mono text-lg">/</span>
                  <input
                    v-model="regexPattern"
                    type="text"
                    placeholder="请输入正则表达式..."
                    class="w-full pl-8 pr-12 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors font-mono"
                    @input="testRegex"
                  />
                  <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-mono text-lg">/{{ regexFlags }}</span>
                </div>
              </div>

              <!-- 标志选项 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  正则表达式标志
                </label>
                <div class="flex flex-wrap gap-4">
                  <label class="flex items-center">
                    <input
                      v-model="flags.global"
                      type="checkbox"
                      class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      @change="testRegex"
                    />
                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      全局匹配 (g)
                    </span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="flags.ignoreCase"
                      type="checkbox"
                      class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      @change="testRegex"
                    />
                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      忽略大小写 (i)
                    </span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="flags.multiline"
                      type="checkbox"
                      class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      @change="testRegex"
                    />
                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      多行模式 (m)
                    </span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="flags.dotAll"
                      type="checkbox"
                      class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      @change="testRegex"
                    />
                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      点号匹配所有 (s)
                    </span>
                  </label>
                </div>
              </div>

              <!-- 错误提示 -->
              <div v-if="regexError" class="p-3 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-400 text-sm">
                <div class="font-medium">正则表达式语法错误：</div>
                <div class="mt-1">{{ regexError }}</div>
              </div>

              <!-- 匹配统计 -->
              <div v-if="matchStats && !regexError" class="p-3 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 rounded-lg">
                <div class="text-sm text-teal-700 dark:text-teal-300">
                  <span class="font-medium">匹配结果：</span>
                  找到 {{ matchStats.totalMatches }} 个匹配项
                  <span v-if="matchStats.totalMatches > 0">
                    （共 {{ matchStats.groups }} 个分组）
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 测试文本输入 -->
          <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold text-gray-800 dark:text-white">测试文本</h2>
              <div class="flex gap-2">
                <button
                  @click="clearTestText"
                  class="px-3 py-1 text-sm bg-gray-100 dark:bg-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-500 transition-colors"
                >
                  清空
                </button>
                <button
                  @click="loadSampleText"
                  class="px-3 py-1 text-sm bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-lg hover:bg-teal-200 dark:hover:bg-teal-800/50 transition-colors"
                >
                  加载示例
                </button>
              </div>
            </div>
            
            <textarea
              v-model="testText"
              placeholder="请输入要测试的文本..."
              rows="8"
              class="w-full px-3 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-y font-mono text-sm"
              @input="testRegex"
            ></textarea>
          </div>

          <!-- 匹配结果高亮显示 -->
          <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">匹配结果高亮</h2>
            
            <div class="border border-gray-200 dark:border-slate-600 rounded-lg p-4 bg-white dark:bg-slate-800 min-h-[200px] font-mono text-sm whitespace-pre-wrap overflow-auto max-h-96">
              <div v-if="!testText" class="text-gray-400 dark:text-gray-500 italic">
                请输入测试文本...
              </div>
              <div v-else-if="regexError" class="text-gray-700 dark:text-gray-300">
                {{ testText }}
              </div>
              <div v-else v-html="highlightedText" class="text-gray-700 dark:text-gray-300"></div>
            </div>
          </div>

          <!-- 详细匹配信息 -->
          <div v-if="detailedMatches.length > 0" class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">详细匹配信息</h2>
            
            <div class="space-y-4 max-h-96 overflow-auto">
              <div
                v-for="(match, index) in detailedMatches"
                :key="index"
                class="p-4 border border-gray-200 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700/50"
              >
                <div class="flex justify-between items-start mb-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">匹配 #{{ index + 1 }}</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">位置: {{ match.index }} - {{ match.index + match.match.length - 1 }}</span>
                </div>
                <div class="space-y-2">
                  <div>
                    <span class="text-xs text-gray-500 dark:text-gray-400">完整匹配:</span>
                    <div class="font-mono text-sm bg-white dark:bg-slate-800 p-2 rounded border border-gray-200 dark:border-slate-600 break-all">
                      {{ match.match }}
                    </div>
                  </div>
                  <div v-if="match.groups.length > 0">
                    <span class="text-xs text-gray-500 dark:text-gray-400">捕获分组:</span>
                    <div class="space-y-1 mt-1">
                      <div
                        v-for="(group, groupIndex) in match.groups"
                        :key="groupIndex"
                        class="flex items-center gap-2"
                      >
                        <span class="text-xs text-gray-500 dark:text-gray-400 w-12">${{ groupIndex + 1 }}:</span>
                        <div class="font-mono text-sm bg-white dark:bg-slate-800 px-2 py-1 rounded border border-gray-200 dark:border-slate-600 flex-1 break-all">
                          {{ group || '(空)' }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：常用正则表达式模式库 -->
        <div class="space-y-6">
          <!-- 常用模式 -->
          <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">常用正则模式</h2>
            
            <div class="space-y-3">
              <div
                v-for="pattern in commonPatterns"
                :key="pattern.name"
                class="p-3 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                @click="usePattern(pattern)"
              >
                <div class="font-medium text-sm text-gray-800 dark:text-white mb-1">
                  {{ pattern.name }}
                </div>
                <div class="font-mono text-xs text-teal-600 dark:text-teal-400 mb-1 break-all">
                  {{ pattern.pattern }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {{ pattern.description }}
                </div>
              </div>
            </div>
          </div>

          <!-- 语法说明 -->
          <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">语法说明</h2>
            
            <div class="space-y-3 text-sm">
              <div class="grid grid-cols-1 gap-2">
                <div
                  v-for="syntax in regexSyntax"
                  :key="syntax.pattern"
                  class="flex items-start gap-2"
                >
                  <code class="font-mono text-xs bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-teal-600 dark:text-teal-400 whitespace-nowrap">
                    {{ syntax.pattern }}
                  </code>
                  <span class="text-gray-600 dark:text-gray-400 text-xs leading-5">
                    {{ syntax.description }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 快速操作 -->
          <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">快速操作</h2>
            
            <div class="space-y-3">
              <button
                @click="escapeSpecialChars"
                class="w-full px-4 py-2 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-lg hover:bg-teal-200 dark:hover:bg-teal-800/50 transition-colors text-sm"
              >
                转义特殊字符
              </button>
              <button
                @click="generateFromSelection"
                class="w-full px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors text-sm"
              >
                从选中文本生成
              </button>
              <button
                @click="copyRegexPattern"
                class="w-full px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors text-sm"
              >
                复制正则表达式
              </button>
              <button
                @click="copyMatches"
                :disabled="detailedMatches.length === 0"
                class="w-full px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                复制匹配结果
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

// 响应式数据
const regexPattern = ref('')
const testText = ref('')
const regexError = ref('')

// 正则表达式标志
const flags = ref({
  global: true,
  ignoreCase: false,
  multiline: false,
  dotAll: false
})

// 匹配结果
const matches = ref([])
const detailedMatches = ref([])

// 计算属性
const regexFlags = computed(() => {
  let flagString = ''
  if (flags.value.global) flagString += 'g'
  if (flags.value.ignoreCase) flagString += 'i'
  if (flags.value.multiline) flagString += 'm'
  if (flags.value.dotAll) flagString += 's'
  return flagString
})

const matchStats = computed(() => {
  if (matches.value.length === 0) return null
  
  const totalMatches = matches.value.length
  const groups = matches.value[0] ? matches.value[0].length - 1 : 0
  
  return { totalMatches, groups }
})

const highlightedText = computed(() => {
  if (!testText.value || regexError.value || matches.value.length === 0) {
    return escapeHtml(testText.value)
  }
  
  // 创建一个数组来存储文本片段
  const segments = []
  let lastIndex = 0
  
  // 按位置排序匹配项
  const sortedMatches = [...matches.value].sort((a, b) => a.index - b.index)
  
  for (const match of sortedMatches) {
    // 添加匹配前的文本
    if (match.index > lastIndex) {
      segments.push({
        text: testText.value.substring(lastIndex, match.index),
        isMatch: false
      })
    }
    
    // 添加匹配的文本
    segments.push({
      text: match[0],
      isMatch: true
    })
    
    lastIndex = match.index + match[0].length
  }
  
  // 添加剩余的文本
  if (lastIndex < testText.value.length) {
    segments.push({
      text: testText.value.substring(lastIndex),
      isMatch: false
    })
  }
  
  // 构建HTML字符串
  return segments.map(segment => {
    const escapedText = escapeHtml(segment.text)
    return segment.isMatch 
      ? `<span class="bg-yellow-200 dark:bg-yellow-600/50 px-1 rounded font-semibold">${escapedText}</span>`
      : escapedText
  }).join('')
})

// 转义HTML特殊字符
const escapeHtml = (text) => {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// 测试正则表达式
const testRegex = () => {
  regexError.value = ''
  matches.value = []
  detailedMatches.value = []
  
  if (!regexPattern.value || !testText.value) {
    return
  }
  
  try {
    const regex = new RegExp(regexPattern.value, regexFlags.value)
    let allMatches = []
    
    if (flags.value.global) {
      // 使用 matchAll 进行全局匹配
      allMatches = [...testText.value.matchAll(regex)]
    } else {
      // 使用 match 进行单次匹配
      const singleMatch = testText.value.match(regex)
      if (singleMatch) {
        // 为单次匹配添加 index 属性
        singleMatch.index = singleMatch.index || testText.value.indexOf(singleMatch[0])
        allMatches = [singleMatch]
      }
    }
    
    matches.value = allMatches
    detailedMatches.value = allMatches.map((match, index) => ({
      index: match.index,
      match: match[0],
      groups: match.slice(1)
    }))
    
  } catch (error) {
    regexError.value = error.message
  }
}

// 常用正则表达式模式
const commonPatterns = [
  {
    name: '邮箱地址',
    pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
    description: '匹配有效的邮箱地址格式',
    flags: { global: true, ignoreCase: true, multiline: false, dotAll: false }
  },
  {
    name: '手机号码',
    pattern: '1[3-9]\\d{9}',
    description: '匹配中国大陆手机号码',
    flags: { global: true, ignoreCase: false, multiline: false, dotAll: false }
  },
  {
    name: '身份证号',
    pattern: '\\b[1-9]\\d{5}(18|19|20)\\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])\\d{3}[\\dXx]\\b',
    description: '匹配18位身份证号码',
    flags: { global: true, ignoreCase: false, multiline: false, dotAll: false }
  },
  {
    name: 'IP地址',
    pattern: '\\b(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\b',
    description: '匹配IPv4地址',
    flags: { global: true, ignoreCase: false, multiline: false, dotAll: false }
  },
  {
    name: 'URL链接',
    pattern: 'https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
    description: '匹配HTTP/HTTPS网址',
    flags: { global: true, ignoreCase: true, multiline: false, dotAll: false }
  },
  {
    name: '日期格式',
    pattern: '\\d{4}[-/]\\d{1,2}[-/]\\d{1,2}',
    description: '匹配YYYY-MM-DD或YYYY/MM/DD格式日期',
    flags: { global: true, ignoreCase: false, multiline: false, dotAll: false }
  },
  {
    name: '中文字符',
    pattern: '[\\u4e00-\\u9fa5]+',
    description: '匹配中文字符',
    flags: { global: true, ignoreCase: false, multiline: false, dotAll: false }
  },
  {
    name: '数字',
    pattern: '\\d+(?:\\.\\d+)?',
    description: '匹配整数或小数',
    flags: { global: true, ignoreCase: false, multiline: false, dotAll: false }
  },
  {
    name: '十六进制颜色',
    pattern: '#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})',
    description: '匹配十六进制颜色代码',
    flags: { global: true, ignoreCase: false, multiline: false, dotAll: false }
  },
  {
    name: 'HTML标签',
    pattern: '<[^>]+>',
    description: '匹配HTML标签',
    flags: { global: true, ignoreCase: true, multiline: false, dotAll: false }
  }
]

// 正则表达式语法说明
const regexSyntax = [
  { pattern: '.', description: '匹配任意单个字符（除换行符）' },
  { pattern: '*', description: '匹配前面的字符0次或多次' },
  { pattern: '+', description: '匹配前面的字符1次或多次' },
  { pattern: '?', description: '匹配前面的字符0次或1次' },
  { pattern: '^', description: '匹配行的开始' },
  { pattern: '$', description: '匹配行的结束' },
  { pattern: '\\d', description: '匹配数字字符 [0-9]' },
  { pattern: '\\w', description: '匹配单词字符 [a-zA-Z0-9_]' },
  { pattern: '\\s', description: '匹配空白字符' },
  { pattern: '[abc]', description: '匹配方括号中的任意字符' },
  { pattern: '[^abc]', description: '匹配不在方括号中的任意字符' },
  { pattern: '(pattern)', description: '捕获分组' },
  { pattern: '(?:pattern)', description: '非捕获分组' },
  { pattern: '{n}', description: '精确匹配n次' },
  { pattern: '{n,}', description: '匹配n次或更多' },
  { pattern: '{n,m}', description: '匹配n到m次' }
]

// 示例文本
const sampleText = `这是一个测试文本，包含各种内容：

邮箱地址：user@example.com, test.email+tag@domain.co.uk
手机号码：13812345678, 15987654321
网址：https://www.example.com, http://test.domain.org/path?param=value
日期：2024-01-15, 2023/12/31
颜色代码：#FF0000, #00ff00, #123ABC
数字：123, 45.67, -89.01

HTML内容：<div class="container"><p>段落内容</p></div>

中文内容：这里有一些中文字符用于测试正则表达式的匹配功能。

IP地址：192.168.1.1, 10.0.0.1, 255.255.255.0

特殊字符：@#$%^&*()_+-=[]{}|;:'",./<>?`

// 使用模式
const usePattern = (pattern) => {
  regexPattern.value = pattern.pattern
  flags.value = { ...pattern.flags }
  nextTick(() => {
    testRegex()
  })
}

// 加载示例文本
const loadSampleText = () => {
  testText.value = sampleText
  nextTick(() => {
    testRegex()
  })
}

// 清空测试文本
const clearTestText = () => {
  testText.value = ''
  matches.value = []
  detailedMatches.value = []
}

// 转义特殊字符
const escapeSpecialChars = () => {
  if (!regexPattern.value) return
  
  const specialChars = /[.*+?^${}()|[\]\\]/g
  regexPattern.value = regexPattern.value.replace(specialChars, '\\$&')
  testRegex()
}

// 从选中文本生成正则
const generateFromSelection = () => {
  // 这里简化处理，实际实现可以通过文本选择API获取选中内容
  if (!testText.value) return
  
  // 简单示例：如果有匹配结果，生成一个通用模式
  if (detailedMatches.value.length > 0) {
    const firstMatch = detailedMatches.value[0].match
    regexPattern.value = escapeRegexString(firstMatch)
    testRegex()
  }
}

// 转义正则字符串
const escapeRegexString = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// 复制正则表达式
const copyRegexPattern = async () => {
  if (!regexPattern.value) return
  
  try {
    const fullPattern = `/${regexPattern.value}/${regexFlags.value}`
    await navigator.clipboard.writeText(fullPattern)
    // 这里可以添加成功提示
  } catch (err) {
    console.error('复制失败:', err)
  }
}

// 复制匹配结果
const copyMatches = async () => {
  if (detailedMatches.value.length === 0) return
  
  try {
    const matchText = detailedMatches.value.map(match => match.match).join('\n')
    await navigator.clipboard.writeText(matchText)
    // 这里可以添加成功提示
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<style scoped>
</style>