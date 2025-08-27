<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900">
    <!-- 工具栏 -->
    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-slate-700 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- 左侧标题 -->
          <div class="flex items-center gap-4">
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">Markdown 编辑器</h1>
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-500 dark:text-gray-400">字数:</span>
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ wordCount }}</span>
            </div>
          </div>

          <!-- 右侧工具按钮 -->
          <div class="flex items-center gap-3">
            <!-- 视图切换 -->
            <div class="flex bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
              <button
                @click="viewMode = 'split'"
                :class="[
                  'px-3 py-1 text-sm font-medium rounded-md transition-colors',
                  viewMode === 'split' 
                    ? 'bg-white dark:bg-slate-600 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                ]"
              >
                双栏
              </button>
              <button
                @click="viewMode = 'edit'"
                :class="[
                  'px-3 py-1 text-sm font-medium rounded-md transition-colors',
                  viewMode === 'edit' 
                    ? 'bg-white dark:bg-slate-600 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                ]"
              >
                编辑
              </button>
              <button
                @click="viewMode = 'preview'"
                :class="[
                  'px-3 py-1 text-sm font-medium rounded-md transition-colors',
                  viewMode === 'preview' 
                    ? 'bg-white dark:bg-slate-600 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                ]"
              >
                预览
              </button>
            </div>

            <!-- 文件操作 -->
            <div class="flex items-center gap-2">
              <button
                @click="loadFile"
                class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-1"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                导入
              </button>
              
              <button
                @click="saveAsMarkdown"
                class="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-1"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2z" />
                </svg>
                .md
              </button>

              <button
                @click="saveAsHTML"
                class="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-1"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2z" />
                </svg>
                HTML
              </button>

              <button
                @click="saveAsPDF"
                :disabled="isExporting"
                class="px-3 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-1"
              >
                <svg v-if="isExporting" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2z" />
                </svg>
                {{ isExporting ? '导出中...' : 'PDF' }}
              </button>
            </div>

            <!-- 返回按钮 -->
            <router-link
              to="/"
              class="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑器工具栏 -->
    <div v-if="viewMode !== 'preview'" class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-b border-gray-200 dark:border-slate-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-2 py-2 overflow-x-auto">
          <button
            v-for="tool in editorTools"
            :key="tool.name"
            @click="insertMarkdown(tool.syntax, tool.placeholder)"
            :title="tool.name"
            class="px-3 py-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors duration-200 flex items-center gap-1 whitespace-nowrap"
          >
            <span class="font-mono text-sm">{{ tool.icon }}</span>
            <span class="text-sm">{{ tool.name }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- 双栏布局 -->
      <div v-if="viewMode === 'split'" class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
        <!-- 编辑区域 -->
        <div class="flex flex-col">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">编辑</h3>
            <span class="text-sm text-gray-500 dark:text-gray-400">行数: {{ lineCount }}</span>
          </div>
          <textarea
            ref="editor"
            v-model="markdown"
            @scroll="syncScroll"
            placeholder="在这里输入你的 Markdown 内容..."
            class="flex-1 w-full p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-300 dark:border-slate-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm leading-relaxed text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          ></textarea>
        </div>

        <!-- 预览区域 -->
        <div class="flex flex-col">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">预览</h3>
            <button
              @click="copyHTML"
              class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              复制 HTML
            </button>
          </div>
          <div
            ref="preview"
            class="flex-1 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-300 dark:border-slate-600 rounded-lg overflow-auto prose prose-gray dark:prose-invert max-w-none"
            v-html="htmlContent"
          ></div>
        </div>
      </div>

      <!-- 单栏编辑 -->
      <div v-else-if="viewMode === 'edit'" class="h-[calc(100vh-200px)]">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">编辑</h3>
          <span class="text-sm text-gray-500 dark:text-gray-400">行数: {{ lineCount }}</span>
        </div>
        <textarea
          ref="editorSingle"
          v-model="markdown"
          placeholder="在这里输入你的 Markdown 内容..."
          class="w-full h-full p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-300 dark:border-slate-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm leading-relaxed text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        ></textarea>
      </div>

      <!-- 单栏预览 -->
      <div v-else class="h-[calc(100vh-200px)]">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">预览</h3>
          <button
            @click="copyHTML"
            class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            复制 HTML
          </button>
        </div>
        <div
          ref="preview"
          class="w-full h-full p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-300 dark:border-slate-600 rounded-lg overflow-auto prose prose-gray dark:prose-invert max-w-none"
          v-html="htmlContent"
        ></div>
      </div>
    </div>

    <!-- 隐藏的文件输入 -->
    <input
      ref="fileInput"
      type="file"
      accept=".md,.txt"
      @change="handleFileLoad"
      class="hidden"
    />
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'
import cpp from 'highlight.js/lib/languages/cpp'
import css from 'highlight.js/lib/languages/css'
import html from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'
import sql from 'highlight.js/lib/languages/sql'
import bash from 'highlight.js/lib/languages/bash'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

// 注册常用语言
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('java', java)
hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('css', css)
hljs.registerLanguage('html', html)
hljs.registerLanguage('xml', html)
hljs.registerLanguage('json', json)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('bash', bash)

// 响应式数据
const markdown = ref(`# Markdown 编辑器

欢迎使用功能强大的 Markdown 编辑器！

## 功能特点

### ✨ 实时预览
- 支持双栏布局，左侧编辑，右侧实时预览
- 支持单栏编辑和单栏预览模式
- 同步滚动，编辑和预览保持一致

### 🎨 语法高亮
支持多种编程语言的语法高亮：

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
  return "欢迎使用 Markdown 编辑器";
}
\`\`\`

\`\`\`python
def hello():
    print("Hello, World!")
    return "欢迎使用 Markdown 编辑器"
\`\`\`

### 📝 丰富的语法支持

**文本格式化：**
- **粗体文本**
- *斜体文本*
- ~~删除线文本~~
- \`行内代码\`

**列表：**
1. 有序列表项 1
2. 有序列表项 2
3. 有序列表项 3

- 无序列表项 A
- 无序列表项 B
- 无序列表项 C

**表格：**

| 功能 | 状态 | 描述 |
|------|------|------|
| 实时预览 | ✅ | 支持 |
| 语法高亮 | ✅ | 支持 |
| 导出功能 | ✅ | 支持 |

**引用：**
> 这是一个引用示例
> 支持多行引用

**链接和图片：**
[访问项目主页](/)

### 📤 导出功能
- 导出为 Markdown 文件 (.md)
- 导出为 HTML 文件
- 导出为 PDF 文件

### 🛠️ 快捷工具
使用工具栏快速插入常用的 Markdown 语法。

---

开始编辑，享受写作的乐趣吧！🎉`)

const viewMode = ref('split') // 'split', 'edit', 'preview'
const isExporting = ref(false)
const editor = ref(null)
const editorSingle = ref(null)
const preview = ref(null)
const fileInput = ref(null)

// 编辑器工具
const editorTools = [
  { name: '标题', icon: 'H1', syntax: '# ', placeholder: '标题文本' },
  { name: '粗体', icon: 'B', syntax: '**', placeholder: '粗体文本' },
  { name: '斜体', icon: 'I', syntax: '*', placeholder: '斜体文本' },
  { name: '删除线', icon: '~~', syntax: '~~', placeholder: '删除文本' },
  { name: '引用', icon: '>', syntax: '> ', placeholder: '引用文本' },
  { name: '代码', icon: '`', syntax: '`', placeholder: '代码' },
  { name: '代码块', icon: '```', syntax: '```\n', placeholder: '\n```' },
  { name: '链接', icon: '🔗', syntax: '[', placeholder: '链接文本](URL)' },
  { name: '图片', icon: '🖼️', syntax: '![', placeholder: '图片描述](图片URL)' },
  { name: '列表', icon: '•', syntax: '- ', placeholder: '列表项' },
  { name: '有序列表', icon: '1.', syntax: '1. ', placeholder: '列表项' },
  { name: '表格', icon: '📊', syntax: '| 列1 | 列2 |\n|-----|-----|\n| ', placeholder: '内容1 | 内容2 |' },
  { name: '分割线', icon: '---', syntax: '\n---\n', placeholder: '' }
]

// 配置 marked
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value
      } catch (e) {
        console.warn('语法高亮失败:', e)
      }
    }
    return hljs.highlightAuto(code).value
  },
  breaks: true,
  gfm: true
})

// 计算属性
const htmlContent = computed(() => {
  try {
    return marked(markdown.value)
  } catch (e) {
    console.error('Markdown 解析错误:', e)
    return '<p class="text-red-500">Markdown 解析错误</p>'
  }
})

const wordCount = computed(() => {
  return markdown.value.replace(/\s+/g, ' ').trim().split(' ').filter(word => word.length > 0).length
})

const lineCount = computed(() => {
  return markdown.value.split('\n').length
})

// 插入 Markdown 语法
const insertMarkdown = (syntax, placeholder) => {
  // 根据当前视图模式选择正确的 textarea
  const textarea = viewMode.value === 'edit' ? editorSingle.value : editor.value
  if (!textarea) {
    console.warn('未找到textarea元素，当前视图模式:', viewMode.value)
    return
  }

  // 保存当前滚动位置和选择状态
  const scrollTop = textarea.scrollTop
  const scrollLeft = textarea.scrollLeft
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = textarea.value.substring(start, end)
  
  let insertText = ''
  
  if (syntax.includes('```')) {
    // 代码块特殊处理
    insertText = `\`\`\`\n${selectedText || placeholder}\n\`\`\``
  } else if (syntax === '**' || syntax === '*' || syntax === '~~' || syntax === '`') {
    // 包围语法
    insertText = `${syntax}${selectedText || placeholder}${syntax}`
  } else if (syntax === '[') {
    // 链接特殊处理
    insertText = `[${selectedText || '链接文本'}](URL)`
  } else if (syntax === '![') {
    // 图片特殊处理
    insertText = `![${selectedText || '图片描述'}](图片URL)`
  } else {
    // 前缀语法
    insertText = `${syntax}${selectedText || placeholder}`
  }

  const newValue = textarea.value.substring(0, start) + insertText + textarea.value.substring(end)
  markdown.value = newValue

  // 使用多层异步确保滚动位置稳定
  nextTick(() => {
    // 第一步：立即恢复滚动位置
    textarea.scrollTop = scrollTop
    textarea.scrollLeft = scrollLeft
    
    // 第二步：在下一个动画帧中聚焦和设置选区
    requestAnimationFrame(() => {
      // 使用 preventScroll 选项避免 focus 时的自动滚动
      textarea.focus({ preventScroll: true })
      
      // 设置选区
      if (selectedText) {
        textarea.setSelectionRange(start, start + insertText.length)
      } else {
        // 将光标设置在占位符文本中间
        const placeholderStart = start + syntax.length
        const placeholderEnd = placeholderStart + (placeholder?.length || 0)
        textarea.setSelectionRange(placeholderStart, placeholderEnd)
      }
      
      // 第三步：再次确保滚动位置
      requestAnimationFrame(() => {
        textarea.scrollTop = scrollTop
        textarea.scrollLeft = scrollLeft
        
        // 最后一次确保位置稳定
        setTimeout(() => {
          textarea.scrollTop = scrollTop
          textarea.scrollLeft = scrollLeft
        }, 0)
      })
    })
  })
}

// 同步滚动
const syncScroll = () => {
  if (viewMode.value === 'split' && editor.value && preview.value) {
    const editorScrollTop = editor.value.scrollTop
    const editorScrollHeight = editor.value.scrollHeight - editor.value.clientHeight
    const scrollRatio = editorScrollHeight > 0 ? editorScrollTop / editorScrollHeight : 0
    
    const previewScrollHeight = preview.value.scrollHeight - preview.value.clientHeight
    preview.value.scrollTop = scrollRatio * previewScrollHeight
  }
}

// 加载文件
const loadFile = () => {
  fileInput.value?.click()
}

const handleFileLoad = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    markdown.value = e.target.result
  }
  reader.readAsText(file)

  // 清空输入，允许重新选择同一个文件
  event.target.value = ''
}

// 保存为 Markdown
const saveAsMarkdown = () => {
  const blob = new Blob([markdown.value], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `markdown_${new Date().toISOString().slice(0, 10)}.md`
  link.click()
  URL.revokeObjectURL(url)
}

// 保存为 HTML
const saveAsHTML = () => {
  const htmlTemplate = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Document</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
        }
        .prose {
            color: #374151;
        }
        .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
            color: #111827;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
        }
        .prose blockquote {
            border-left: 4px solid #e5e7eb;
            padding-left: 1em;
            margin: 1.5em 0;
            font-style: italic;
            color: #6b7280;
        }
        .prose table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5em 0;
        }
        .prose th, .prose td {
            border: 1px solid #e5e7eb;
            padding: 8px 12px;
            text-align: left;
        }
        .prose th {
            background-color: #f9fafb;
            font-weight: 600;
        }
        .prose code {
            background-color: #f3f4f6;
            color: #ef4444;
            padding: 0.125em 0.25em;
            border-radius: 0.25rem;
            font-size: 0.875em;
        }
        .prose pre {
            background-color: #1f2937;
            color: #f9fafb;
            padding: 1em;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin: 1.5em 0;
        }
        .prose pre code {
            background-color: transparent;
            color: inherit;
            padding: 0;
        }
    </style>
</head>
<body>
    <div class="prose">
        ${htmlContent.value}
    </div>
</body>
</html>`

  const blob = new Blob([htmlTemplate], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `markdown_${new Date().toISOString().slice(0, 10)}.html`
  link.click()
  URL.revokeObjectURL(url)
}

// 保存为 PDF
const saveAsPDF = async () => {
  try {
    isExporting.value = true

    // 创建临时预览元素
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlContent.value
    tempDiv.style.cssText = `
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      padding: 20px;
      background-color: white;
      width: 794px;
      min-height: 1123px;
      position: absolute;
      top: -9999px;
      left: -9999px;
    `

    // 添加样式
    const style = document.createElement('style')
    style.textContent = `
      h1, h2, h3, h4, h5, h6 {
        color: #111827;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
      }
      blockquote {
        border-left: 4px solid #e5e7eb;
        padding-left: 1em;
        margin: 1.5em 0;
        font-style: italic;
        color: #6b7280;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 1.5em 0;
      }
      th, td {
        border: 1px solid #e5e7eb;
        padding: 8px 12px;
        text-align: left;
      }
      th {
        background-color: #f9fafb;
        font-weight: 600;
      }
      code {
        background-color: #f3f4f6;
        color: #ef4444;
        padding: 0.125em 0.25em;
        border-radius: 0.25rem;
        font-size: 0.875em;
      }
      pre {
        background-color: #1f2937;
        color: #f9fafb;
        padding: 1em;
        border-radius: 0.5rem;
        overflow-x: auto;
        margin: 1.5em 0;
      }
      pre code {
        background-color: transparent;
        color: inherit;
        padding: 0;
      }
    `
    tempDiv.appendChild(style)
    document.body.appendChild(tempDiv)

    // 生成 canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 794,
      windowWidth: 794
    })

    document.body.removeChild(tempDiv)

    // 创建 PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgWidth = 210 // A4 宽度
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // 如果内容高度超过一页，分页处理
    if (imgHeight > 297) { // A4 高度
      let yPosition = 0
      const pageHeight = 297
      const canvasPageHeight = (pageHeight * canvas.width) / imgWidth

      while (yPosition < canvas.height) {
        const pageCanvas = document.createElement('canvas')
        const pageCtx = pageCanvas.getContext('2d')
        pageCanvas.width = canvas.width
        pageCanvas.height = Math.min(canvasPageHeight, canvas.height - yPosition)

        pageCtx.drawImage(
          canvas,
          0, yPosition,
          canvas.width, pageCanvas.height,
          0, 0,
          canvas.width, pageCanvas.height
        )

        if (yPosition > 0) {
          pdf.addPage()
        }

        const pageImgHeight = (pageCanvas.height * imgWidth) / pageCanvas.width
        pdf.addImage(pageCanvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, imgWidth, pageImgHeight)

        yPosition += canvasPageHeight
      }
    } else {
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, imgWidth, imgHeight)
    }

    pdf.save(`markdown_${new Date().toISOString().slice(0, 10)}.pdf`)

  } catch (error) {
    console.error('PDF 导出失败:', error)
    alert('PDF 导出失败，请重试')
  } finally {
    isExporting.value = false
  }
}

// 复制 HTML
const copyHTML = async () => {
  try {
    await navigator.clipboard.writeText(htmlContent.value)
    // 这里可以添加一个提示消息
    console.log('HTML 已复制到剪贴板')
  } catch (err) {
    console.error('复制失败:', err)
    // 降级方案
    const textArea = document.createElement('textarea')
    textArea.value = htmlContent.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}

// 键盘快捷键
const handleKeydown = (event) => {
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case 's':
        event.preventDefault()
        saveAsMarkdown()
        break
      case 'o':
        event.preventDefault()
        loadFile()
        break
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})
</script>

<style>
/* 引入 highlight.js 样式 */
@import 'highlight.js/styles/github.css';

/* 自定义 prose 样式 */
.prose {
  color: #374151;
  max-width: none;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  color: #111827;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: 600;
}

.prose h1 { font-size: 1.875rem; }
.prose h2 { font-size: 1.5rem; }
.prose h3 { font-size: 1.25rem; }
.prose h4 { font-size: 1.125rem; }

.prose p {
  margin: 1em 0;
}

.prose blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1em;
  margin: 1.5em 0;
  font-style: italic;
  color: #6b7280;
}

.prose ul, .prose ol {
  margin: 1em 0;
  padding-left: 1.5em;
}

.prose li {
  margin: 0.5em 0;
}

.prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5em 0;
}

.prose th, .prose td {
  border: 1px solid #e5e7eb;
  padding: 8px 12px;
  text-align: left;
}

.prose th {
  background-color: #f9fafb;
  font-weight: 600;
}

.prose code {
  background-color: #f3f4f6;
  color: #ef4444;
  padding: 0.125em 0.25em;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
}

.prose pre {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1em;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5em 0;
}

.prose pre code {
  background-color: transparent;
  color: inherit;
  padding: 0;
}

.prose a {
  color: #3b82f6;
  text-decoration: underline;
}

.prose a:hover {
  color: #1d4ed8;
}

.prose img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1em 0;
}

.prose hr {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 2em 0;
}

/* 暗色主题 */
.dark .prose {
  color: #d1d5db;
}

.dark .prose h1, .dark .prose h2, .dark .prose h3, .dark .prose h4, .dark .prose h5, .dark .prose h6 {
  color: #f9fafb;
}

.dark .prose blockquote {
  border-left-color: #4b5563;
  color: #9ca3af;
}

.dark .prose th, .dark .prose td {
  border-color: #4b5563;
}

.dark .prose th {
  background-color: #374151;
}

.dark .prose code {
  background-color: #374151;
  color: #fbbf24;
}

.dark .prose a {
  color: #60a5fa;
}

.dark .prose a:hover {
  color: #3b82f6;
}

.dark .prose hr {
  border-top-color: #4b5563;
}

/* 滚动条样式 */
textarea::-webkit-scrollbar,
.prose::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

textarea::-webkit-scrollbar-track,
.prose::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb,
.prose::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover,
.prose::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.dark textarea::-webkit-scrollbar-track,
.dark .prose::-webkit-scrollbar-track {
  background: #374151;
}

.dark textarea::-webkit-scrollbar-thumb,
.dark .prose::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.dark textarea::-webkit-scrollbar-thumb:hover,
.dark .prose::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>