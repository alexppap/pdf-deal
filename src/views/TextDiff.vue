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
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">文本差异对比</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          智能比较两段文本的差异，支持行级对比和字符级对比
        </p>
      </div>

      <!-- 对比模式选择 -->
      <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white">对比模式：</h2>
            <div class="flex gap-2">
              <button
                @click="diffMode = 'line'"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                  diffMode === 'line'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                ]"
              >
                行级对比
              </button>
              <button
                @click="diffMode = 'char'"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                  diffMode === 'char'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                ]"
              >
                字符级对比
              </button>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <label class="flex items-center text-sm text-gray-700 dark:text-gray-300">
              <input v-model="ignoreWhitespace" type="checkbox" class="mr-2 text-blue-600 focus:ring-blue-500">
              忽略空格
            </label>
            <label class="flex items-center text-sm text-gray-700 dark:text-gray-300">
              <input v-model="ignoreCase" type="checkbox" class="mr-2 text-blue-600 focus:ring-blue-500">
              忽略大小写
            </label>
          </div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <!-- 原始文本 -->
        <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
              <div class="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg mr-2">
                <svg class="w-5 h-5 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              原始文本
            </h2>
            <div class="flex gap-2">
              <button
                @click="pasteFromClipboard('original')"
                class="px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                粘贴
              </button>
              <button
                @click="uploadFile('original')"
                class="px-3 py-1.5 text-sm bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                上传文件
              </button>
              <button
                @click="originalText = ''"
                class="px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                清空
              </button>
            </div>
          </div>
          <textarea
            v-model="originalText"
            placeholder="在此输入或粘贴原始文本..."
            class="w-full h-96 px-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-y font-mono text-sm"
          ></textarea>
          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {{ originalText.length }} 字符 / {{ originalText.split('\n').length }} 行
          </div>
        </div>

        <!-- 新文本 -->
        <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
              <div class="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg mr-2">
                <svg class="w-5 h-5 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              新文本
            </h2>
            <div class="flex gap-2">
              <button
                @click="pasteFromClipboard('new')"
                class="px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                粘贴
              </button>
              <button
                @click="uploadFile('new')"
                class="px-3 py-1.5 text-sm bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                上传文件
              </button>
              <button
                @click="newText = ''"
                class="px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                清空
              </button>
            </div>
          </div>
          <textarea
            v-model="newText"
            placeholder="在此输入或粘贴新文本..."
            class="w-full h-96 px-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-y font-mono text-sm"
          ></textarea>
          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {{ newText.length }} 字符 / {{ newText.split('\n').length }} 行
          </div>
        </div>
      </div>

      <!-- 对比按钮 -->
      <div class="text-center mb-6">
        <button
          @click="compareDiff"
          :disabled="!originalText || !newText"
          class="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100"
        >
          <svg class="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
          </svg>
          开始对比
        </button>
      </div>

      <!-- 对比结果 -->
      <div v-if="diffResult.length > 0" class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
            <div class="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg mr-2">
              <svg class="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            对比结果
          </h2>
          <div class="flex gap-2">
            <button
              @click="copyDiffResult"
              class="px-3 py-1.5 text-sm bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              复制结果
            </button>
            <button
              @click="exportDiffResult"
              class="px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              导出为HTML
            </button>
          </div>
        </div>

        <!-- 统计信息 -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div class="text-sm text-gray-600 dark:text-gray-400">删除</div>
            <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ diffStats.deleted }}</div>
          </div>
          <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div class="text-sm text-gray-600 dark:text-gray-400">新增</div>
            <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ diffStats.added }}</div>
          </div>
          <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div class="text-sm text-gray-600 dark:text-gray-400">相同</div>
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ diffStats.equal }}</div>
          </div>
        </div>

        <!-- 差异显示 -->
        <div class="bg-white dark:bg-slate-700 rounded-lg p-4 max-h-96 overflow-y-auto border border-gray-200 dark:border-slate-600">
          <div v-if="diffMode === 'line'" class="space-y-1">
            <div
              v-for="(line, index) in diffResult"
              :key="index"
              :class="getDiffLineClass(line.type)"
              class="px-3 py-1 rounded font-mono text-sm whitespace-pre-wrap break-words"
            >
              <span class="inline-block w-6 text-gray-400 select-none">{{ line.lineNumber }}</span>
              <span class="inline-block w-6 select-none">{{ getDiffLineSymbol(line.type) }}</span>
              <span>{{ line.content }}</span>
            </div>
          </div>
          <div v-else class="font-mono text-sm whitespace-pre-wrap break-words" v-html="charDiffHtml"></div>
        </div>
      </div>

      <!-- 使用说明 -->
      <div v-else class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-lg p-6">
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
            <p><strong>行级对比：</strong>按行比较文本，适合比较代码、配置文件等结构化文本</p>
          </div>
          <div class="flex items-start">
            <span class="text-yellow-500 mr-2">•</span>
            <p><strong>字符级对比：</strong>逐字符比较，更精确地显示文本变化</p>
          </div>
          <div class="flex items-start">
            <span class="text-yellow-500 mr-2">•</span>
            <p><strong>忽略空格：</strong>比较时忽略空格和制表符的差异</p>
          </div>
          <div class="flex items-start">
            <span class="text-yellow-500 mr-2">•</span>
            <p><strong>忽略大小写：</strong>比较时不区分大小写字母</p>
          </div>
          <div class="flex items-start">
            <span class="text-yellow-500 mr-2">•</span>
            <p><strong>文件上传：</strong>支持上传文本文件（.txt, .md, .js, .json 等）进行对比</p>
          </div>
          <div class="flex items-start">
            <span class="text-yellow-500 mr-2">•</span>
            <p><strong>颜色说明：</strong>
              <span class="inline-block px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded ml-1">红色表示删除</span>
              <span class="inline-block px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded ml-1">绿色表示新增</span>
              <span class="inline-block px-2 py-0.5 bg-gray-100 dark:bg-slate-600 text-gray-700 dark:text-gray-300 rounded ml-1">灰色表示相同</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 隐藏的文件上传输入 -->
    <input
      ref="fileInput"
      type="file"
      accept=".txt,.md,.js,.json,.css,.html,.xml,.csv,.log"
      @change="handleFileUpload"
      class="hidden"
    >

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
import DiffMatchPatch from 'diff-match-patch'

// 文本内容
const originalText = ref('')
const newText = ref('')

// 对比模式
const diffMode = ref('line') // 'line' 或 'char'
const ignoreWhitespace = ref(false)
const ignoreCase = ref(false)

// 对比结果
const diffResult = ref([])
const charDiffHtml = ref('')

// 文件上传
const fileInput = ref(null)
const currentUploadTarget = ref('') // 'original' 或 'new'

// 成功提示
const showSuccess = ref(false)
const successMessage = ref('')

// 差异统计
const diffStats = computed(() => {
  const stats = {
    added: 0,
    deleted: 0,
    equal: 0
  }

  if (diffMode.value === 'line') {
    diffResult.value.forEach(line => {
      if (line.type === 'added') stats.added++
      else if (line.type === 'deleted') stats.deleted++
      else if (line.type === 'equal') stats.equal++
    })
  }

  return stats
})

/**
 * 预处理文本（根据选项）
 */
const preprocessText = (text) => {
  let processed = text

  if (ignoreCase.value) {
    processed = processed.toLowerCase()
  }

  if (ignoreWhitespace.value) {
    processed = processed.replace(/\s+/g, ' ').trim()
  }

  return processed
}

/**
 * 行级对比
 */
const compareLines = () => {
  const lines1 = preprocessText(originalText.value).split('\n')
  const lines2 = preprocessText(newText.value).split('\n')

  const dmp = new DiffMatchPatch()
  const diffs = dmp.diff_main(lines1.join('\n'), lines2.join('\n'))
  dmp.diff_cleanupSemantic(diffs)

  const result = []
  let lineNumber = 0

  diffs.forEach(([type, text]) => {
    const lines = text.split('\n')
    lines.forEach((line, index) => {
      if (index === lines.length - 1 && line === '') return

      lineNumber++

      if (type === 0) {
        // 相同
        result.push({
          type: 'equal',
          content: line,
          lineNumber
        })
      } else if (type === -1) {
        // 删除
        result.push({
          type: 'deleted',
          content: line,
          lineNumber
        })
      } else if (type === 1) {
        // 新增
        result.push({
          type: 'added',
          content: line,
          lineNumber
        })
      }
    })
  })

  diffResult.value = result
}

/**
 * 字符级对比
 */
const compareChars = () => {
  const text1 = preprocessText(originalText.value)
  const text2 = preprocessText(newText.value)

  const dmp = new DiffMatchPatch()
  const diffs = dmp.diff_main(text1, text2)
  dmp.diff_cleanupSemantic(diffs)

  let html = ''
  let added = 0
  let deleted = 0
  let equal = 0

  diffs.forEach(([type, text]) => {
    const encodedText = escapeHtml(text)

    if (type === 0) {
      // 相同
      html += `<span class="text-gray-700 dark:text-gray-300">${encodedText}</span>`
      equal += text.length
    } else if (type === -1) {
      // 删除
      html += `<span class="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">${encodedText}</span>`
      deleted += text.length
    } else if (type === 1) {
      // 新增
      html += `<span class="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">${encodedText}</span>`
      added += text.length
    }
  })

  charDiffHtml.value = html

  // 更新统计（对于字符级对比）
  diffStats.value.added = added
  diffStats.value.deleted = deleted
  diffStats.value.equal = equal
}

/**
 * HTML 转义
 */
const escapeHtml = (text) => {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

/**
 * 执行对比
 */
const compareDiff = () => {
  if (!originalText.value || !newText.value) {
    return
  }

  if (diffMode.value === 'line') {
    compareLines()
  } else {
    compareChars()
  }
}

/**
 * 获取差异行的样式类
 */
const getDiffLineClass = (type) => {
  switch (type) {
    case 'added':
      return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-l-4 border-green-500'
    case 'deleted':
      return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-l-4 border-red-500'
    case 'equal':
      return 'bg-gray-50 dark:bg-slate-600/30 text-gray-700 dark:text-gray-300'
    default:
      return ''
  }
}

/**
 * 获取差异行的符号
 */
const getDiffLineSymbol = (type) => {
  switch (type) {
    case 'added':
      return '+'
    case 'deleted':
      return '-'
    case 'equal':
      return ' '
    default:
      return ''
  }
}

/**
 * 从剪贴板粘贴
 */
const pasteFromClipboard = async (target) => {
  try {
    const text = await navigator.clipboard.readText()
    if (target === 'original') {
      originalText.value = text
    } else {
      newText.value = text
    }
    showSuccessMessage('文本已粘贴')
  } catch (err) {
    console.error('粘贴失败:', err)
    showSuccessMessage('粘贴失败，请手动粘贴')
  }
}

/**
 * 上传文件
 */
const uploadFile = (target) => {
  currentUploadTarget.value = target
  fileInput.value.click()
}

/**
 * 处理文件上传
 */
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const content = e.target.result
    if (currentUploadTarget.value === 'original') {
      originalText.value = content
    } else {
      newText.value = content
    }
    showSuccessMessage('文件已加载')
  }
  reader.onerror = () => {
    showSuccessMessage('文件读取失败')
  }
  reader.readAsText(file)

  // 重置文件输入
  event.target.value = ''
}

/**
 * 复制对比结果
 */
const copyDiffResult = async () => {
  let textToCopy = ''

  if (diffMode.value === 'line') {
    textToCopy = diffResult.value
      .map(line => `${getDiffLineSymbol(line.type)} ${line.content}`)
      .join('\n')
  } else {
    // 从 HTML 中提取纯文本
    const div = document.createElement('div')
    div.innerHTML = charDiffHtml.value
    textToCopy = div.textContent || div.innerText || ''
  }

  try {
    await navigator.clipboard.writeText(textToCopy)
    showSuccessMessage('对比结果已复制')
  } catch (err) {
    console.error('复制失败:', err)
    showSuccessMessage('复制失败')
  }
}

/**
 * 导出为 HTML
 */
const exportDiffResult = () => {
  let html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>文本差异对比结果</title>
  <style>
    body {
      font-family: 'Courier New', monospace;
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h1 {
      color: #333;
      border-bottom: 2px solid #4F46E5;
      padding-bottom: 10px;
    }
    .stats {
      display: flex;
      gap: 20px;
      margin: 20px 0;
    }
    .stat-box {
      padding: 10px 20px;
      border-radius: 6px;
      font-weight: bold;
    }
    .stat-added { background: #DEF7EC; color: #03543F; }
    .stat-deleted { background: #FDE8E8; color: #9B1C1C; }
    .stat-equal { background: #E1EFFE; color: #1E429F; }
    .diff-line {
      padding: 4px 12px;
      margin: 2px 0;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .added {
      background: #DEF7EC;
      color: #03543F;
      border-left: 4px solid #0E9F6E;
    }
    .deleted {
      background: #FDE8E8;
      color: #9B1C1C;
      border-left: 4px solid #F05252;
    }
    .equal {
      background: #F9FAFB;
      color: #374151;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>文本差异对比结果</h1>
    <p>生成时间: ${new Date().toLocaleString('zh-CN')}</p>
    <div class="stats">
      <div class="stat-box stat-added">新增: ${diffStats.value.added}</div>
      <div class="stat-box stat-deleted">删除: ${diffStats.value.deleted}</div>
      <div class="stat-box stat-equal">相同: ${diffStats.value.equal}</div>
    </div>
    <div class="diff-content">
`

  if (diffMode.value === 'line') {
    diffResult.value.forEach(line => {
      html += `      <div class="diff-line ${line.type}">${escapeHtml(getDiffLineSymbol(line.type) + ' ' + line.content)}</div>\n`
    })
  } else {
    html += `      <div class="diff-line">${charDiffHtml.value}</div>\n`
  }

  html += `
    </div>
  </div>
</body>
</html>
`

  // 创建 Blob 并下载
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `text-diff-${Date.now()}.html`
  link.click()
  URL.revokeObjectURL(url)

  showSuccessMessage('HTML 文件已导出')
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
/* 自定义滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
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

/* textarea 样式 */
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
