<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 p-8">
    <div class="max-w-4xl mx-auto">
      <!-- 页面标题 -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">JSON 工具</h1>
        <p class="text-gray-600 dark:text-gray-400">格式化、压缩和验证您的 JSON 数据</p>
      </div>

      <!-- 主要内容区域 -->
      <div class="bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <!-- 输入区域 -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <svg class="w-6 h-6 mr-2 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              输入 JSON
            </h2>
            <div class="flex items-center space-x-2">
              <button @click="loadExample" class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-slate-600 text-sm font-medium rounded-lg shadow-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200">
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707"></path>
                </svg>
                示例
              </button>
              <button @click="triggerFileUpload" class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-slate-600 text-sm font-medium rounded-lg shadow-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200">
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                </svg>
                上传文件
              </button>
              <input type="file" ref="fileInput" @change="handleFileUpload" accept=".json" class="hidden" />
            </div>
          </div>
          <textarea
            v-model="rawJson"
            @input="validateJson"
            placeholder='{"key": "value"}'
            class="w-full h-64 p-4 border-2 rounded-lg bg-white/50 dark:bg-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            :class="{'border-red-500 dark:border-red-400': error, 'border-gray-200 dark:border-slate-600': !error}"
          ></textarea>
          
          <!-- 错误提示 -->
          <div v-if="error" class="mt-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-red-700 dark:text-red-300">{{ error }}</span>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <button @click="formatJson" class="flex-1 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors">
            <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            美化 JSON
          </button>
          <button @click="minifyJson" class="flex-1 px-8 py-4 border-2 border-green-500 text-green-500 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 font-semibold rounded-lg transition-colors">
            <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
            </svg>
            压缩 JSON
          </button>
        </div>
      
        <!-- 结果显示 -->
        <div v-if="processedJson" class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">处理结果</h2>
            <div class="flex space-x-2">
              <button @click="copyResult" class="px-4 py-2 border border-gray-300 dark:border-slate-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                复制
              </button>
              <button @click="downloadResult" class="px-4 py-2 border border-gray-300 dark:border-slate-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                下载
              </button>
            </div>
          </div>
          <pre class="w-full h-64 p-4 border-2 border-gray-200 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700/50 overflow-auto text-gray-900 dark:text-gray-100 text-sm"><code>{{ processedJson }}</code></pre>
        </div>

        <!-- 使用说明 -->
        <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">使用说明</h3>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>支持美化和压缩 JSON 数据</li>
            <li>可以上传 JSON 文件或直接粘贴内容</li>
            <li>自动验证 JSON 格式的正确性</li>
            <li>支持一键复制和下载处理后的结果</li>
          </ul>
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
import { ref } from 'vue';

const rawJson = ref('');
const processedJson = ref('');
const error = ref('');
const fileInput = ref(null);

const validateJson = () => {
  if (rawJson.value.trim() === '') {
    error.value = '';
    return;
  }
  try {
    JSON.parse(rawJson.value);
    error.value = '';
  } catch (e) {
    error.value = `JSON 格式错误: ${e.message}`;
  }
};

const formatJson = () => {
  validateJson();
  if (!error.value && rawJson.value.trim()) {
    try {
        const obj = JSON.parse(rawJson.value);
        processedJson.value = JSON.stringify(obj, null, 4);
    } catch (e) {
        // This should not happen if validateJson is called first, but as a safeguard.
        error.value = `JSON 格式错误: ${e.message}`;
        processedJson.value = '';
    }
  } else if (!rawJson.value.trim()) {
      error.value = '输入不能为空';
      processedJson.value = '';
  }
};

const minifyJson = () => {
  validateJson();
  if (!error.value && rawJson.value.trim()) {
    try {
        const obj = JSON.parse(rawJson.value);
        processedJson.value = JSON.stringify(obj);
    } catch (e) {
        error.value = `JSON 格式错误: ${e.message}`;
        processedJson.value = '';
    }
  } else if (!rawJson.value.trim()) {
      error.value = '输入不能为空';
      processedJson.value = '';
  }
};

const loadExample = () => {
  rawJson.value = JSON.stringify({
    "name": "JSON Formatter",
    "version": "1.0.0",
    "description": "A tool to format and minify JSON data.",
    "features": ["Format", "Minify", "Validate", "Upload", "Download"],
    "isAwesome": true
  }, null, 2);
  validateJson();
  processedJson.value = '';
};

const triggerFileUpload = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      rawJson.value = e.target.result;
      validateJson();
      processedJson.value = '';
    };
    reader.readAsText(file);
  }
};

const copyResult = () => {
    if(processedJson.value) {
        navigator.clipboard.writeText(processedJson.value).then(() => {
            alert('已复制到剪贴板');
        }).catch(err => {
            alert('复制失败: ', err);
        });
    }
};

const downloadResult = () => {
    if(processedJson.value) {
        const blob = new Blob([processedJson.value], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'processed.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}
</script>

<style scoped>
/* 滚动条样式 */
pre::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

pre::-webkit-scrollbar-track {
  background: #f1f5f9;
}

pre::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

pre::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

@media (prefers-color-scheme: dark) {
  pre::-webkit-scrollbar-track {
    background: #475569;
  }
  
  pre::-webkit-scrollbar-thumb {
    background: #64748b;
  }
  
  pre::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
}
</style> 