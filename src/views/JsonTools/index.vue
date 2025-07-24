<template>
  <div class="json-formatter-container p-4 lg:p-8 bg-gray-50 min-h-screen font-sans">
    <header class="text-center mb-8">
      <h1 class="text-4xl lg:text-5xl font-bold text-purple-600">JSON Formatter</h1>
      <p class="text-lg text-gray-600 mt-2">JSON 美化 / 压缩</p>
    </header>

    <main class="max-w-4xl mx-auto">
      <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-800 flex items-center">
            <svg class="w-6 h-6 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            输入 JSON
          </h2>
          <div class="flex items-center space-x-2">
            <button @click="loadExample" class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707"></path></svg>
              示例
            </button>
            <button @click="triggerFileUpload" class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
               <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              上传文件
            </button>
            <input type="file" ref="fileInput" @change="handleFileUpload" accept=".json" class="hidden" />
          </div>
        </div>
        <textarea
          v-model="rawJson"
          @input="validateJson"
          placeholder='{"key": "value"}'
          class="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
          :class="{'border-red-500': error}"
        ></textarea>
        <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
      </div>

      <div class="flex items-center justify-center my-6 space-x-4">
        <button @click="formatJson" class="inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-colors duration-200 flex-1">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          美化 JSON
        </button>
        <button @click="minifyJson" class="inline-flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 flex-1">
           <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
          压缩 JSON
        </button>
      </div>
      
       <div class="bg-white rounded-xl shadow-lg p-6 mt-6" v-if="processedJson">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-800">处理结果</h2>
            <div>
                <button @click="copyResult" class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 mr-2">复制</button>
                <button @click="downloadResult" class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200">下载</button>
            </div>
        </div>
        <pre class="w-full h-64 p-4 border rounded-lg bg-gray-50 overflow-auto"><code>{{ processedJson }}</code></pre>
      </div>

      <div class="bg-purple-50 border border-purple-200 rounded-xl p-6 mt-8">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">使用说明</h3>
        <ul class="list-disc list-inside text-gray-700 space-y-2">
          <li>支持美化和压缩 JSON 数据</li>
          <li>可以上传 JSON 文件或直接粘贴内容</li>
          <li>自动验证 JSON 格式的正确性</li>
          <li>支持一键复制和下载处理后的结果</li>
        </ul>
      </div>
    </main>
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
.json-formatter-container {
    background-color: #f8fafc;
}
</style> 